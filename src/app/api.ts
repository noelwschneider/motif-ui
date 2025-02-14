import axios from 'axios';
import { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getCookie } from 'utils/utils';

import addAuth, { AuthApi } from 'utils/api/auth';
import addCatalogs, { CatalogsApi } from 'utils/api/catalogs';
import addReviews, { ReviewsApi } from 'utils/api/reviews';
import addSpotify, { SpotifyApi } from 'utils/api/spotify';
import addUser, { UserApi } from 'utils/api/user';


const api: MotifApiInstance = axios.create({
  baseURL: 'http://127.0.0.1:5174/api', // todo: use env variables
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
  (response: AxiosResponse) => {
    try {
      const newCsrfToken = getCookie("csrf_access_token");
      if (newCsrfToken) {
        api.defaults.headers["X-CSRF-TOKEN"] = newCsrfToken;
      }
      return response;
    } catch (error) {
      console.error("Failed to refresh CSRF token:", error);
      throw error;
    }
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const authCookie = getCookie("access_token_cookie");
      if (authCookie) {
        console.warn("Session expired. Logging out...");
        try {
          await api.auth?.logout();
        } catch (logoutError) {
          console.error("Error during logout:", logoutError);
        }
        window.location.href = "/login?sessionExpired=true";
      }
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const csrfToken = getCookie('csrf_access_token');
  if (csrfToken) {
    config.headers['X-CSRF-TOKEN'] = csrfToken;
  }
  return config;
});


export default api;


export interface MotifApiInstance extends AxiosInstance {
  auth?: AuthApi;
  catalogs?: CatalogsApi;
  reviews?: ReviewsApi;
  spotify?: SpotifyApi;
  user?: UserApi;
};