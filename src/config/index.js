import axios from 'axios';

export const baseURL = process.env.REACT_APP_API;

export const Api = axios.create({
  baseURL: `${baseURL}/api`,
});
