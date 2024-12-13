import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api/_api';


export default function SpotifyLoginCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');

    if (code) {
      // IIFE allows use of async in useEffect
      (async () => {
        try {
          await api.spotify.callback(code);
          navigate('/home');
        } catch (err) {
          console.error('Error during Spotify callback handling:', err);
        }
      })();
    } else {
      console.error('Authorization code is missing from query parameters.');
    }
  }, [location.search, navigate]);

  return <div>Processing Spotify Login...</div>;
};
