import api from '../util/api/_api';


export default function SpotifyLogin() {
    const handleSpotifyLogin = async () => {
      try {
        window.location.href = `${api.defaults.baseURL}/spotify/login`;
      } catch (err) {
        console.error('Error during Spotify login:', err);
      };
    };
  
    return (
      <div>
        <h1>Spotify Authentication</h1>
        <button onClick={handleSpotifyLogin}>Login with Spotify</button>
      </div>
    );
};
