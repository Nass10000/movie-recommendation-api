import { API_URL } from './auth';

export async function registerUser(data) {
  console.log('POST /users/register', data);
  const res = await fetch(`${API_URL}/users/register`, {
    method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data),
  });
  return res.json();
}

export async function createUser(data) {
  console.log('POST /users', data);
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data),
  });
  return res.json();
}

export async function getAllUsers(token) {
  console.log('GET /users');
  const res = await fetch(`${API_URL}/users`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.json();
}

export async function getUser(id, token) {
  console.log('GET /users/' + id);
  const res = await fetch(`${API_URL}/users/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.json();
}

export async function addMovieToUser(userId, data, token) {
  console.log('POST /users/' + userId + '/movies', data);
  const res = await fetch(`${API_URL}/users/${userId}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function addCommentToUser(userId, data, token) {
  console.log('POST /users/' + userId + '/comments', data);
  const res = await fetch(`${API_URL}/users/${userId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
