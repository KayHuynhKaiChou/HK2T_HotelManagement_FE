import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { rootReducer } from './reducers';
import { thunk } from 'redux-thunk';
import { createLogger } from 'redux-logger';
import persistStore from 'redux-persist/es/persistStore';

const loggerMiddleware = createLogger({ collapsed: true });
//@ts-ignore
const store = createStore(
  rootReducer,
  applyMiddleware(thunk , loggerMiddleware)
);

//@ts-ignore 
// Tạo persistor để sử dụng với PersistGate
const persistor = persistStore(store);

export { store, persistor }