import React, { ChangeEvent, useState } from "react";
import { Box, Button, ButtonGroup, Grid, MenuItem, Stack, Typography } from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { grey } from "@mui/material/colors";
import { Panel, TextFieldForCryptoAmount, TextFieldForCryptoSelect } from "../../components/styledComponents";
import { CRYPTO_SELECT_ITEMS, REGEX_NUMBER_VALID } from "../../utils/constants";
import { TMode } from "../../utils/types";

// --------------------------------------------------------------------------------------------------------

export default function DPLimit() {
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
    <Panel py={4} px={5} borderRadius="0px 10px 10px 10px">
      <Stack direction="row" justifyContent="space-between">
        <Typography component="h1" color="white">Limit Order</Typography>
        <ButtonGroup>
          <Button variant={mode === 'buy' ? 'contained' : 'outlined'} onClick={() => setMode('buy')}>Buy</Button>
          <Button variant={mode === 'sell' ? 'contained' : 'outlined'} onClick={() => setMode('sell')}>Sell</Button>
        </ButtonGroup>
      </Stack>

      <Grid container spacing={4} mt={2}>
        <Grid item md={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Stack flex={1} spacing={1}>
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
                startAdornment: <LockOpenIcon sx={{ fontSize: 24 }} />
              }}
              value={fromTokenAmount}
              onChange={handleFromTokenAmount}
            />
          </Stack>

          <Typography color="white">Wallet Needs to be connected</Typography>
        </Grid>

        <Grid item md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
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

            <InfoOutlinedIcon sx={{ fontSize: 20, color: grey[800] }} />
          </Stack>

          <Box component="img" src="/assets/images/swap.png" alt="swap" width="25%" />
        </Grid>

        <Grid item md={4}>
          <Stack flex={1} spacing={1}>
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
                startAdornment: <LockOpenIcon sx={{ fontSize: 24 }} />
              }}
              value={toTokenAmount}
              onChange={handleToTokenAmount}
            />
          </Stack>
        </Grid>
      </Grid>
    </Panel>
  )
}