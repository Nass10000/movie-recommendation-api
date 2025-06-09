import React from 'react';
import { useParams } from 'react-router-dom';
import MovieDetail from '../components/MovieDetail';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import { Container, Box, Stack } from '@mui/material';

export default function MoviePage() {
  const { id } = useParams();
  const [refresh, setRefresh] = React.useState(false);

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Stack spacing={4}>
        <MovieDetail id={id} />
        <CommentForm movieId={id} onCommentAdded={() => setRefresh(r => !r)} />
        <CommentList movieId={id} key={refresh} />
      </Stack>
    </Container>
  );
}