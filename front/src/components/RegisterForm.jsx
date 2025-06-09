import React, { useState } from 'react';
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Alert, Stack } from '@mui/material';

export default function RegisterForm() {
  const [form, setForm] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const updatedForm = { ...form, [e.target.name]: e.target.value };
    console.log('handleChange:', updatedForm);
    setForm(updatedForm);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    console.log('handleSubmit - form:', form);
    if (form.password !== form.confirmPassword) {
      console.log('Contraseñas no coinciden');
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      const res = await register(form);
      console.log('Respuesta de register:', res);
      // Éxito si res tiene un id (usuario creado) o res.user existe
      if ((res && res.id) || (res && res.user)) {
        setSuccess('¡Registro exitoso! Ahora puedes iniciar sesión.');
        setTimeout(() => navigate('/login'), 1500);
      } else if (res && res.message) {
        console.log('Mensaje de error del backend:', res.message);
        setError(Array.isArray(res.message) ? res.message.join(' ') : res.message);
      } else {
        console.log('Error desconocido al registrar');
        setError('Error desconocido al registrar');
      }
    } catch (err) {
      console.error('Error en catch:', err);
      let msg = err.message;
      try {
        const parsed = JSON.parse(msg);
        if (parsed && parsed.message) msg = parsed.message;
      } catch (e) {}
      if (Array.isArray(msg)) msg = msg.join(' ');
      setError(msg || 'Error al registrar');
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
        <Typography variant="h5" align="center">Registro</Typography>
        <TextField
          label="Usuario"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Nombre completo"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Correo electrónico"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Confirmar contraseña"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Registrarse
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
      </Stack>
    </Box>
  );
}