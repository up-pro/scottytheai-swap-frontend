import React, { lazy } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { Box, Button, Container, Stack, useMediaQuery, useTheme } from "@mui/material"
import { grey } from "@mui/material/colors"

// -------------------------------------------------------------------------------------------

const DPHeader = lazy(() => import('./headers/DPHeader'))
const MBHeader = lazy(() => import('./headers/MBHeader'))
const DPFooter = lazy(() => import('./footers/DPFooter'))
const MBFooter = lazy(() => import('./footers/MBFooter'))

// -------------------------------------------------------------------------------------------

export default function LandingLayout() {
  const theme = useTheme()
  const { pathname } = useLocation()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Stack sx={{ minHeight: '100vh' }} bgcolor={theme.palette.background.default}>
      {isMobile ? <MBHeader /> : <DPHeader />}
      <Box flexGrow={1} py={{ xs: 4, md: 8 }}>
        <Container>
          {/* Tab buttons */}
          <Stack direction="row" mb={1} justifyContent={{ xs: 'space-between', sm: 'start' }}>
            {/* Swap */}
            <Stack direction="row">
              <Stack height={40} px={2} justifyContent="center" bgcolor={pathname === '/swap' ? theme.palette.primary.main : grey[800]}>
                <Button component={Link} to="/swap">Swap</Button>
              </Stack>
              <Box
                width={0}
                height={0}
                sx={{
                  borderBottom: `40px solid ${pathname === '/swap' ? theme.palette.primary.main : grey[800]}`,
                  borderRight: '20px solid transparent'
                }}
              />
            </Stack>

            {/* Limit */}
            <Box position="relative">
              <Stack
                height={40}
                width={80}
                px={2}
                bgcolor={pathname === '/limit' ? theme.palette.primary.main : grey[800]}
                justifyContent="center"
                sx={{ transform: 'skew(28deg)' }}
              />
              <Stack justifyContent="center" alignItems="center" position="absolute" height="100%" width="100%" top={0} left={0}>
                <Button component={Link} to="/limit">Limit</Button>
              </Stack>
            </Box>

            {/* Farm */}
            <Stack direction="row">
              <Box
                width={0}
                height={0}
                sx={{
                  borderTop: `40px solid ${pathname === '/farm' ? theme.palette.primary.main : grey[800]}`,
                  borderLeft: '21px solid transparent'
                }}
              />
              <Stack height={40} px={2} bgcolor={pathname === '/farm' ? theme.palette.primary.main : grey[800]} justifyContent="center">
                <Button component={Link} to="/farm">Farm</Button>
              </Stack>
            </Stack>
          </Stack>

          <Outlet />
        </Container>
      </Box>
      {isMobile ? <MBFooter /> : <DPFooter />}
    </Stack >
  )
}