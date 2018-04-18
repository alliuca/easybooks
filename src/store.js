import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createReducer from './reducers';

export default function configureStore(initialState = {}) {
  const middlewares = [
    thunk,
  ];

  if (process.env.NODE_ENV !== 'production') {
    const { createLogger } = require('redux-logger');
    const logger = createLogger({
      collapsed: true,
      colors: {
        title: () => 'darkslategray',
        prevState: () => 'darkviolet',
        action: () => 'darkcyan',
        nextState: () => 'green',
        error: () => 'firebrick',
      },
      predicate: () => true, // Turn logger on/off easily
    });
    middlewares.push(logger);
  }

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? /* istanbul ignore next */
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : /* istanbul ignore next */
    compose;

  const store = createStore(
    createReducer(),
    {
      ...initialState,
    },
    composeEnhancers(...enhancers),
  );

  // Make reducers hot reloadable, see http://mxs.is/googmo
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      import('./reducers').then((reducerModule) => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);

        store.replaceReducer(nextReducers);
      });
    });
  }

  return store;
}
