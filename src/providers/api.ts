import axios from 'axios';

const baseURL = 'http://localhost:4000' || process.env.BACKEND_URL;

const jsonServerApi = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default jsonServerApi;
