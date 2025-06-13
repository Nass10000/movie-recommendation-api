import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function GoogleCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  console.log('🏷️ GoogleCallback ejecutándose, params:', Object.fromEntries(params));

  useEffect(() => {
    const token = params.get('token');
    console.log('Token recibido del querystring:', token);
    if (token) {
      localStorage.setItem('token', token);
      navigate('/dashboard'); // o donde quieras
    } else {
      console.error('No llegó token en callback');
      navigate('/login');
    }
  }, [params, navigate]);

  return <div>Cargando…</div>;
}
