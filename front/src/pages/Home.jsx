import React, { useState } from 'react';
import MovieList from '../components/MovieList';
import AddMovieForm from '../components/AddMovieForm';
import { Container, Typography, Box, Button } from '@mui/material';

export default function Home() {
  const [refresh, setRefresh] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleMovieAdded = () => {
    setRefresh(r => !r);
    setShowForm(false); // Oculta el formulario después de agregar
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Películas recomendadas
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm(f => !f)}
          sx={{ mt: 2 }}
        >
          {showForm ? 'Cancelar' : 'Agregar película'}
        </Button>
      </Box>
      {showForm && <AddMovieForm onMovieAdded={handleMovieAdded} />}
      <MovieList refresh={refresh} />
    </Container>
  );
}