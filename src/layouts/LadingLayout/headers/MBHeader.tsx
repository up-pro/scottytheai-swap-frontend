import { useState, useEffect, ChangeEvent } from 'react';
import { AppBar, Box, Button, Container, FormControlLabel, Paper, Radio, RadioGroup, Stack, Toolbar, useTheme } from "@mui/material";
// import { useWeb3Modal } from '@web3modal/react';
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi';
import { ArrowDropDown } from '@mui/icons-material';
import { useClickOutside } from "@mantine/hooks";
import { toast } from 'react-toastify';

export default function MBHeader() {
  const theme = useTheme()
  // const { open } = useWeb3Modal()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { switchNetwork } = useSwitchNetwork()
  const { chain } = useNetwork()

  const [switchNetworkMenuOpened, setSwitchNetworkMenuOpened] = useState(false)
  const [currentChainId, setCurrentChainId] = useState<number>(1)

  const ref = useClickOutside(() => setSwitchNetworkMenuOpened(false))

  useEffect(() => {
    if (chain) {
      setCurrentChainId(chain.id)
    }
  }, [chain])

  const handleCurrentChainId = (e: ChangeEvent<HTMLInputElement>) => {
    const chainId = Number(e.target.value)
    switchNetwork?.(chainId)
  }

  const handleConnectWallet = () => {
    toast.info('Coming Soon')
  }

  return (
    <Stack spacing={3}>
      <AppBar position="static" sx={{ py: 1 }}>
        <Toolbar>
          <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              component="img"
              src="/assets/images/logo.png"
              alt="logo"
              width="70%"
            />
          </Container>
        </Toolbar>
      </AppBar>

      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
        {/* Switch network */}
        <Box position="relative">
          <Button
            onClick={() => setSwitchNetworkMenuOpened(!switchNetworkMenuOpened)}
            endIcon={<ArrowDropDown />}
            disabled={!isConnected}
          >Ethereum</Button>
          <Paper
            sx={{
              position: 'absolute',
              display: switchNetworkMenuOpened ? 'flex' : 'none',
              flexDirection: "column",
              top: '120%',
              p: 1,
              minWidth: 260,
              borderTop: `2px solid ${theme.palette.primary.main}`,
              zIndex: 9999
            }}
            ref={ref}
          >
            <RadioGroup onChange={handleCurrentChainId} value={currentChainId}>
              <FormControlLabel
                control={<Radio />}
                label="Switch to Mainnet"
                labelPlacement="start"
                sx={{ justifyContent: 'space-between' }}
                componentsProps={{ typography: { fontSize: 18 } }}
                value={1}
              />
              <FormControlLabel
                control={<Radio />}
                label="Switch to BSC"
                labelPlacement="start"
                sx={{ justifyContent: 'space-between' }}
                componentsProps={{ typography: { fontSize: 18 } }}
                value={56}
              />
            </RadioGroup>
          </Paper>
        </Box>

        {isConnected ? (
          <Button variant="contained" sx={{ borderRadius: 9999 }} onClick={() => disconnect()}>Disconnect</Button>
        ) : (
          <Button variant="contained" sx={{ borderRadius: 9999 }} onClick={() => handleConnectWallet()}>Connect Wallet</Button>
        )}
      </Stack>
    </Stack>

  )
}