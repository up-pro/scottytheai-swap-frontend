"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppBar, Toolbar, Container, Button, Stack, Box, FormControlLabel, Switch, useTheme, Paper } from '@mui/material'
import { ArrowDropDown } from '@mui/icons-material';

// ---------------------------------------------------------------------------------------

export default function Header() {
  const theme = useTheme()
  const [switchNetworkMenuOpened, setSwitchNetworkMenuOpened] = useState(false)

  return (
    <AppBar position="static" sx={{ py: 1 }}>
      <Toolbar>
        <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" alignItems="center" spacing={4}>
            <Button variant="text" component={Link} href="/">Swap</Button>
            <Button variant="text" component={Link} href="/limit">Limit</Button>
          </Stack>

          <Image
            src="/assets/images/logo.png"
            alt="logo"
            width={303}
            height={60}
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