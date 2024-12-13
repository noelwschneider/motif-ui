import axios from 'axios';
import addAuth from './auth';
import addSpotify from './spotify';


const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api', // todo: env variables
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

addAuth(api);
addSpotify(api);


export default api;
