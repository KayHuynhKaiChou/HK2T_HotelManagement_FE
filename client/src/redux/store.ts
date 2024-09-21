import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { persistedReducer } from './reducers';
import { thunk } from 'redux-thunk';
import { createLogger } from 'redux-logger';
import persistStore from 'redux-persist/es/persistStore';

const loggerMiddleware = createLogger({ collapsed: true });

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk , loggerMiddleware)
);

// Tạo persistor để sử dụng với PersistGate
const persistor = persistStore(store);

export { store, persistor }