import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/Authcontext';
import { getUser } from '../api/users';
import { Container, Paper, Typography, Stack, Alert, CircularProgress } from '@mui/material';

export default function Profile() {
  const { token, user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && token) {
      getUser(user.id, token)
        .then(setProfile)
        .catch(() => setProfile(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user, token]);

  if (!token)
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Alert severity="info">Debes iniciar sesión para ver tu perfil.</Alert>
      </Container>
    );
  if (loading)
    return (
      <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>Cargando perfil...</Typography>
      </Container>
    );
  if (!profile)
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
          <Typography><strong>Usuario:</strong> {profile.username}</Typography>
          <Typography><strong>Nombre completo:</strong> {profile.fullName}</Typography>
          <Typography><strong>Email:</strong> {profile.email}</Typography>
          <Typography><strong>Rol:</strong> {profile.role}</Typography>
          <Typography><strong>Creado:</strong> {new Date(profile.createdAt).toLocaleString()}</Typography>
        </Stack>
      </Paper>
    </Container>
  );
}