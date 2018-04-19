import axios from 'axios';

export const baseURL = 'http://localhost:3030';

export const Api = axios.create({
  baseURL: `${baseURL}/api`,
});
