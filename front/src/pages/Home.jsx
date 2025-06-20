import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/Authcontext';
import MovieList from '../components/MovieList';
import AddMovieForm from '../components/AddMovieForm';
import { Container, Typography, Box, Button } from '@mui/material';

export default function Home() {
  const [refresh, setRefresh] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { user } = useContext(AuthContext);

  const handleMovieAdded = () => {
    setRefresh(r => !r);
    setShowForm(false); // Oculta el formulario después de agregar
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 900,
            letterSpacing: 2,
            color: 'primary.main',
            textShadow: '0 2px 12px #bdbdbd',
            mb: 1,
          }}
        >
          Películas recomendadas
        </Typography>
        <Box
          sx={{
            width: 80,
            height: 6,
            background: 'linear-gradient(90deg, #ff9800 0%, #ffb300 100%)',
            borderRadius: 3,
            mx: 'auto',
            mb: 2,
          }}
        />
        {user && user.role?.toLowerCase() === 'admin' && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowForm(f => !f)}
            sx={{ mt: 2 }}
          >
            {showForm ? 'Cancelar' : 'Agregar película'}
          </Button>
        )}
      </Box>
      {showForm && <AddMovieForm onMovieAdded={handleMovieAdded} />}
      <Box
        sx={{
          width: '100%',
          height: { xs: 250, md: 420 },
          position: 'relative',
          mb: 5,
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: 6,
        }}
      >
        <img
          src="https://imagenes.elpais.com/resizer/v2/3BB5ISVA7BKJXLPIG3SX74CEPA.jpg?auth=ef8fdc89902aa462bc1757542e63239db42424010b26c9a8f023945cedff802d&width=1200"
          alt="Banner PelisApp"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.7)',
            display: 'block',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            textShadow: '0 2px 12px #000',
            px: 2,
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, letterSpacing: 2 }}>
            ¡Bienvenido a PelisApp!
          </Typography>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Descubre, califica y comenta tus películas favoritas.
          </Typography>
        </Box>
      </Box>
      <div id="peliculas">
        <MovieList refresh={refresh} />
      </div>
    </Container>
  );
}