import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.scss'
import {CssBaseline , ThemeProvider , createTheme} from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
)

