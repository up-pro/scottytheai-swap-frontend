import React, { useState, useMemo, ChangeEvent } from 'react';
import { Box, Button, MenuItem, Stack, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Panel, TextFieldForCryptoSelect } from "../../components/styledComponents";
import { TextFieldForCryptoAmount } from "../../components/styledComponents";
import { CRYPTO_SELECT_ITEMS, REGEX_NUMBER_VALID } from "../../utils/constants";
import { ICryptoSelectItem } from '../../utils/interfaces';

export default function MBSwap() {
  const theme = useTheme()

  const [fromTokenValue, setFromTokenValue] = useState<string>(CRYPTO_SELECT_ITEMS[0].value)
  const [fromTokenAmount, setFromTokenAmount] = useState<string>('0')
  const [toTokenValue, setToTokenValue] = useState<string>(CRYPTO_SELECT_ITEMS[2].value)
  const [toTokenAmount, setToTokenAmount] = useState<string>('0')
  const [ratioOfFromToTo, setRatioOfFromToto] = useState<number>(1.4);

  const fromToken = useMemo<ICryptoSelectItem | undefined>(() => {
    return CRYPTO_SELECT_ITEMS.find(cryptoItem => cryptoItem.value === fromTokenValue)
  }, [fromTokenValue])

  const toToken = useMemo<ICryptoSelectItem | undefined>(() => {
    return CRYPTO_SELECT_ITEMS.find(cryptoItem => cryptoItem.value === toTokenValue)
  }, [toTokenValue])


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
      setToTokenAmount((Number(value) * ratioOfFromToTo).toFixed(5));
    }
  }

  const handleToTokenAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.match(REGEX_NUMBER_VALID)) {
      setToTokenAmount(value);
      setFromTokenAmount((Number(value) / ratioOfFromToTo).toFixed(5))
    }
  }

  return (
    <Box my={2}>
      <Stack direction="row" justifyContent="end" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Box component="img" src="/assets/images/petrol.svg" width={24} />
          <Typography component="span" color={grey[700]}>14.3</Typography>
        </Stack>

        <Box borderRadius={1} border={`1px solid ${theme.palette.primary.main}`} px={1.5} py={1}>
          <Box component="img" src="/assets/images/vertical-road.svg" width={14} />
        </Box>
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
            value={fromTokenAmount}
            onChange={handleFromTokenAmount}
          />
        </Stack>
      </Panel>
      <Box height={6} position="relative">
        <Stack direction="row" justifyContent="center" position="absolute" width="100%" bottom="-320%">
          <Box component="img" src="/assets/images/swap-mb.png" alt="swap" />
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
            value={toTokenAmount}
            onChange={handleToTokenAmount}
          />
        </Stack>
      </Panel>

      <Box
        borderRadius={4}
        border={`1px solid ${theme.palette.primary.main}`}
        mt={4}
        px={2}
        pb={3}
        sx={{ background: 'linear-gradient(81.45deg, rgba(253, 124, 30, 0.13) 0.73%, rgba(32, 32, 32, 0) 96.54%)' }}
      >
        <Stack direction="row" justifyContent="center">
          <Box
            borderTop={`10px solid ${theme.palette.primary.main}`}
            borderLeft="10px solid transparent"
            borderRight="10px solid transparent"
            width={140}
          />
        </Stack>

        <Typography textAlign="center" fontSize={16} color="white" lineHeight={2} sx={{ mt: 4 }}>
          Note: You will be able to adjust your gas fees after clicking "Swap".
          If volatility is high, you must increase your slippage significantly.
        </Typography>

        <Button
          variant="contained"
          sx={{ borderRadius: 9999, fontSize: 20, px: 4, width: '100%', mt: 2 }}
        >Connect Wallet</Button>
      </Box>
    </Box>
  )
} 