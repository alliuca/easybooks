import { Api } from 'config';
import {
  FETCH_INVOICES,
  RESET_CURRENT_INVOICE,
  FETCH_INVOICE_LOCALES,
  FETCH_INVOICE,
  DELETE_INVOICE,
  SAVE_INVOICE,
  DOWNLOAD_INVOICE_PDF,
} from 'actions/types';

export const resetCurrentInvoice = () => dispatch => {
  dispatch({
    type: RESET_CURRENT_INVOICE,
  });
};

export const fetchInvoices = () => async dispatch => {
  const res = await Api.get('/invoices');
  const invoices = res.data;

  dispatch({
    type: FETCH_INVOICES,
    payload: invoices,
  });
};

export const fetchInvoiceLocales = number => async dispatch => {
  resetCurrentInvoice();
  const res = await Api.get(`/invoices/${number}`);
  if (res.data.constructor !== Array) {
    return dispatch({
      type: FETCH_INVOICE_LOCALES,
      payload: ['EN'],
    });
  }

  return dispatch({
    type: FETCH_INVOICE_LOCALES,
    payload: res.data,
  });
};

export const fetchInvoice = (number, locale) => async (dispatch, getState) => {
  let invoice = getState().invoices.all.find(invoice => invoice.invoiceNumber === number);
  if (!invoice) {
    const res = await Api.get(`/invoices/${number}/${locale}`);
    invoice = res.data;
  }

  dispatch({
    type: FETCH_INVOICE,
    payload: invoice,
  });
};

export const deleteInvoice = (number, locale) => async dispatch => {
  const res = await Api.delete(`/invoices/${number}/${locale}`);
  const deleted = res.data;

  dispatch({
    type: DELETE_INVOICE,
    payload: {
      number,
      msg: deleted,
    },
  });
};

export const saveInvoice = (number, locale, data) => async dispatch => {
  await Api.post(`/invoices/${number}/${locale}`, data);

  dispatch({
    type: SAVE_INVOICE,
    payload: data,
  });
};

export const downloadInvoicePDF = (number, locale) => async dispatch => {
  const res = await Api.get(`/invoices/${number}/${locale}/pdf`);
  console.log('res', res);
  const filepath = res.data;

  dispatch({
    type: DOWNLOAD_INVOICE_PDF,
    payload: filepath,
  });
};
