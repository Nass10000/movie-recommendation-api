import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { Container, Box, Typography } from '@mui/material';

export default function Register() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Crear cuenta
        </Typography>
      </Box>
      <RegisterForm />
    </Container>
  );
}