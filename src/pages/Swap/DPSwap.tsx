import { ChangeEvent, useMemo, useState } from "react";
import { Avatar, Box, Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useContractWrite, useDisconnect, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { parseUnits } from "viem";
import { toast } from "react-toastify";
import { Panel, TextFieldForCryptoAmount } from "../../components/styledComponents";
import { CHAIN_ID, ERC20_ABI, REGEX_NUMBER_VALID, V3_SWAP_ROUTER_ADDRESS } from "../../utils/constants";
import { IToken } from "../../utils/interfaces";

//  --------------------------------------------------------------------------------------------------------------------

interface IProps {
  openSelectTokenDialog: (_isSelectFromToken: boolean) => void;
  fromToken: IToken | null;
  toToken: IToken | null;
  ratio: number;
}

//  --------------------------------------------------------------------------------------------------------------------

export default function DPSwap({ openSelectTokenDialog, fromToken, toToken, ratio }: IProps) {
  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'))
  const { open } = useWeb3Modal()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  //  --------------------------------------------------------------------------------

  const [fromTokenAmount, setFromTokenAmount] = useState<string>('0')
  const [toTokenAmount, setToTokenAmount] = useState<string>('0')

  //  --------------------------------------------------------------------------------

  //  Approve fromToken
  const { config: fromTokenApproveConfig } = usePrepareContractWrite({
    address: fromToken?.id,
    abi: ERC20_ABI,
    functionName: 'approve',
    args: [V3_SWAP_ROUTER_ADDRESS, parseUnits(fromTokenAmount, Number(fromToken?.decimals))]
  })
  const { write: approveFromToken, data: fromTokenApproveData } = useContractWrite(fromTokenApproveConfig)
  const { isSuccess: fromTokenApproved } = useWaitForTransaction({
    hash: fromTokenApproveData?.hash
  })

  //  Approve toToken
  const { config: toTokenApproveConfig } = usePrepareContractWrite({
    address: toToken?.id,
    abi: ERC20_ABI,
    functionName: 'approve',
    args: [V3_SWAP_ROUTER_ADDRESS, parseUnits(toTokenAmount, Number(toToken?.decimals))]
  })
  const { write: approveToToken, data: toTokenApproveData } = useContractWrite(toTokenApproveConfig)
  const { isSuccess: toTokenApproved } = useWaitForTransaction({
    hash: toTokenApproveData?.hash
  })

  //  --------------------------------------------------------------------------------

  //  Set the amount of fromToken
  const handleFromTokenAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.match(REGEX_NUMBER_VALID)) {
      setFromTokenAmount(value);
      setToTokenAmount(`${Number(value) * ratio}`)
    }
  }

  //  Set the amount of toToken
  const handleToTokenAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.match(REGEX_NUMBER_VALID)) {
      setToTokenAmount(value);
      if (ratio > 0) {
        setFromTokenAmount(`${Number(value) / ratio}`)
      } else {
        setFromTokenAmount('0')
      }
    }
  }

  //  Connect wallet
  const handleConnectWallet = () => {
    open?.()
  }

  //  Swap
  const handleSwap = async () => {
    if (fromToken && toToken) {

    } else {
      toast.warn('Please select both tokens.')
    }
  }

  //  --------------------------------------------------------------------------------

  const fromTokenAmountToView = useMemo<string>(() => {
    if (fromTokenAmount[0] === '0') {
      if (fromTokenAmount[1] !== '.')
        return `${Number(fromTokenAmount)}`
    }
    return fromTokenAmount
  }, [fromTokenAmount])

  const toTokenAmountToView = useMemo<string>(() => {
    if (toTokenAmount[0] === '0') {
      if (toTokenAmount[1] !== '.')
        return `${Number(toTokenAmount)}`
    }
    return toTokenAmount
  }, [toTokenAmount])

  //  --------------------------------------------------------------------------------

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

        <Stack direction="row" spacing={4} mt={4} alignItems="center">
          <Stack flex={1} spacing={2}>
            {fromToken ? (
              <Button
                startIcon={<Avatar src={fromToken.logo} alt={fromToken.symbol} />}
                variant="contained"
                sx={{ bgcolor: grey[800] }}
                onClick={() => openSelectTokenDialog(true)}
              >
                {fromToken.symbol}
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ bgcolor: grey[800] }}
                onClick={() => openSelectTokenDialog(true)}
              >
                Select a Token
              </Button>
            )}

            <TextFieldForCryptoAmount
              value={fromTokenAmountToView}
              onChange={handleFromTokenAmount}
            />
          </Stack>
          <Box component="img" src="/assets/images/swap.png" />
          <Stack flex={1} spacing={2}>
            {toToken ? (
              <Button
                startIcon={<Avatar src={toToken.logo} alt={toToken.symbol} />}
                variant="contained"
                sx={{ bgcolor: grey[800] }}
                onClick={() => openSelectTokenDialog(false)}
              >
                {toToken.symbol}
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ bgcolor: grey[800] }}
                disabled={!fromToken}
                onClick={() => openSelectTokenDialog(false)}
              >
                Select a Token
              </Button>
            )}

            <TextFieldForCryptoAmount
              value={toTokenAmountToView}
              onChange={handleToTokenAmount}
              disabled={!fromToken}
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
                {fromToken ? (
                  <>
                    <Typography component="span" textTransform="uppercase" color="white">{fromToken.symbol}</Typography>
                    <Avatar src={fromToken.logo} alt={fromToken.symbol} />
                  </>
                ) : (
                  <></>
                )}
              </Stack>

              <Box component="img" src="/assets/images/arrows-to-right.png" alt="arrows-to-right" />

              <Stack direction="row" alignItems="center" spacing={2}>
                {toToken ? (
                  <>
                    <Avatar src={toToken.logo} alt={toToken.symbol} />
                    <Typography component="span" textTransform="uppercase" color="white">{toToken.symbol}</Typography>
                  </>
                ) : (
                  <></>
                )}
              </Stack>
            </Stack>

            <Typography fontSize={14} textAlign="justify" color="white" lineHeight={2}>
              Note: You will be able to adjust your gas fees after clicking "Swap".
              If volatility is high, you must increase your slippage significantly.
            </Typography>

            <Stack direction="row" justifyContent="center" width="100%" mt={4}>
              {isConnected ? (
                <Button
                  variant="contained"
                  sx={{ borderRadius: 9999, border: '2px solid black', fontSize: 20, px: 4 }}
                  onClick={() => disconnect()}
                >Disconnect</Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{ borderRadius: 9999, border: '2px solid black', fontSize: 20, px: 4 }}
                  onClick={() => handleConnectWallet()}
                >
                  {isTablet ? 'Connect' : 'Connect Wallet'}
                </Button>
              )}
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
                  {fromToken ? (<>
                    <Typography component="span" textTransform="uppercase" color="white">{fromToken.symbol}</Typography>
                    <Avatar src={fromToken.logo} alt={fromToken.symbol} />
                  </>) : (
                    <></>
                  )}
                </Stack>

                <Stack direction="row" justifyContent="center" flexGrow={1}>
                  <Box component="img" src="/assets/images/arrows-to-right.png" alt="arrows-to-right" />
                </Stack>

                <Stack direction="row" alignItems="center" spacing={2}>
                  {toToken ? (
                    <>
                      <Avatar src={toToken.logo} alt={toToken.symbol} />
                      <Typography component="span" textTransform="uppercase" color="white">{toToken.symbol}</Typography>
                    </>
                  ) : (
                    <></>
                  )}
                </Stack>
              </Stack>

              <Typography fontSize={14} textAlign="justify" color="white" lineHeight={2}>
                Note: You will be able to adjust your gas fees after clicking "Swap".
                If volatility is high, you must increase your slippage significantly.
              </Typography>
            </Box>

            <Stack direction="row" justifyContent="center" width="100%" position="absolute" bottom="-10%">
              {isConnected ? (
                <Button
                  variant="contained"
                  sx={{ borderRadius: 9999, border: '2px solid black', fontSize: 20, px: 4 }}
                  onClick={() => handleSwap()}
                >Swap</Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{ borderRadius: 9999, border: '2px solid black', fontSize: 20, px: 4 }}
                  onClick={() => handleConnectWallet()}
                >
                  {isTablet ? 'Connect' : 'Connect Wallet'}
                </Button>
              )}
            </Stack>
          </Stack>
        </Stack>
      )}
    </Box>
  )
}