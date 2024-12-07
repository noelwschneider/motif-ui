import axios from 'axios';

// todo: replace baseURL w/ env-specific URLs
const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for handling token expiration and refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401 && !error.config._retry) {
            error.config._retry = true;
            try {
                await api.post('/auth/refresh');
                return api(error.config);
            } catch (refreshError) {
                console.error('Refresh token expired or invalid', refreshError);
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

/*
const handleLogout = async () => {
    await api.post('/auth/logout');
    window.location.href = '/login'; // Redirect to login page
  };
*/

export default api;
