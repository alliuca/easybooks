import axios from 'axios';
import Cookies from 'js-cookie';
import { Currency, Status } from 'actions/invoices';

export const baseURL = process.env.REACT_APP_API;

const Api = axios.create({
  baseURL: `${baseURL}/api`,
});

Api.interceptors.request.use(config => {
  const token = Cookies.get('EasyBooksToken');
  if (token) config.headers.Authorization = `Bearer ${encodeURIComponent(token)}`;
  return config;
});

const currencies: Currency = {
  CAD: { value: 'CAD', symbol: '$' },
  EUR: { value: 'EUR', symbol: '€' },
};

const statuses: Status = ['Waiting', 'Paid'];

export { Api, currencies, statuses };
