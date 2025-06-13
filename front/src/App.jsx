import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/Authcontext';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MoviePage from './pages/Moviepages';
import AuthCallback from './pages/AuthCallback';
import GoogleCallback from './pages/GoogleCallback'; // Asegúrate de tener este componente
import './App.css';

function App() {
  console.log('Render App con ruta actual:', window.location.pathname);
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Ruta para el callback de Google */}
          <Route path="/auth/login/google" element={<GoogleCallback />} />

          {/* Ruta para el callback general de Auth */}
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Otras rutas de tu app */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movies/:id" element={<MoviePage />} />

          {/* Catch-all: redirige a home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
