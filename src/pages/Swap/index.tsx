import { lazy, useEffect, useState } from 'react'
import { useMediaQuery, useTheme } from "@mui/material"
import { getAddress } from 'viem'
import { thegraphAPI } from '../../utils/apis'
import { LOGO_BASE_URL } from '../../utils/constants'
import { IToToken, IToken } from '../../utils/interfaces'

// ----------------------------------------------------------------------------

const DPSwap = lazy(() => import('./DPSwap'))
const MBSwap = lazy(() => import('./MBSwap'))
const SelectTokenDialog = lazy(() => import('./SelectTokenDialog'))

// ----------------------------------------------------------------------------

export default function Swap() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [fromTokens, setFromTokens] = useState<Array<IToken>>([])
  const [toTokens, setToTokens] = useState<Array<IToToken>>([])
  const [fromToken, setFromToken] = useState<IToken | null>(null)
  const [toToken, setToToken] = useState<IToken | null>(null)
  const [dialogOpened, setDialogOpened] = useState<boolean>(false)
  const [tokensOfDialog, setTokensOfDialog] = useState<Array<IToken> | Array<IToToken>>([])
  const [isSelectFromToken, setIsSelectFromToken] = useState<boolean>(true)
  const [ratio, setRatio] = useState<number>(0)

  //  ----------------------------------------------------------------------------

  const openSelectTokenDialog = (_isSelectFromToken: boolean) => {
    setIsSelectFromToken(_isSelectFromToken)
    if (_isSelectFromToken) {
      setTokensOfDialog(fromTokens)
    } else {
      setTokensOfDialog(toTokens)
    }
    setDialogOpened(true)
  }

  const closeSelectTokenDialog = () => {
    setTokensOfDialog([])
    setDialogOpened(false)
  }

  //  ----------------------------------------------------------------------------

  //  Get fromTokens
  useEffect(() => {
    thegraphAPI.post('', JSON.stringify({
      query: `{
        tokens(first: 100, orderBy: txCount, orderDirection: desc) {
          id
          name
          symbol
          decimals
        }
      }`
    }))
      .then(res => {
        const { data: { tokens } } = res.data
        if (tokens instanceof Array) {
          for (let i = 0; i < tokens.length; i += 1) {
            tokens[i].logo = `${LOGO_BASE_URL}/${getAddress(tokens[i].id)}/logo.png`
          }
          setFromTokens(tokens)
        }
      })
      .catch(error => {
        console.log('>>>>>>>>>> error => ', error)
      })
  }, [])

  //  Get toTokens
  useEffect(() => {
    if (fromToken) {
      setToToken(null)
      thegraphAPI.post('', JSON.stringify({
        query: `{
          pools(
            where: {token0: "${fromToken.id}"}
            orderBy: txCount
            orderDirection: desc
          ) {
            token1 {
              id
              name
              symbol
              decimals
            }
            token1Price
          }
        }`
      }))
        .then(res => {
          const { data: { pools } } = res.data
          const tokens: Array<IToToken> = [];
          if (pools instanceof Array) {
            for (let i = 0; i < pools.length; i += 1) {
              const { token1, token1Price } = pools[i]
              token1.logo = `${LOGO_BASE_URL}/${getAddress(token1.id)}/logo.png`
              tokens.push({ ...token1, token1Price })
            }
            setToTokens(tokens)
          }
        })
        .catch(error => {
          console.log('>>>>>>>>>> error => ', error)
        })
    }
  }, [fromToken])
  //  ----------------------------------------------------------------------------

  return (
    <>
      {isMobile ? <MBSwap
        openSelectTokenDialog={openSelectTokenDialog}
      /> : <DPSwap
        fromToken={fromToken}
        toToken={toToken}
        openSelectTokenDialog={openSelectTokenDialog}
        ratio={ratio}
      />}
      {isSelectFromToken ? (
        <SelectTokenDialog
          tokens={tokensOfDialog}
          dialogOpened={dialogOpened}
          selectToken={setFromToken}
          selectedToken={fromToken}
          closeDialog={closeSelectTokenDialog}
        />
      ) : (
        <SelectTokenDialog
          tokens={tokensOfDialog}
          dialogOpened={dialogOpened}
          selectToken={setToToken}
          selectedToken={toToken}
          fromToken={fromToken}
          closeDialog={closeSelectTokenDialog}
          setRatio={setRatio}
        />
      )}
    </>
  )
}