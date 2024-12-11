import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000', // todo: env variables
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

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
    if (
      error.response?.status === 401 
      && !originalRequest._retry 
      && originalRequest.url !== '/auth/login'
      && originalRequest.url !== '/auth/refresh'
    ) {
      originalRequest._retry = true;
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const { data } = await api.post('/auth/refresh');
          isRefreshing = false;
          onRefreshed(data.token);
          return api(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          subscribers.forEach((callback) => callback(null));
          subscribers = [];
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((token) => {
          if (token) {
            api(originalRequest)
              .then(resolve)
              .catch(reject)
          } else {
            reject(new Error('Token refresh failed'));
          }
        });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
