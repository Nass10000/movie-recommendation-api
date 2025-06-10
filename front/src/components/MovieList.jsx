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
} from '@mui/material';

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

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (!movies.length)
    return (
      <Typography variant="body1" color="text.secondary" sx={{ my: 2 }}>
        No hay películas disponibles.
      </Typography>
    );

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