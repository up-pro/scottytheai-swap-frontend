import React, { Suspense } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Loading from './components/Loading';

// ---------------------------------------------------------------------------------

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FD7C1E'
    }
  },
  typography: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 18
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: 'white'
        }
      }
    }
  }
})

// ---------------------------------------------------------------------------------

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
