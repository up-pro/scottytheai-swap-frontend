import { Box } from '@mui/material'
import { SwapWidget, Theme } from '@uniswap/widgets'
import { grey, orange } from '@mui/material/colors'
import { CHAIN_ID } from '../../utils/constants'

const theme: Theme = {
  primary: '#FFF',
  secondary: grey[100],
  interactive: orange[700],
  container: grey[800],
  module: grey[900],
  accent: orange[700],
  outline: orange[700],
  dialog: '#000',
  accentSoft: orange[700],
  fontFamily: "'JetBrains Mono', monospace",
}

export default function Swap() {
  return (
    <Box className="Uniswap">
      <SwapWidget
        defaultChainId={CHAIN_ID}
        theme={theme}
      />
    </Box>
  )
}