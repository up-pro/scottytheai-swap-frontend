import React, { lazy } from 'react'
import { useMediaQuery, useTheme } from "@mui/material"

// ----------------------------------------------------------------------------

const DPLimit = lazy(() => import('./DPLimit'))
const MBLimit = lazy(() => import('./MBLimit'))

// ----------------------------------------------------------------------------

export default function Limit() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      {isMobile ? <MBLimit /> : <DPLimit />}
    </>
  )
}