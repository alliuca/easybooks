import { combineReducers } from 'redux';
import appReducer from './app';
import invoicesReducer from './invoices';
import profileReducer from './profile';

export default () =>
  combineReducers({
    app: appReducer,
    invoices: invoicesReducer,
    profile: profileReducer,
  });
