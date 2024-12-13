import { useNavigate } from 'react-router-dom';
import api from '../api/_api.js';
import SpotifyLogin from './SpotifyLogin.js';


export default function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.auth.logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <div>
      <h1>Homepage</h1>
      <p>This is a protected route. Only authenticated users can see this.</p>
      <SpotifyLogin />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
