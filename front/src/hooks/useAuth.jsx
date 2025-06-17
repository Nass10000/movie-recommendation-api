import { useState, useEffect } from 'react';
import { API_URL } from '../api/api';


export function useAuth() {
  console.log('useAuth hook ejecutándose');
  const [token, setToken] = useState(() => {
    const t = localStorage.getItem('token');
    console.log('[useAuth] Token inicial desde localStorage:', t);
    return t;
  });

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    console.log('[useAuth] User inicial desde localStorage:', stored);
    return stored ? JSON.parse(stored) : null;
  });

  // Guarda token y usuario en localStorage
  const login = (jwt) => {
    console.log('[useAuth] Login llamado con:', jwt);
    setToken(jwt);
    localStorage.setItem('token', jwt);

    fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${jwt}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.sub && !data.id) data.id = data.sub;
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        console.log('[useAuth] Usuario seteado tras login:', data);
      })
      .catch((err) => {
        console.error('[useAuth] Error al obtener el usuario tras login:', err);
        logout();
      });
  };

  // Borra token y usuario
  const logout = () => {
    console.log('[useAuth] Logout llamado');
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Cuando hay token pero no user, lo intenta recuperar del backend
  useEffect(() => {
    if (token && !user) {
      console.log('[useAuth] useEffect: Hay token pero no user, buscando...');
      fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          if (!res.ok) throw new Error('No autorizado');
          return res.json();
        })
        .then(data => {
          if (data && data.sub && !data.id) data.id = data.sub;
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data));
          console.log('[useAuth] Usuario recuperado en useEffect:', data);
        })
        .catch((err) => {
          console.error('[useAuth] Error recuperando user en useEffect:', err);
          logout();
        });
    }
  }, [token]);

  return { token, user, login, logout };
}
