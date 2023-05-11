import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Container, Stack, Button, Box, useTheme, Paper, FormControlLabel, Switch } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";

// ---------------------------------------------------------------------------------

export default function Header() {
  const theme = useTheme()
  const [switchNetworkMenuOpened, setSwitchNetworkMenuOpened] = useState(false)

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
            src="/assets/images/logo.png"
            alt="logo"
          />

          <Stack direction="row" alignItems="center" spacing={4}>
            {/* Switch network */}
            <Box position="relative">
              <Button
                onClick={() => setSwitchNetworkMenuOpened(!switchNetworkMenuOpened)}
                endIcon={<ArrowDropDown />}
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
                }}
              >
                <FormControlLabel
                  control={<Switch />}
                  label="Switch to Mainnet"
                  labelPlacement="start"
                  sx={{ justifyContent: 'space-between' }}
                  componentsProps={{ typography: { fontSize: 18 } }}
                />
                <FormControlLabel
                  control={<Switch />}
                  label="Switch to BSC"
                  labelPlacement="start"
                  sx={{ justifyContent: 'space-between' }}
                  componentsProps={{ typography: { fontSize: 18 } }}
                />
              </Paper>
            </Box>

            <Button variant="contained" sx={{ borderRadius: 9999 }}>Connect Wallet</Button>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  )
}