
import axios from 'axios';

const Instance = axios.create({
  baseURL: 'https://68441fab71eb5d1be0327556.mockapi.io',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Instance;
