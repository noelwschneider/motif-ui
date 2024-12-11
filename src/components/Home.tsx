import { useNavigate } from 'react-router-dom';
import api from '../api/api.js';

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <div>
      <h1>Homepage</h1>
      <p>This is a protected route. Only authenticated users can see this.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
