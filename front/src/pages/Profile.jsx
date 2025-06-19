import React, { useContext } from 'react';
import { AuthContext } from '../context/Authcontext';
import { Container, Paper, Typography, Stack, Alert } from '@mui/material';

export default function Profile() {
  const { token, user } = useContext(AuthContext);

  if (!token)
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Alert severity="info">Debes iniciar sesión para ver tu perfil.</Alert>
      </Container>
    );

  if (!user)
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Alert severity="error">No se pudo cargar el perfil.</Alert>
      </Container>
    );

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          Perfil de usuario
        </Typography>
        <Stack spacing={2}>
          <Typography><strong>Usuario:</strong> {user.username || ''}</Typography>
          <Typography><strong>Nombre completo:</strong> {user.fullName || ''}</Typography>
          <Typography><strong>Email:</strong> {user.email || ''}</Typography>
          <Typography><strong>Rol:</strong> {user.role || ''}</Typography>
          <Typography>
            <strong>Creado:</strong>{' '}
            {user.createdAt ? new Date(user.createdAt).toLocaleString() : ''}
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}