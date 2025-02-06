import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from 'api';


export default function ProtectedRoute({ children }) {
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
