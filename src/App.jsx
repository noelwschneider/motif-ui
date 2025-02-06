import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar/Navbar';
import SpotifyLoginCallback from './components/SpotifyLoginCallback';
import { useEffect, useState } from 'react';
import api from './util/api/_api';
import { UserContext } from './util/_util';
import UserProfile from './components/UserProfile/UserProfile';


export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const userResponse = await api.auth.verify();
        // todo: convert userResponse.data.userId to number instead of string
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
            
            <Route path="user/:userId"
              element={<UserProfile />}
            />

            <Route
              path="/home"
              element={<Home />}
            />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
};
