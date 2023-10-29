import axios from 'axios';

// import { env } from '.';

export const axiosPrivate = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});
