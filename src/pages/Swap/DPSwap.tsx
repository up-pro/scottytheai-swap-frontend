import React, { ChangeEvent, useMemo, useState } from "react";
import { Box, Button, MenuItem, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Panel, TextFieldForCryptoAmount, TextFieldForCryptoSelect } from "../../components/styledComponents";
import { CRYPTO_SELECT_ITEMS, REGEX_NUMBER_VALID } from "../../utils/constants";
import { ICryptoSelectItem } from "../../utils/interfaces";

// ----------------------------------------------------------------------------------------------------

export default function DPSwap() {
  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'))

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
    <Box position="relative">
      <Panel pt={2} pb={isTablet ? 8 : 16} mb={24} px={4} borderRadius="0px 10px 10px 10px">
        <Stack direction="row" justifyContent="end" alignItems="center" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Box component="img" src="/assets/images/petrol.svg" width={24} />
            <Typography component="span" color={grey[700]}>14.3</Typography>
          </Stack>

          <Box borderRadius={1.5} border={`1px solid ${theme.palette.primary.main}`} px={1.5} py={1}>
            <Box component="img" src="/assets/images/vertical-road.svg" width={14} />
          </Box>
        </Stack>

        <Stack direction="row" spacing={4} mt={4}>
          <Stack flex={1} spacing={2}>
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
          <Box component="img" src="/assets/images/swap.png" />
          <Stack flex={1} spacing={2}>
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
        </Stack>
      </Panel>

      {isTablet ? (
        <Stack
          justifyContent="center"
          bgcolor={theme.palette.background.default}
          borderRadius={4}
          mt={4}
        >
          <Box
            borderRadius={4}
            border={`1px solid ${theme.palette.primary.main}`}
            px={8}
            pb={4}
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

            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} mt={4}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography component="span" textTransform="uppercase" color="white">{fromToken?.label}</Typography>
                <Box component="img" src={fromToken?.imgSrc} alt={fromToken?.label} />
              </Stack>

              <Box component="img" src="/assets/images/arrows-to-right.png" alt="arrows-to-right" />

              <Stack direction="row" alignItems="center" spacing={2}>
                <Box component="img" src={toToken?.imgSrc} alt={toToken?.label} />
                <Typography component="span" textTransform="uppercase" color="white">{toToken?.label}</Typography>
              </Stack>
            </Stack>

            <Typography fontSize={14} textAlign="justify" color="white" lineHeight={2}>
              Note: You will be able to adjust your gas fees after clicking "Swap".
              If volatility is high, you must increase your slippage significantly.
            </Typography>

            <Stack direction="row" justifyContent="center" width="100%" mt={4}>
              <Button
                variant="contained"
                sx={{ borderRadius: 9999, border: '2px solid black', fontSize: 20, px: 4 }}
              >Connect Wallet</Button>
            </Stack>
          </Box>
        </Stack>
      ) : (
        <Stack
          position="absolute"
          width="100%"
          direction="row"
          justifyContent="center"
          bottom="-40%"
        >
          <Stack
            position="relative"
            width="60%"
            justifyContent="center"
            bgcolor={theme.palette.background.default}
            borderRadius={4}
          >
            <Box
              borderRadius={4}
              border={`1px solid ${theme.palette.primary.main}`}
              px={8}
              pb={8}
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

              <Stack direction="row" alignItems="center" spacing={2} mt={4}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography component="span" textTransform="uppercase" color="white">{fromToken?.label}</Typography>
                  <Box component="img" src={fromToken?.imgSrc} alt={fromToken?.label} />
                </Stack>

                <Box component="img" src="/assets/images/arrows-to-right.png" alt="arrows-to-right" />

                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box component="img" src={toToken?.imgSrc} alt={toToken?.label} />
                  <Typography component="span" textTransform="uppercase" color="white">{toToken?.label}</Typography>
                </Stack>
              </Stack>

              <Typography fontSize={14} textAlign="justify" color="white" lineHeight={2}>
                Note: You will be able to adjust your gas fees after clicking "Swap".
                If volatility is high, you must increase your slippage significantly.
              </Typography>
            </Box>

            <Stack direction="row" justifyContent="center" width="100%" position="absolute" bottom="-10%">
              <Button
                variant="contained"
                sx={{ borderRadius: 9999, border: '2px solid black', fontSize: 20, px: 4 }}
              >Connect Wallet</Button>
            </Stack>
          </Stack>
        </Stack>
      )
      }
    </Box>
  )
}