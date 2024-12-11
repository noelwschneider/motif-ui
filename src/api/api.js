import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000', // todo: env variables
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// check if a token refresh is in progress
let isRefreshing = false;
let subscribers = [];

const subscribeTokenRefresh = (callback) => {
  subscribers.push(callback);
};

const onRefreshed = (token) => {
  subscribers.forEach((callback) => callback(token));
  subscribers = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // ensure refresh only runs once
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await api.post('/auth/refresh');
          isRefreshing = false;
          onRefreshed();
          return api(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          subscribers = [];
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      // queue subsequent requests while refreshing
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh(() => {
          api(originalRequest)
            .then(resolve)
            .catch(reject);
        });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
