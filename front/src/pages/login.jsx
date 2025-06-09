import React from 'react';
import LoginForm from '../components/LoginForm';
import { Container, Box, Typography } from '@mui/material';

export default function Login() {
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