import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { store } from './redux/store.ts'
import { Provider } from "react-redux";
import './styles/index.scss'
import {CssBaseline , ThemeProvider , createTheme, StyledEngineProvider} from '@mui/material'
import '@fortawesome/fontawesome-free/css/all.css';
import '../src/styles/applicationCommonStyle.scss';
import './HotelSource/Admin/styles/applicationAdminStyle.scss';
import './HotelSource/Customer/styles/applicationCustomerStyle.scss'

const theme = createTheme({
  palette: {
    mode: 'light',
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </Provider>
)

