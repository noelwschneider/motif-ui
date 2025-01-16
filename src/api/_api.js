import axios from 'axios';
import addAuth from './auth';
import addCatalogs from './catalog';
import addSpotify from './spotify';


const api = axios.create({
  baseURL: 'http://127.0.0.1:5174/api', // todo: env variables
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

addAuth(api);
addCatalogs(api);
addSpotify(api);


export default api;
