import { Invoice, Locale, Action, DownloadInvoicePDFAction } from 'actions/invoices';
import { ActionTypes } from 'actions/types';
const {
  FETCH_INVOICES,
  RESET_CURRENT_INVOICE,
  FETCH_INVOICE,
  DELETE_INVOICE,
  SAVE_INVOICE,
  DOWNLOAD_INVOICE_PDF,
} = ActionTypes;

export interface InvoicesState {
  all: Invoice[];
  current: {
    locales?: {
      [key: string]: Invoice;
    };
  } | null;
}

const updateStateObject = <S extends { [key: string]: any } = InvoicesState>(
  state: S,
  obj: S[string],
  locale: keyof typeof Locale,
  keys: S[string]
) => {
  const object: any = { ...state[obj] };
  if (object && object.locales) {
    for (const property in keys) {
      object.locales[locale][property] = keys[property];
    }
    return { ...state, [obj]: object };
  }
  return state;
};

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
    case FETCH_INVOICE:
      return { ...state, current: { ...state.current, ...action.payload } };
    case DELETE_INVOICE:
      return {
        ...state,
        all: state.all.filter(invoice => invoice.invoiceNumber !== action.payload.number),
        current: null,
      };
    case SAVE_INVOICE:
      let newInvoices = [...state.all];
      const invoiceIndex = newInvoices.findIndex(invoice => invoice.key === action.payload.key);

      if (invoiceIndex < 0) {
        newInvoices.push(action.payload);
      } else {
        newInvoices[invoiceIndex] = action.payload;
      }

      return { ...state, all: newInvoices };
    case DOWNLOAD_INVOICE_PDF: {
      const { locale, pdfPath } = action.payload;
      return updateStateObject(state, 'current', locale, { pdfPath });
    }
    default:
      return state;
  }
};
