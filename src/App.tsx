import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import Navbar from './components/Navbar/Navbar';
import SpotifyLoginCallback from './components/SpotifyLoginCallback';


export default function App() {

  return (
    <Router>
      <Navbar />

      <div id="content-wrapper">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/spotify-login-callback" element={<SpotifyLoginCallback />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </Router>
  );
};
