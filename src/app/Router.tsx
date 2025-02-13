import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from 'hooks/_hooks';
import api from 'api';

// routes
import Home from 'layout/Home';
import Login from 'layout/Login';
import Register from 'layout/Register';
import Navbar from 'ui/Navbar/Navbar';
import SpotifyLoginCallback from 'layout/SpotifyLoginCallback';
import UserProfile from 'ui/UserProfile/UserProfile';


export default function AppRouter() {
    const { user, setUser } = useUser();

    useEffect(() => {
        const verifyUser = async () => {
          try {
            const userResponse = await api.auth.verify();
            // todo: convert userResponse.data.userId to number instead of string
            setUser(userResponse);
          } catch (err) {
            console.error(err);
            setUser(null);
          }
        };
        verifyUser();
    }, [setUser]);

    return (
        <Router>
            <Navbar />

            <Routes>
            <Route path="/login" element={user ? <Home /> : <Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/spotify-login-callback" element={<SpotifyLoginCallback />} />
            
            <Route path="user/:userId"
                element={<UserProfile />}
            />

            <Route path="/search" element={<Home />} />
            <Route
                path="/home"
                element={<Home />}
            />
            <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
};


// defined locally because it is digestible and unused elsewhere
function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.auth.verify();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, [navigate]);

  if (isAuthenticated === null) return <div>Loading...</div>;
  if (isAuthenticated === false) navigate('/login');
  return children;
};
