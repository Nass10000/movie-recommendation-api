import { API_URL } from './auth';

export async function createComment(data) {
  console.log('POST /comments', data);
  const res = await fetch(`${API_URL}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getAllComments() {
  console.log('GET /comments');
  const res = await fetch(`${API_URL}/comments`);
  return res.json();
}

export async function getComment(id) {
  console.log('GET /comments/' + id);
  const res = await fetch(`${API_URL}/comments/${id}`);
  return res.json();
}

export async function updateComment(id, data, token) {
  console.log('PUT /comments/' + id, data);
  const res = await fetch(`${API_URL}/comments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteComment(id, token) {
  console.log('DELETE /comments/' + id);
  const res = await fetch(`${API_URL}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function sendSentiment(id, data, token) {
  console.log('PUT /comments/' + id + '/sentiment', data);
  const res = await fetch(`${API_URL}/comments/${id}/sentiment`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getCommentsByMovie(movieId, token) {
  const headers = token
    ? { Authorization: `Bearer ${token}` }
    : {};
  const res = await fetch(`${API_URL}/comments/${movieId}/comments`, {
    headers,
  });
  return res.json();
}
