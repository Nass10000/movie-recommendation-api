import React from 'react';
import MovieList from '../components/MovieList';
import { Container, Typography, Box } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Películas recomendadas
        </Typography>
      </Box>
      <MovieList />
    </Container>
  );
}