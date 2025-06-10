import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { commentMovie, getMovie, getMovieRating } from '../api/movies';
import { AuthContext } from '../context/Authcontext';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Stack,
  Skeleton,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export default function MovieDetail() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovie() {
      const data = await getMovie(id);
      setMovie(data);
      setLoading(false);
    }
    fetchMovie();
    getMovieRating(id).then(res => setRating(res.averageRating));
  }, [id]);

  const handleAddComment = async (commentData) => {
    await commentMovie(id, commentData, token);
    const data = await getMovie(id);
    setMovie(data);
    getMovieRating(id).then(res => setRating(res.averageRating));
  };

  if (loading)
    return (
      <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
        <Skeleton variant="rectangular" height={300} />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="60%" />
      </Box>
    );
  if (!movie)
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
        No se encontró la película.
      </Typography>
    );

  return (
    <Card sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 2, backgroundColor: 'background.paper' }}>
      {movie.imageUrl && (
        <CardMedia
          component="img"
          height="300"
          image={movie.imageUrl}
          alt={movie.title}
          sx={{ objectFit: 'cover', borderRadius: 2 }}
        />
      )}
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {movie.title}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Chip label={movie.genre} color="secondary" variant="outlined" />
          {rating !== null && (
            <Chip
              icon={<StarIcon sx={{ color: '#ffb71d' }} />}
              label={rating}
              color="secondary"
              variant="filled"
            />
          )}
        </Stack>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {movie.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Rating promedio:</strong> {rating !== null ? rating : 'Sin rating'}
        </Typography>
        {/* Aquí puedes incluir tu formulario de comentarios y pasarle la prop onAddComment */}
      </CardContent>
    </Card>
  );
}