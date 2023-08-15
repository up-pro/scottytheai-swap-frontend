import { useState, useEffect, ChangeEvent } from 'react'
import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, TextField } from "@mui/material";
import { Close, Search } from "@mui/icons-material";
import { getAddress, isAddress } from 'viem';
import { useDebouncedValue } from '@mantine/hooks';
import { IToToken, IToken } from "../../utils/interfaces";
import { thegraphAPI } from '../../utils/apis';
import { LOGO_BASE_URL } from '../../utils/constants';

//  -------------------------------------------------------------------------------------------------

interface IProps {
  tokens: Array<IToken> | Array<IToToken>;
  dialogOpened: boolean;
  closeDialog: () => void;
  selectedToken: IToken | IToToken | null;
  selectToken: (token: IToken) => void;
  setRatio?: (ratio: number) => void;
  fromToken?: IToken | null;
}

//  -------------------------------------------------------------------------------------------------

export default function SelectTokenDialog({ dialogOpened, closeDialog, selectedToken, selectToken, tokens, setRatio, fromToken }: IProps) {
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [searchedTokens, setSearchedTokens] = useState<Array<IToken> | Array<IToToken>>([])

  const [debouncedSearchKeyword] = useDebouncedValue<string>(searchKeyword, 500)

  const handleSelectToken = (token: IToken | IToToken) => {
    if ('token1Price' in token) {
      setRatio?.(Number(token.token1Price))
      selectToken({
        id: token.id,
        name: token.name,
        symbol: token.symbol,
        logo: token.logo
      })
    } else {
      selectToken(token)
    }
  }

  const handleSearchKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value)
  }

  useEffect(() => {
    if (debouncedSearchKeyword) {
      let query = ``;

      if (setRatio) {
        if (isAddress(debouncedSearchKeyword)) {
          query = `{
            pools(
              where: {token0: "${fromToken?.id}", id: "${debouncedSearchKeyword.toLowerCase()}"}
              orderBy: txCount
              orderDirection: desc
            ) {
              token1 {
                id
                name
                symbol
              }
              token1Price
            }
          }`;
        } else {
          query = `{
            pools(
              where: {token0: "${fromToken?.id}", token1_: {name_contains_nocase: "${debouncedSearchKeyword}"}}
              orderBy: txCount
              orderDirection: desc
            ) {
              token1 {
                id
                name
                symbol
              }
              token1Price
            }
          }`
        }

        console.log('>>>>>>>>>>>> query => ', query)
        thegraphAPI.post('', JSON.stringify({ query }))
          .then(res => {
            const { data: { pools } } = res.data
            const tokens: Array<IToToken> = [];
            if (pools instanceof Array) {
              for (let i = 0; i < pools.length; i += 1) {
                const { token1, token1Price } = pools[i]
                token1.logo = `${LOGO_BASE_URL}/${getAddress(token1.id)}/logo.png`
                tokens.push({ ...token1, token1Price })
              }
              setSearchedTokens(tokens)
            }
          })
          .catch(error => {
            console.log('>>>>>>>>>> error => ', error)
          })
      } else {
        if (isAddress(debouncedSearchKeyword)) {
          query = `{
            tokens(
              first: 100, 
              orderBy: txCount, 
              orderDirection: desc,
              where: {
                id: "${debouncedSearchKeyword.toLowerCase()}",
              }
            ) {
              id
              name
              symbol
            }
          }`;
        } else {
          query = `{
            tokens(
              first: 100, 
              orderBy: txCount, 
              orderDirection: desc,
              where: {
                name_contains_nocase: "${debouncedSearchKeyword}",
              }
            ) {
              id
              name
              symbol
            }
          }`;
        }

        console.log('>>>>>>>>>>>> query => ', query)
        //  In case of toTokens
        thegraphAPI.post('', JSON.stringify({ query }))
          .then(res => {
            const { data: { tokens } } = res.data
            if (tokens instanceof Array) {
              for (let i = 0; i < tokens.length; i += 1) {
                tokens[i].logo = `${LOGO_BASE_URL}/${getAddress(tokens[i].id)}/logo.png`
              }
              setSearchedTokens(tokens)
            }
          })
          .catch(error => {
            console.log('>>>>>>>>>> error => ', error)
          })
      }
    } else {
      setSearchedTokens(tokens)
    }
  }, [tokens, debouncedSearchKeyword])

  return (
    <Dialog open={dialogOpened} onClose={() => closeDialog()} fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        Select a Token
        <IconButton onClick={() => closeDialog()}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogActions>
        <Stack p={1} width="100%" spacing={1}>
          <TextField
            name="search"
            placeholder="Search name or paste address"
            InputProps={{
              startAdornment: <Search />
            }}
            onChange={handleSearchKeyword}
            value={searchKeyword}
            size="small"
            fullWidth
          />
          {selectedToken ? (
            <ListItem>
              <ListItemAvatar>
                <Avatar src={selectedToken.logo} alt={selectedToken.symbol} />
              </ListItemAvatar>
              <ListItemText>
                {selectedToken.symbol} ({selectedToken.name})
              </ListItemText>
            </ListItem>
          ) : (
            <></>
          )}
        </Stack>
      </DialogActions>
      <DialogContent>
        <List>
          {searchedTokens.map((token, index) => (
            <ListItemButton key={index} onClick={() => handleSelectToken(token)}>
              <ListItemAvatar>
                <Avatar src={token.logo} alt={token.symbol} />
              </ListItemAvatar>
              <ListItemText>
                {token.symbol} ({token.name})
              </ListItemText>
            </ListItemButton>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  )
}