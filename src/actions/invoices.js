import { Api } from 'config';
import {
  FETCH_INVOICES,
  RESET_CURRENT_INVOICE,
  FETCH_INVOICE,
  DELETE_INVOICE,
  SAVE_INVOICE,
  DOWNLOAD_INVOICE_PDF,
} from 'actions/types';

export const resetCurrentInvoice = () => dispatch => {
  dispatch ({
    type: RESET_CURRENT_INVOICE,
  });
}

export const fetchInvoices = () => async dispatch => {
  const res = await Api.get('/invoices');
  const invoices = res.data;

  dispatch({
    type: FETCH_INVOICES,
    payload: invoices,
  });
}

export const fetchInvoice = (number) => async (dispatch, getState) => {
  resetCurrentInvoice();

  let invoice = getState().invoices.all.find(invoice => invoice.invoiceNumber === number);
  if (!invoice) {
    const res = await Api.get(`/invoices/${number}`);
    invoice = res.data;
  }

  dispatch({
    type: FETCH_INVOICE,
    payload: invoice,
  });
}

export const deleteInvoice = (number) => async dispatch => {
  const res = await Api.delete(`/invoices/${number}`);
  const deleted = res.data;

  dispatch({
    type: DELETE_INVOICE,
    payload: {
      number,
      msg: deleted,
    }
  });
}

export const saveInvoice = (number, data) => async dispatch => {
  await Api.post(`/invoices/${number}`, data);

  dispatch({
    type: SAVE_INVOICE,
    payload: data,
  });
}

export const downloadInvoicePDF = (number) => async dispatch => {
  const res = await Api.get(`/invoices/${number}/pdf`);
  const filepath = res.data;

  dispatch({
    type: DOWNLOAD_INVOICE_PDF,
    payload: filepath,
  });
};
