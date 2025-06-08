import React, { createContext } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { token, user, login, logout } = useAuth();

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}