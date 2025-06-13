import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/Authcontext';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MoviePage from './pages/Moviepages';
import AuthCallback from './pages/AuthCallback'; // Import the AuthCallback component
import './App.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/auth/callback" element={<AuthCallback />} /> {/* Add the AuthCallback route */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
