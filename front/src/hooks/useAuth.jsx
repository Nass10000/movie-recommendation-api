import { useState, useEffect } from 'react';

export function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  // Guarda token y usuario en localStorage
  const login = (jwt, userData) => {
    setToken(jwt);
    setUser(userData);
    localStorage.setItem('token', jwt);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Borra token y usuario
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Si quieres refrescar el usuario desde el backend al cargar el token, puedes hacerlo aquí
  useEffect(() => {
    // Opcional: fetch user info if token exists
  }, [token]);

  return { token, user, login, logout };
}