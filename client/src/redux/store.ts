import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { persistedReducer } from './reducers';
import { thunk } from 'redux-thunk';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger({ collapsed: true });

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunk , loggerMiddleware)
);