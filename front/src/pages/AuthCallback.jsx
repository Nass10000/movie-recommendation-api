import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  console.log('🔵 AuthCallback renderizado');
  console.log('🔵 window.location.search:', window.location.search);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    console.log('🟢 useEffect ejecutado en AuthCallback');
    console.log('🟢 Token recibido:', token);

    if (token) {
      login(token);
      console.log('🟢 Token válido, llamando login() y navegando a /');
      navigate('/');
    } else {
      console.log('🔴 No se recibió token, navegando a /login');
      navigate('/login');
    }
  }, [login, navigate]);

  return <div>Autenticando...</div>;
}
