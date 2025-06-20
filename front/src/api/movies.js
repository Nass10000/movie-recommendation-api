import { API_URL } from './auth';

// Obtener todas las películas (requiere token)
export async function getAllMovies(token) {
  console.log('GET /movies');
  const res = await fetch(`${API_URL}/movies`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

// Obtener una película por ID (público)
export async function getMovie(id) {
  console.log('GET /movies/' + id);
  const res = await fetch(`${API_URL}/movies/${id}`);
  return res.json();
}

// Obtener el rating promedio de una película (público)
export async function getMovieRating(id) {
  console.log('GET /movies/' + id + '/rating');
  const res = await fetch(`${API_URL}/movies/${id}/rating`);
  return res.json();
}

// Crear una película (solo ADMIN, requiere token)
export async function createMovie(data, token) {
  console.log('POST /movies', data);
  const res = await fetch(`${API_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Actualizar una película (solo ADMIN, requiere token)
export async function updateMovie(id, data, token) {
  console.log('PUT /movies/' + id, data);
  const res = await fetch(`${API_URL}/movies/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Eliminar una película (solo ADMIN, requiere token)
export async function deleteMovie(id, token) {
  console.log('DELETE /movies/' + id);
  const res = await fetch(`${API_URL}/movies/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

// Comentar una película (solo USER, requiere token)
export async function commentMovie(movieId, data, token) {
  console.log('POST /movies/' + movieId + '/comments', data);
  const res = await fetch(`${API_URL}/movies/${movieId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    let msg = error.message;
    if (typeof msg === 'object') msg = JSON.stringify(msg, null, 2);
    if (Array.isArray(msg)) msg = msg.join(', ');
    throw new Error(msg || 'Error al comentar');
  }
  return res.json();
}
