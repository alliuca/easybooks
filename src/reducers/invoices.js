import {
  FETCH_INVOICES,
  RESET_CURRENT_INVOICE,
  FETCH_INVOICE,
  DELETE_INVOICE,
  SAVE_INVOICE,
  DOWNLOAD_INVOICE_PDF,
} from 'actions/types';

const initialState = {
  all: [],
  current: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INVOICES:
      return { ...state, all: action.payload };
    case RESET_CURRENT_INVOICE:
      return { ...state, current: null };
    case FETCH_INVOICE:
      return { ...state, current: { ...state.current, ...action.payload } };
    case DELETE_INVOICE:
      return { ...state, all: state.all.filter(invoice => invoice.invoiceNumber !== action.payload.number), current: null };
    case SAVE_INVOICE:
      const newInvoices = state.all.map(invoice => invoice.key !== action.payload.key ? invoice : { ...invoice, ...action.payload });
      return { ...state, all: newInvoices, current: null };
    case DOWNLOAD_INVOICE_PDF:
      return { ...state, current: { ...state.current, filepath: action.payload } };
    default:
      return state;
  }
}
