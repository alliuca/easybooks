import { Api } from 'config';
import { Dispatch } from 'redux';
import { Subtract } from 'utility-types';
import utils from 'utils';
import { InvoicesState } from 'reducers/invoices';
import { ActionTypes } from 'actions/types';
import { SettingsData } from 'actions/app';
const {
  FETCH_INVOICES,
  RESET_CURRENT_INVOICE,
  FETCH_INVOICE,
  DELETE_INVOICE,
  SAVE_INVOICE_REQUEST,
  SAVE_INVOICE,
  DOWNLOAD_INVOICE_PDF,
} = ActionTypes;

// TODO: maybe move general enums/types into a separate file
export enum Locale {
  EN = 'EN',
  IT = 'IT',
}

export enum CurrencyValues {
  CAD = 'CAD',
  EUR = 'EUR',
}

export type Currency = {
  [key in CurrencyValues]: {
    value: string;
    symbol: string;
  };
};

export enum StatusValues {
  Waiting = 'Waiting',
  Paid = 'Paid',
}

export type Status = Array<keyof typeof StatusValues>;

export interface Invoice {
  key: string;
  invoiceNumber: string;
  dateOfIssue: string;
  client: string;
  currency: {
    value: keyof typeof CurrencyValues;
    symbol: string;
  };
  billedTo: string;
  amount: string;
  subtotal: string;
  status: string;
  items: {
    key: string;
    name: string;
    description: string;
    hours: number;
    amount: string;
  }[];
  fees: {
    items: {
      key: string;
      name: string;
      value: string;
      editable: boolean;
    }[];
  };
  terms: string;
  notes: string;
  settings: SettingsData;
  locale: keyof typeof Locale;
  pdfPath: string;
}

export type InvoiceGlobals = Pick<Invoice, 'client' | 'currency' | 'status'>;

export type Action =
  | ResetCurrentInvoiceAction
  | FetchInvoicesAction
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

export interface FetchInvoiceAction {
  type: ActionTypes.FETCH_INVOICE;
  payload: {
    locales: {
      [key: string]: Invoice;
    };
  };
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
  current: InvoicesState['current'];
}

export interface DownloadInvoicePDFAction {
  type: ActionTypes.DOWNLOAD_INVOICE_PDF;
  payload: {
    locale: keyof typeof Locale;
    pdfPath: string;
  };
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

export const fetchInvoice = (number: string) => async (dispatch: Dispatch) => {
  const res = await Api.get(`/invoices/${number}`);
  const invoice = res.data;

  dispatch<FetchInvoiceAction>({
    type: FETCH_INVOICE,
    payload: invoice,
  });
};

export const deleteInvoice = (number: string, locale: string) => async (dispatch: Dispatch) => {
  await utils.stall();

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

export const saveInvoice = (
  number: string,
  locale: keyof typeof Locale,
  globals: InvoiceGlobals,
  data: Subtract<Invoice, InvoiceGlobals>
) => async (dispatch: Dispatch, getState: Function) => {
  await utils.stall();

  // Make a save call for each locale (cause globals like client, status, etc might have changed)
  // TODO: I'm sure I'll come up with a better solution that involves API restructuring
  const current = getState().invoices.current;
  let locales = { ...current.locales };
  if (current && !current.error && locales) {
    (Object.keys(locales) as Array<keyof typeof Locale>).map(async l => {
      const newData = l === locale ? { ...globals, ...data } : { ...locales[l], ...globals };
      await Api.post(`/invoices/${number}/${l}`, newData);
      locales[l] = newData;
    });
  } else {
    const newData = { ...globals, ...data };
    await Api.post(`/invoices/${number}/${locale}`, { ...globals, ...data });
    locales[locale] = newData;
  }

  dispatch<SaveInvoiceAction>({
    type: SAVE_INVOICE,
    payload: { ...data, ...globals },
    current: { locales },
  });
};

export const downloadInvoicePDF = (number: string, locale: keyof typeof Locale) => async (
  dispatch: Dispatch,
  getState: Function
) => {
  let pdfPath = getState().invoices.current.locales[locale].pdfPath;
  // if (!pdfPath) {
  const res = await Api.get(`/invoices/${number}/${locale}/pdf`);
  pdfPath = res.data;
  // }

  await utils.stall();

  dispatch<DownloadInvoicePDFAction>({
    type: DOWNLOAD_INVOICE_PDF,
    payload: {
      locale,
      pdfPath,
    },
  });
};
