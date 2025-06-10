import React, { useState, useContext } from 'react';
import { createMovie } from '../api/movies';
import { AuthContext } from '../context/Authcontext';
import { Box, Button, TextField, Typography, Alert, Stack } from '@mui/material';

export default function AddMovieForm({ onMovieAdded }) {
  const { token, user } = useContext(AuthContext);
  const [form, setForm] = useState({ title: '', description: '', genre: '', imageUrl: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!user || user.role !== 'admin') return null;

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await createMovie(form, token);
      if (res && res.id) {
        setSuccess('Película creada exitosamente');
        setForm({ title: '', description: '', genre: '', imageUrl: '' });
        if (onMovieAdded) onMovieAdded();
      } else {
        setError(res.message || 'Error al crear película');
      }
    } catch (err) {
      setError('Error al crear película');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ my: 4 }}>
      <Stack spacing={2}>
        <Typography variant="h6">Agregar película</Typography>
        <TextField label="Título" name="title" value={form.title} onChange={handleChange} required />
        <TextField label="Descripción" name="description" value={form.description} onChange={handleChange} required />
        <TextField label="Género" name="genre" value={form.genre} onChange={handleChange} required />
        <TextField label="Imagen (URL)" name="imageUrl" value={form.imageUrl} onChange={handleChange} />
        <Button type="submit" variant="contained">Crear</Button>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
      </Stack>
    </Box>
  );
}