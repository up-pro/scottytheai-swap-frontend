import { Suspense } from 'react'
import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { bsc } from 'viem/chains'
import { ThemeProvider, createTheme } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { EthereumClient, w3mConnectors } from '@web3modal/ethereum'
import { createPublicClient, http } from 'viem'
import { ToastContainer } from 'react-toastify'
import { Web3Modal } from '@web3modal/react'
import Routes from './Routes'
import Loading from './components/Loading'

//  --------------------------------------------------------------------------------------------------

const projectId = import.meta.env.VITE_PROJECT_ID || ''
const chains = [mainnet, bsc]
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http()
  })
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

//  --------------------------------------------------------------------------------------------------

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
      <ToastContainer />
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </Suspense>
  )
}

export default App
