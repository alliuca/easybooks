export enum ActionTypes {
  // app
  SET_MESSAGES = 'SET_MESSAGES',
  CLEAR_ALL_MESSAGES = 'CLEAR_ALL_MESSAGES',
  FETCH_SETTINGS = 'FETCH_SETTINGS',
  SAVE_SETTINGS = 'SAVE_SETTINGS',
  LOGIN = 'LOGIN',
  GET_LOGIN_TOKEN = 'GET_LOGIN_TOKEN',
  // invoices
  FETCH_INVOICES = 'FETCH_INVOICES',
  RESET_CURRENT_INVOICE = 'RESET_CURRENT_INVOICE',
  FETCH_INVOICE = 'FETCH_INVOICE',
  DELETE_INVOICE = 'DELETE_INVOICE',
  SAVE_INVOICE_REQUEST = 'SAVE_INVOICE_REQUEST',
  SAVE_INVOICE = 'SAVE_INVOICE',
  DOWNLOAD_INVOICE_PDF = 'DOWNLOAD_INVOICE_PDF',
  // profile
  FETCH_PROFILE = 'FETCH_PROFILE',
  SAVE_PROFILE = 'SAVE_PROFILE',
}
