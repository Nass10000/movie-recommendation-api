import React, { useEffect, useState } from 'react';
import { getAllMovies } from '../api/movies';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
} from '@mui/material';

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllMovies()
      .then(setMovies)
      .catch(() => setMovies([]))
      .finally(() => setLoading(false));
  }, []);

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
      <Grid container spacing={3}>
        {movies.map(movie => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {movie.imageUrl && (
                <CardMedia
                  component="img"
                  height="240"
                  image={movie.imageUrl}
                  alt={movie.title}
                  sx={{ objectFit: 'cover' }}
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
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}