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
import About from './pages/About';
import Tecnologias from './pages/Tecnologias'; // crea este archivo si aún no existe
import './App.css';

function App() {
  console.log('%c[App] Renderizando App. Ruta actual:', 'color: orange; font-weight: bold', window.location.pathname);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div style={{ position: 'fixed', bottom: 0, right: 0, background: '#ffecb3', color: '#444', zIndex: 999, padding: 4 }}>
          <small>Ruta: {window.location.pathname}</small>
        </div>
        <Routes>
          {/* Recibe cualquier OAuth y monta AuthCallback */}
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Otras rutas de tu app */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/tecnologias" element={<Tecnologias />} />

          {/* Catch-all: redirige a home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
