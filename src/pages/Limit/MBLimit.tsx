import { useState, ChangeEvent } from 'react'
import { Box, Button, ButtonGroup, MenuItem, Stack, Typography, useTheme } from '@mui/material'
import { InfoOutlined, LockOpen } from '@mui/icons-material'
import { CRYPTO_SELECT_ITEMS, REGEX_NUMBER_VALID } from '../../utils/constants'
import { TMode } from '../../utils/types'
import { Panel, TextFieldForCryptoAmount, TextFieldForCryptoSelect } from '../../components/styledComponents'
import { grey } from '@mui/material/colors'

export default function MBLimit() {
  const theme = useTheme()

  const [mode, setMode] = useState<TMode>('buy')
  const [fromTokenValue, setFromTokenValue] = useState<string>(CRYPTO_SELECT_ITEMS[0].value)
  const [fromTokenAmount, setFromTokenAmount] = useState<string>('0')
  const [toTokenValue, setToTokenValue] = useState<string>(CRYPTO_SELECT_ITEMS[2].value)
  const [toTokenAmount, setToTokenAmount] = useState<string>('0')
  const [price, setPrice] = useState<string>('0');
  const [percentage, setPercentage] = useState<number>(5)

  const handleFromTokenValue = (e: ChangeEvent<HTMLInputElement>) => {
    setFromTokenValue(e.target.value)
  }

  const handleToTokenValue = (e: ChangeEvent<HTMLInputElement>) => {
    setToTokenValue(e.target.value)
  }

  const handleFromTokenAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.match(REGEX_NUMBER_VALID)) {
      setFromTokenAmount(value);
    }
  }

  const handleToTokenAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.match(REGEX_NUMBER_VALID)) {
      setToTokenAmount(value);
    }
  }

  const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.match(REGEX_NUMBER_VALID)) {
      setPrice(value);
    }
  }

  const handlePercentage = (newPercentage: number) => {
    if (newPercentage >= 0) {
      setPercentage(newPercentage)
    }
  }

  return (
    <Box mt={4}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography component="h1" color="white" fontSize={18}>Limit Order</Typography>
        <ButtonGroup>
          <Button variant={mode === 'buy' ? 'contained' : 'outlined'} onClick={() => setMode('buy')}>Buy</Button>
          <Button variant={mode === 'sell' ? 'contained' : 'outlined'} onClick={() => setMode('sell')}>Sell</Button>
        </ButtonGroup>
      </Stack>

      <Panel sx={{ border: `1px solid ${theme.palette.primary.main}` }} borderRadius={4} mt={2}>
        <Stack py={4} px={2} spacing={2}>
          <TextFieldForCryptoSelect
            select
            onChange={handleFromTokenValue}
            value={fromTokenValue}
          >
            {CRYPTO_SELECT_ITEMS.map(cryptoItem => (
              <MenuItem
                key={cryptoItem.id}
                sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                value={cryptoItem.value}
                disabled={cryptoItem.value === toTokenValue}
              >
                <Box component="img" src={cryptoItem.imgSrc} width={30} alt={cryptoItem.label} />
                <Typography component="span" fontSize={18} textTransform="uppercase">{cryptoItem.label}</Typography>
              </MenuItem>
            ))}
          </TextFieldForCryptoSelect>

          <TextFieldForCryptoAmount
            InputProps={{
              startAdornment: <LockOpen sx={{ fontSize: 24 }} />
            }}
            value={fromTokenAmount}
            onChange={handleFromTokenAmount}
          />
        </Stack>
      </Panel>

      <Box height={6} position="relative">
        <Stack direction="row" justifyContent="center" position="absolute" width="100%" bottom="-320%">
          <Box component="img" src="/assets/images/cross.png" alt="swap" />
        </Stack>
      </Box>

      <Panel sx={{ border: `1px solid ${theme.palette.primary.main}` }} borderRadius={4}>
        <Stack direction="row" alignItems="center" spacing={1} py={4} px={2}>
          <TextFieldForCryptoAmount
            label="Price"
            value={price}
            onChange={handlePrice}
          />

          <Stack spacing={1}>
            <Button
              variant="outlined"
              sx={{ fontSize: 24, p: 0, lineHeight: 1.1 }}
              onClick={() => handlePercentage(percentage + 1)}
            >+</Button>
            <Box bgcolor="#342F31" p={1} borderRadius={1}>
              <Typography textAlign="center" color="white">{percentage}%</Typography>
            </Box>
            <Button
              variant="outlined"
              sx={{ fontSize: 24, p: 0, lineHeight: 1.1 }}
              onClick={() => handlePercentage(percentage - 1)}
            >-</Button>
          </Stack>

          <InfoOutlined sx={{ fontSize: 20, color: grey[800] }} />
        </Stack>
      </Panel>

      <Box height={6} position="relative">
        <Stack direction="row" justifyContent="center" position="absolute" width="100%" bottom="-320%">
          <Box component="img" src="/assets/images/arrow-down.png" alt="swap" />
        </Stack>
      </Box>

      <Panel sx={{ border: `1px solid ${theme.palette.primary.main}` }} borderRadius={4}>
        <Stack py={4} px={2} spacing={2}>
          <TextFieldForCryptoSelect
            select
            onChange={handleToTokenValue}
            value={toTokenValue}
          >
            {CRYPTO_SELECT_ITEMS.map(cryptoItem => (
              <MenuItem
                key={cryptoItem.id}
                sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                value={cryptoItem.value}
                disabled={cryptoItem.value === fromTokenValue}
              >
                <Box component="img" src={cryptoItem.imgSrc} width={30} alt={cryptoItem.label} />
                <Typography component="span" fontSize={18} textTransform="uppercase">{cryptoItem.label}</Typography>
              </MenuItem>
            ))}
          </TextFieldForCryptoSelect>

          <TextFieldForCryptoAmount
            InputProps={{
              startAdornment: <LockOpen sx={{ fontSize: 24 }} />
            }}
            value={toTokenAmount}
            onChange={handleToTokenAmount}
          />
        </Stack>
      </Panel>
      <Typography fontSize={18} color="white" sx={{ mt: 2 }}>Wallet Needs to be connected</Typography>
    </Box>
  )
}