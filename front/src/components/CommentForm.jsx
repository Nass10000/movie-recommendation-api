import React, { useState, useContext } from 'react';
import { commentMovie } from '../api/movies';
import { AuthContext } from '../context/Authcontext';
import { Box, Button, TextField, MenuItem, Typography, Alert, Stack } from '@mui/material';
import Rating from '@mui/material/Rating';

export default function CommentForm({ movieId, onCommentAdded }) {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [errorMsg, setErrorMsg] = useState('');
  const { token, user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!content.trim()) {
      setErrorMsg('El comentario no puede estar vacío');
      return;
    }
    try {
      const data = {
        content, // <-- usa 'content' en vez de 'comment'
        rating: Number(rating),
        movieId, // <-- agrega movieId aquí
      };
      await commentMovie(movieId, data, token);
      setContent('');
      setRating(5);
      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      setErrorMsg('Solo puedes comentar una vez por película. Edita tu comentario si deseas cambiarlo.');
    }
  };

  if (!token) return <Alert severity="info">Inicia sesión para comentar.</Alert>;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 3,
        mb: 3,
        p: 2,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: 2,
        maxWidth: 400,
        mx: 'auto',
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h6">Agregar comentario</Typography>
        <TextField
          label="Comentario"
          multiline
          minRows={3}
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          fullWidth
        />
        <Rating
          name="rating"
          value={Number(rating)}
          onChange={(_, newValue) => setRating(newValue)}
          max={5}
        />
        <Button type="submit" variant="contained" color="primary">
          Comentar
        </Button>
        {errorMsg && (
          <Alert severity="error" onClose={() => setErrorMsg('')}>
            {errorMsg}
          </Alert>
        )}
      </Stack>
    </Box>
  );
}