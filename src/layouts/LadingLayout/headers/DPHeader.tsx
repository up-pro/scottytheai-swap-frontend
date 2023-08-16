import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Container, Stack, Button, Box, useTheme, Paper, FormControlLabel, Radio, RadioGroup, useMediaQuery } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import { useWeb3Modal } from "@web3modal/react"
import { useAccount, useDisconnect, useSwitchNetwork, useNetwork } from "wagmi"
import { useClickOutside } from "@mantine/hooks";

// ---------------------------------------------------------------------------------

export default function DPHeader() {
  const theme = useTheme()
  const { open } = useWeb3Modal()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { switchNetwork } = useSwitchNetwork()
  const { chain } = useNetwork()

  const [switchNetworkMenuOpened, setSwitchNetworkMenuOpened] = useState(false)
  const [currentChainId, setCurrentChainId] = useState<number>(1)
  const ref = useClickOutside(() => setSwitchNetworkMenuOpened(false))

  const isTablet = useMediaQuery(theme.breakpoints.down('lg'))

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
    open?.()
  }

  return (
    <AppBar position="static" sx={{ py: 1 }}>
      <Toolbar>
        <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" alignItems="center" spacing={4}>
            <Button variant="text" component={Link} to="/swap">Swap</Button>
            <Button variant="text" component={Link} to="/limit">Limit</Button>
          </Stack>

          <Box
            component="img"
            src="/assets/images/logo.svg"
            sx={{ width: 360 }}
            alt="logo"
          />

          <Stack direction="row" alignItems="center" spacing={4}>
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
                  left: '-80%',
                  p: 1,
                  minWidth: 260,
                  borderTop: `2px solid ${theme.palette.primary.main}`,
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
              <Button variant="contained" sx={{ borderRadius: 9999 }} onClick={() => handleConnectWallet()}>
                {isTablet ? 'Connect' : 'Connect Wallet'}
              </Button>
            )}
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  )
}