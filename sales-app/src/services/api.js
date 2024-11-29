import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', //base URL of my localhost
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
