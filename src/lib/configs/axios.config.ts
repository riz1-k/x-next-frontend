import axios from 'axios';
import { env } from '~/lib/configs/env.config';

export const axiosPrivate = axios.create({
  baseURL: env.BACKEND_URL,
  withCredentials: true,
});
