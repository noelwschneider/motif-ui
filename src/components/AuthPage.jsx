import { useState } from 'react';
import Login from './Login';
import Register from './Register';


function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => setIsLogin(!isLogin);

  // todo
  const handleLoginSuccess = (token) => {
    console.log('login token:', token);
  };

  return (
    <div>
      {isLogin ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Register />
      )}
      <button onClick={handleToggle}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default AuthPage;
