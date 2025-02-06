import axios from 'axios';
import { getCookie } from '../_util';
import addAuth from './auth';
import addCatalogs from './catalogs';
import addReviews from './reviews';
import addSpotify from './spotify';
import addUser from './user';


// api instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:5174/api', // todo: env variables
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});


// modules
addAuth(api);
addCatalogs(api);
addReviews(api);
addSpotify(api);
addUser(api);


// interceptors
api.interceptors.response.use(
  (response) => {
    try {
      const newCsrfToken = getCookie("csrf_access_token");
      api.defaults.headers["X-CSRF-TOKEN"] = newCsrfToken;
      return response;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      throw error;
    };
  },
  async (error) => {
    if (error.response?.status === 401) {
      const authCookie = getCookie("access_token_cookie");
      if (authCookie) {
        console.warn("Session expired. Logging out...");
        try {
          await api.auth.logout();
        } catch (logoutError) {
          console.error("Error during logout:", logoutError);
        }
        window.location.href = "/login?sessionExpired=true";
      }
    };
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  const csrfToken = getCookie('csrf_access_token');
  if (csrfToken) {
      config.headers['X-CSRF-TOKEN'] = csrfToken;
  };
  return config;
});


export default api;
