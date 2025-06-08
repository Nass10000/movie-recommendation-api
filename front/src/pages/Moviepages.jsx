import React from 'react';
import { useParams } from 'react-router-dom';
import MovieDetail from '../components/MovieDetail';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

export default function MoviePage() {
  const { id } = useParams();

  // Puedes refrescar comentarios tras agregar uno si lo deseas
  const [refresh, setRefresh] = React.useState(false);

  return (
    <div>
      <MovieDetail id={id} />
      <CommentForm movieId={id} onCommentAdded={() => setRefresh(r => !r)} />
      <CommentList movieId={id} key={refresh} />
    </div>
  );
}