import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../api/auth';
import { AuthContext } from '../context/Authcontext';
import { Box, Button, TextField, Typography, Alert, Stack } from '@mui/material';

export default function LoginForm() {
  const { login } = useContext(AuthContext); // <-- usa login del contexto
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await loginApi({ username, password });
      if (res.access_token) {
        login(res.access_token, res.user); // <-- aquí va esta línea
        navigate('/');                    // <-- y aquí navegas al home
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      console.error('Error real al iniciar sesión:', err);
      let msg = err.message;
      try {
        const parsed = JSON.parse(msg);
        if (parsed && parsed.message) msg = parsed.message;
      } catch (e) {}
      if (Array.isArray(msg)) msg = msg.join(' ');
      setError(msg || 'Error al iniciar sesión');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 6,
        p: 3,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: 2,
        maxWidth: 400,
        mx: 'auto',
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h5" align="center">Iniciar sesión</Typography>
        <TextField
          label="Usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Entrar
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
      </Stack>
    </Box>
  );
}