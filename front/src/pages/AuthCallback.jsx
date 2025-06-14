import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Imprime todas las partes de window.location en el primer render
  console.log('🔵 AuthCallback renderizado');
  console.log('🔵 window.location:', window.location);
  console.log('🔵 window.location.href:', window.location.href);
  console.log('🔵 window.location.pathname:', window.location.pathname);
  console.log('🔵 window.location.search:', window.location.search);
  console.log('🔵 window.location.hash:', window.location.hash);

  useEffect(() => {
    console.log('🟢 useEffect ejecutado en AuthCallback');
    console.log('🟢 window.location:', window.location);
    console.log('🟢 window.location.href:', window.location.href);
    console.log('🟢 window.location.pathname:', window.location.pathname);
    console.log('🟢 window.location.search:', window.location.search);
    console.log('🟢 window.location.hash:', window.location.hash);

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
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
