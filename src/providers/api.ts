import axios from 'axios';

const baseURL =
  process.env.IS_DEVELOPMENT === 'true'
    ? 'http://localhost:4000'
    : 'https://dashboard-api-cyan-delta.vercel.app/';

const jsonServerApi = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default jsonServerApi;
