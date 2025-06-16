import React, { useEffect, useState, useContext } from 'react';
import { getAllMovies, deleteMovie } from '../api/movies';
import { AuthContext } from '../context/Authcontext';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function MovieList({ refresh }) {
  const { token, user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllMovies(token)
      .then(setMovies)
      .catch(() => setMovies([]))
      .finally(() => setLoading(false));
  }, [refresh, token]);

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que quieres eliminar esta película?')) {
      await deleteMovie(id, token);
      setMovies(movies => movies.filter(m => m.id !== id));
    }
  };

  // Agrega aquí el console.log
  console.log('Usuario actual:', user);

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );

  if (user === undefined) return null; // Espera a que cargue el usuario

  if (!token && user === null) {
    // Usuario NO logueado: muestra solo el mensaje
    return (
      <Box sx={{ my: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Alert
          icon={<LockOutlinedIcon fontSize="inherit" />}
          severity="info"
          sx={{
            mb: 2,
            maxWidth: 440,
            fontSize: 22,
            background: 'linear-gradient(90deg, #e0e7ff 0%, #f7f7ff 100%)',
            color: '#222',
            borderRadius: 3,
            boxShadow: 4,
            py: 3,
            px: 4,
            textAlign: 'center',
          }}
        >
          <strong>Debes iniciar sesión para ver las películas disponibles.</strong>
        </Alert>
      </Box>
    );
  }

  if (!movies.length) {
    // Usuario logueado pero no hay películas
    return (
      <Box sx={{ my: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Alert severity="info" sx={{ mb: 2, maxWidth: 400, fontSize: 18 }}>
          No hay películas disponibles.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Películas
      </Typography>
     
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
        {movies
          .filter(m => m.title && m.description && m.genre)
          .map(movie => (
            <Card
              key={movie.id}
              sx={{
                width: 400, // Más ancho
                minHeight: 520, // Más alto
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {movie.imageUrl && (
                <CardMedia
                  component="img"
                  height="320"
                  image={movie.imageUrl}
                  alt={movie.title}
                  sx={{ objectFit: 'contain', background: '#f5f5f5' }}
                />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {movie.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  to={`/movies/${movie.id}`}
                  size="small"
                  variant="contained"
                  color="primary"
                >
                  Ver detalles
                </Button>
                {user && user.role === 'admin' && (
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(movie.id)}
                  >
                    Eliminar
                  </Button>
                )}
              </CardActions>
            </Card>
          ))}
      </Box>
    </Box>
  );
}