import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar/Navbar';
import SpotifyLoginCallback from './components/SpotifyLoginCallback';
import ArtistProfile from './components/ArtistProfile/ArtistProfile';
import { useEffect, useState } from 'react';
import api from './api/_api';
import { UserContext } from './UserContext';


export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const userResponse = await api.auth.verify();
        setUser(userResponse?.data);
      } catch (err) {
        console.error(err);
        setUser(null);
      }
    };
    verifyUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Navbar />

        <div id="content-wrapper">
          <Routes>
            <Route path="/login" element={user ? <Home /> : <Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/spotify-login-callback" element={<SpotifyLoginCallback />} />
            <Route path="/artist-profile" element={<ArtistProfile />} />
            
            <Route
              path="/home"
              element={<Home />}
            />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
};
