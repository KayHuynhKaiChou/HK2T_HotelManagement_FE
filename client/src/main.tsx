import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { persistor, store } from './redux/store.ts';
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {CssBaseline , ThemeProvider , createTheme, StyledEngineProvider} from '@mui/material';
import { ToastContainer } from 'react-toastify';
import './styles/index.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import '../src/styles/applicationCommonStyle.scss';
import './HotelSource/Admin/styles/applicationAdminStyle.scss';
import './HotelSource/Customer/styles/applicationCustomerStyle.scss'
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';

const theme = createTheme({
  palette: {
    mode: 'light',
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={new QueryClient()}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
            <ToastContainer/>
          </ThemeProvider>
        </StyledEngineProvider>
      </PersistGate>
    </Provider>
  </QueryClientProvider>
)

