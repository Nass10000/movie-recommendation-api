import React, { useState, useContext } from 'react';
import { createComment } from '../api/comments';
import { AuthContext } from '../context/Authcontext';
import { Box, Button, TextField, MenuItem, Typography, Alert, Stack } from '@mui/material';

export default function CommentForm({ movieId, onCommentAdded }) {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [error, setError] = useState('');
  const { token, user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!content.trim()) {
      setError('El comentario no puede estar vacío');
      return;
    }
    try {
      const data = {
        content,
        movieId,
        userId: user?.id,
        rating: Number(rating),
      };
      await createComment(data, token);
      setContent('');
      setRating(5);
      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      setError('Error al enviar el comentario');
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
        <TextField
          select
          label="Rating"
          value={rating}
          onChange={e => setRating(e.target.value)}
          fullWidth
        >
          {[1,2,3,4,5].map(n => (
            <MenuItem key={n} value={n}>{n}</MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary">
          Comentar
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
      </Stack>
    </Box>
  );
}