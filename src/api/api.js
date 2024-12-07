import axios from 'axios';

// todo: replace baseURL w/ env-specific URLs
const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
