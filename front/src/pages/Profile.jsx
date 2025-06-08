import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/Authcontext';
import { getUser } from '../api/users';

export default function Profile() {
  const { token, user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && token) {
      getUser(user.id, token)
        .then(setProfile)
        .catch(() => setProfile(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user, token]);

  if (!token) return <div>Debes iniciar sesión para ver tu perfil.</div>;
  if (loading) return <div>Cargando perfil...</div>;
  if (!profile) return <div>No se pudo cargar el perfil.</div>;

  return (
    <div>
      <h2>Perfil de usuario</h2>
      <div><strong>Usuario:</strong> {profile.username}</div>
      <div><strong>Nombre completo:</strong> {profile.fullName}</div>
      <div><strong>Email:</strong> {profile.email}</div>
      <div><strong>Rol:</strong> {profile.role}</div>
      <div><strong>Creado:</strong> {new Date(profile.createdAt).toLocaleString()}</div>
      {/* Puedes agregar aquí la lista de películas favoritas, comentarios, etc. */}
    </div>
  );
}