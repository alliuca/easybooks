import axios from 'axios';
import Cookies from 'js-cookie';

export const baseURL = process.env.REACT_APP_API;

const Api = axios.create({
  baseURL: `${baseURL}/api`,
});

Api.interceptors.request.use(config => {
  const token = Cookies.get('EasyBooksToken');
  config.headers.Authorization = `Bearer ${encodeURIComponent(token)}`;
  return config;
});

const currencies = {
  CAD: { symbol: '$' },
  EUR: { symbol: '€' },
};

const statuses = ['Paid', 'Waiting'];

export { Api, currencies, statuses };
