import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getMovie, getMovieRating } from '../api/movies';
import { AuthContext } from '../context/Authcontext';
// import CommentList from './CommentList'; // Si tienes este componente

export default function MovieDetail() {
  const { id } = useParams();
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

  if (loading) return <div>Cargando...</div>;
  if (!movie) return <div>No se encontró la película.</div>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <div><strong>Género:</strong> {movie.genre}</div>
      <div><strong>Descripción:</strong> {movie.description}</div>
      {movie.imageUrl && <img src={movie.imageUrl} alt={movie.title} style={{ width: 200 }} />}
      <div><strong>Rating promedio:</strong> {rating !== null ? rating : 'Sin rating'}</div>
      {/* <CommentList movieId={id} /> */}
      {/* Aquí puedes agregar un formulario para comentar si el usuario está autenticado */}
    </div>
  );
}