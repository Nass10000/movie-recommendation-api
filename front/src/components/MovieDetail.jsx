import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
import CommentList from './CommentList';
import CommentForm from './CommentForm';

export default function MovieDetail() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reloadComments, setReloadComments] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function fetchMovie() {
      const data = await getMovie(id);
      setMovie(data);
      setLoading(false);
    }
    fetchMovie();
    console.log('ID de la película para rating:', id);
    getMovieRating(id).then(res => {
      console.log('Respuesta de getMovieRating:', res);
      setRating(res.averageRating);
    });
  }, [id]);

  const handleCommentAdded = () => {
    setReloadComments(r => !r);
    // Refresca la ruta actual (simula un refresh)
    navigate(0);
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
              label={rating !== null ? Number(rating).toFixed(1) : 'N/A'}
              color="secondary"
              variant="filled"
            />
          )}
        </Stack>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {movie.description}
        </Typography>
      </CardContent>
      <CommentForm movieId={id} onCommentAdded={handleCommentAdded} />
      <CommentList movieId={id} reload={reloadComments} />
    </Card>
  );
}