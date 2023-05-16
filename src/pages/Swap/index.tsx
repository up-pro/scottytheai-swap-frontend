import React, { lazy } from 'react'
import { useMediaQuery, useTheme } from "@mui/material"

// ----------------------------------------------------------------------------

const DPSwap = lazy(() => import('./DPSwap'))
const MBSwap = lazy(() => import('./MBSwap'))

// ----------------------------------------------------------------------------

export default function Swap() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      {isMobile ? <MBSwap /> : <DPSwap />}
    </>
  )
}