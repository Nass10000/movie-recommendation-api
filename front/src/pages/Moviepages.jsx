import React from 'react';
import { useParams } from 'react-router-dom';
import MovieDetail from '../components/MovieDetail';
import { Container, Box, Stack } from '@mui/material';

export default function MoviePage() {
  const { id } = useParams();

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Stack spacing={4}>
        <MovieDetail id={id} />
      </Stack>
    </Container>
  );
}