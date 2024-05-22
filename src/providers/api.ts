import axios from 'axios';

const baseURL = process.env.BACKEND_URL || 'http://localhost:4000';

const jsonServerApi = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default jsonServerApi;
