import { Api } from 'config';
import { Dispatch } from 'redux';
import { ActionTypes } from 'actions/types';
const {
  FETCH_INVOICES,
  RESET_CURRENT_INVOICE,
  FETCH_INVOICE_LOCALES,
  FETCH_INVOICE,
  DELETE_INVOICE,
  SAVE_INVOICE,
  DOWNLOAD_INVOICE_PDF,
} = ActionTypes;

export enum Locale {
  EN = 'EN',
  IT = 'IT',
}

export interface Invoice {
  key: string;
  invoiceNumber: string;
  dateOfIssue: string;
  client: string;
  currency: {};
  billedTo: string;
  amount: string;
  status: string;
  locales: Locale[];
  filepath: string;
}

export type Action =
  | ResetCurrentInvoiceAction
  | FetchInvoicesAction
  | FetchInvoiceLocalesAction
  | FetchInvoiceAction
  | DeleteInvoiceAction
  | SaveInvoiceAction
  | DownloadInvoicePDFAction;

export interface ResetCurrentInvoiceAction {
  type: ActionTypes.RESET_CURRENT_INVOICE;
}

export interface FetchInvoicesAction {
  type: ActionTypes.FETCH_INVOICES;
  payload: Invoice[];
}

export interface FetchInvoiceLocalesAction {
  type: ActionTypes.FETCH_INVOICE_LOCALES;
  payload: Locale[];
}

export interface FetchInvoiceAction {
  type: ActionTypes.FETCH_INVOICE;
  payload: Invoice;
}

export interface DeleteInvoiceAction {
  type: ActionTypes.DELETE_INVOICE;
  payload: {
    number: string;
    msg: string;
  };
}

export interface SaveInvoiceAction {
  type: ActionTypes.SAVE_INVOICE;
  payload: Invoice;
}

export interface DownloadInvoicePDFAction {
  type: ActionTypes.DOWNLOAD_INVOICE_PDF;
  payload: string;
}

export const resetCurrentInvoice = () => (dispatch: Dispatch) => {
  dispatch<ResetCurrentInvoiceAction>({
    type: RESET_CURRENT_INVOICE,
  });
};

export const fetchInvoices = () => async (dispatch: Dispatch) => {
  const res = await Api.get('/invoices');
  const invoices = res.data;

  dispatch<FetchInvoicesAction>({
    type: FETCH_INVOICES,
    payload: invoices,
  });
};

export const fetchInvoiceLocales = (number: string) => async (dispatch: Dispatch) => {
  resetCurrentInvoice();
  const res = await Api.get(`/invoices/${number}`);
  if (res.data.constructor !== Array) {
    return dispatch<FetchInvoiceLocalesAction>({
      type: FETCH_INVOICE_LOCALES,
      payload: [Locale.EN],
    });
  }

  return dispatch<FetchInvoiceLocalesAction>({
    type: FETCH_INVOICE_LOCALES,
    payload: res.data,
  });
};

export const fetchInvoice = (number: string, locale: string) => async (
  dispatch: Dispatch,
  getState: Function
) => {
  let invoice = getState().invoices.all.find(
    (invoice: Invoice) => invoice.invoiceNumber === number
  );
  if (!invoice) {
    const res = await Api.get(`/invoices/${number}/${locale}`);
    invoice = res.data;
  }

  dispatch<FetchInvoiceAction>({
    type: FETCH_INVOICE,
    payload: invoice,
  });
};

export const deleteInvoice = (number: string, locale: string) => async (dispatch: Dispatch) => {
  const res = await Api.delete(`/invoices/${number}/${locale}`);
  const deleted = res.data;

  dispatch<DeleteInvoiceAction>({
    type: DELETE_INVOICE,
    payload: {
      number,
      msg: deleted,
    },
  });
};

export const saveInvoice = (number: string, locale: string, data: Invoice) => async (
  dispatch: Dispatch
) => {
  await Api.post(`/invoices/${number}/${locale}`, data);

  dispatch<SaveInvoiceAction>({
    type: SAVE_INVOICE,
    payload: data,
  });
};

export const downloadInvoicePDF = (number: string, locale: string) => async (
  dispatch: Dispatch
) => {
  const res = await Api.get(`/invoices/${number}/${locale}/pdf`);
  console.log('res', res);
  const filepath = res.data;

  dispatch<DownloadInvoicePDFAction>({
    type: DOWNLOAD_INVOICE_PDF,
    payload: filepath,
  });
};
