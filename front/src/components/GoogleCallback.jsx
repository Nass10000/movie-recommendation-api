import { useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext';

export default function GoogleCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  console.log('🏷️ GoogleCallback ejecutándose, params:', Object.fromEntries(params));

  useEffect(() => {
    const token = params.get('token');
    console.log('Token recibido del querystring:', token);
    if (token) {
      login(token); // <-- Aquí usas el contexto
      navigate('/dashboard'); // O la ruta que quieras
    } else {
      console.error('No llegó token en callback');
      navigate('/login');
    }
  }, [params, navigate, login]);

  return <div>Cargando…</div>;
}
