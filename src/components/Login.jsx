import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../util/api/_api.js';
import { UserContext } from '../util/context/UserContext.jsx';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const loginResponse = await api.auth.login({ email, password });
      setUser(loginResponse?.data);
      navigate(location.state.loginRedirect || '/home');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    };
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
