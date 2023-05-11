import React, { lazy } from "react"
import { Link } from "react-router-dom"
import { Box, Button, Container, Stack } from "@mui/material"
import { grey } from "@mui/material/colors"

// -------------------------------------------------------------------------------------------

const Header = lazy(() => import('./Header'))
const Footer = lazy(() => import('./Footer'))

// -------------------------------------------------------------------------------------------

export default function LandingLayout() {
  return (
    <Stack sx={{ minHeight: '100vh' }}>
      <Header />
      <Box flexGrow={1}>
        <Container>
          <Stack direction="row" spacing={1}>
            <Stack direction="row">
              <Stack height={40} px={2} bgcolor={grey[800]} justifyContent="center">
                <Button component={Link} to="/">Swap</Button>
              </Stack>
              <Box
                width={0}
                height={0}
                sx={{
                  borderBottom: `40px solid ${grey[800]}`,
                  borderRight: '30px solid transparent'
                }}
              />
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Footer />
    </Stack>
  )
}