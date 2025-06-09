export const API_URL = 'http://localhost:3000';

export async function register(data) {
  console.log('POST /auth/register', data);
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  let result;
  try {
    result = await res.json();
  } catch (e) {
    console.error('No se pudo parsear JSON:', e);
    throw new Error('Respuesta inválida del servidor');
  }
  console.log('Status:', res.status, 'Respuesta completa del backend:', result);
  if (!res.ok) {
    // Si el mensaje es un array, únete los mensajes
    let msg = result.message;
    if (Array.isArray(msg)) msg = msg.join(' ');
    if (typeof msg === 'object') msg = JSON.stringify(msg);
    throw new Error(msg || 'Error al registrar');
  }
  return result;
}

export async function login(data) {
  console.log('POST /auth/login', data);
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || 'Error al iniciar sesión');
  }
  return result;
}
