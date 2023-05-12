import React, { Suspense } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { mainnet, bsc } from 'wagmi/chains';
import Routes from './Routes';
import Loading from './components/Loading';

// ---------------------------------------------------------------------------------

const projectId = process.env.REACT_APP_CONNECT_PROJECT_ID || ''
const chains = [mainnet, bsc]
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

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
      <WagmiConfig config={wagmiConfig}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </ThemeProvider>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </Suspense>
  );
}

export default App;
