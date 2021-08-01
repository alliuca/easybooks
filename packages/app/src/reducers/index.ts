import { combineReducers } from 'redux';
import appReducer from './app';
import invoicesReducer from './invoices';
import profileReducer from './profile';

const rootReducer = combineReducers({
  app: appReducer,
  invoices: invoicesReducer,
  profile: profileReducer,
});

export default () => rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
