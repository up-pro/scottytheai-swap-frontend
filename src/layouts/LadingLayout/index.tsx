import React, { lazy } from "react"
import { Link, Outlet } from "react-router-dom"
import { Box, Button, Container, Stack, useTheme } from "@mui/material"
import { grey } from "@mui/material/colors"

// -------------------------------------------------------------------------------------------

const Header = lazy(() => import('./Header'))
const Footer = lazy(() => import('./Footer'))

// -------------------------------------------------------------------------------------------

export default function LandingLayout() {
  const theme = useTheme()
  return (
    <Stack sx={{ minHeight: '100vh' }} bgcolor={theme.palette.background.default}>
      <Header />
      <Box flexGrow={1} py={8}>
        <Container>
          {/* Tab buttons */}
          <Stack direction="row" mb={1}>
            {/* Swap */}
            <Stack direction="row">
              <Stack height={40} px={2} bgcolor={grey[800]} justifyContent="center">
                <Button component={Link} to="/swap">Swap</Button>
              </Stack>
              <Box
                width={0}
                height={0}
                sx={{
                  borderBottom: `40px solid ${grey[800]}`,
                  borderRight: '20px solid transparent'
                }}
              />
            </Stack>

            {/* Limit */}
            <Box position="relative">
              <Stack height={40} width={80} px={2} bgcolor={grey[800]} justifyContent="center" sx={{ transform: 'skew(28deg)' }} />
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
                  borderTop: `40px solid ${grey[800]}`,
                  borderLeft: '21px solid transparent'
                }}
              />
              <Stack height={40} px={2} bgcolor={grey[800]} justifyContent="center">
                <Button component={Link} to="/farm">Farm</Button>
              </Stack>
            </Stack>
          </Stack>

          <Outlet />
        </Container>
      </Box>
      <Footer />
    </Stack >
  )
}