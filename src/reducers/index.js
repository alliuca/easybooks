import { combineReducers } from 'redux';
import appReducer from './app';
import invoicesReducer from './invoices';

export default () => combineReducers({
  app: appReducer,
  invoices: invoicesReducer,
});
