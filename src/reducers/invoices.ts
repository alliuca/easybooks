import { Invoice, Locale, Action } from 'actions/invoices';
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

export interface InvoicesState {
  all: Invoice[];
  current: Invoice | null;
}

const initialState: InvoicesState = {
  all: [],
  current: null,
};

export default (state = initialState, action: Action): InvoicesState => {
  switch (action.type) {
    case FETCH_INVOICES:
      return { ...state, all: action.payload };
    case RESET_CURRENT_INVOICE:
      return { ...state, current: null };
    case FETCH_INVOICE_LOCALES:
      if (!state.current) return state;
      return { ...state, current: { ...state.current, locales: action.payload } };
    case FETCH_INVOICE:
      return { ...state, current: { ...state.current, ...action.payload } };
    case DELETE_INVOICE:
      return {
        ...state,
        all: state.all.filter(invoice => invoice.invoiceNumber !== action.payload.number),
        current: null,
      };
    case SAVE_INVOICE:
      let newInvoices = state.all;
      const invoiceIndex = state.all.findIndex(invoice => invoice.key === action.payload.key);
      if (invoiceIndex < 0) {
        newInvoices.push(action.payload);
      } else {
        newInvoices[invoiceIndex] = action.payload;
      }
      return { ...state, all: newInvoices, current: null };
    case DOWNLOAD_INVOICE_PDF:
      if (!state.current) return state;
      return { ...state, current: { ...state.current, filepath: action.payload } };
    default:
      return state;
  }
};
