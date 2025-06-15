import React, { useContext } from 'react';
import LoginForm from '../components/LoginForm';
import { Container, Box, Typography } from '@mui/material';
import { AuthContext } from '../context/Authcontext';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const { token } = useContext(AuthContext);

  if (token) {
    // Si ya hay token, redirige a la página principal
    return <Navigate to="/" replace />;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Iniciar sesión
        </Typography>
      </Box>
      <LoginForm />
    </Container>
  );
}