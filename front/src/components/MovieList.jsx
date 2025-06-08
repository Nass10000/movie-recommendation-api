import React, { useEffect, useState } from 'react';
import { getAllMovies } from '../api/movies';
import { Link } from 'react-router-dom';

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllMovies()
      .then(setMovies)
      .catch(() => setMovies([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Cargando películas...</div>;
  if (!movies.length) return <div>No hay películas disponibles.</div>;

  return (
    <div>
      <h2>Películas</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <strong>{movie.title}</strong>
            </Link>
            <div>{movie.description}</div>
            {movie.imageUrl && (
              <img src={movie.imageUrl} alt={movie.title} style={{ width: 120 }} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}