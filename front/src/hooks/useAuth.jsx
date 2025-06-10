import { useState, useEffect } from 'react';

export function useAuth() {
  console.log('useAuth hook ejecutándose');
  const [token, setToken] = useState(() => {
    const t = localStorage.getItem('token');
    console.log('Token inicial desde localStorage:', t);
    return t;
  });
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    console.log('User inicial desde localStorage:', stored);
    return stored ? JSON.parse(stored) : null;
  });

  // Guarda token y usuario en localStorage
  const login = (jwt, userData) => {
    console.log('Login llamado con:', jwt, userData);
    setToken(jwt);
    setUser(userData);
    localStorage.setItem('token', jwt);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Borra token y usuario
  const logout = () => {
    console.log('Logout llamado');
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Si hay token pero no user, obtén el usuario desde el backend
  useEffect(() => {
    if (token && !user) {
      fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data));
        })
        .catch(() => {
          setToken(null);
          setUser(null);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        });
    }
  }, [token, user]);

  return { token, user, login, logout };
}