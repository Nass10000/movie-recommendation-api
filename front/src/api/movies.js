import { API_URL } from './auth';

// Obtener todas las películas (público)
export async function getAllMovies() {
  console.log('GET /movies');
  const res = await fetch(`${API_URL}/movies`);
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
export async function commentMovie(id, comment, token) {
  console.log('POST /movies/' + id + '/comments', comment);
  const res = await fetch(`${API_URL}/movies/${id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(comment),
  });
  return res.json();
}
