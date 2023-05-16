import { Box, TextField, styled } from "@mui/material";
import { grey } from "@mui/material/colors";

export const Panel = styled(Box)`
  border: 1px solid transparent;
  background: linear-gradient(${grey[900]}, ${grey[900]}) padding-box, linear-gradient(to top, ${grey[800]}, ${grey[800]}) border-box;
`

export const MBPanel = styled(Box)(({ theme }) => ({
  border: '1px solid transparent',
  background: `linear-gradient(${grey[900]}, ${grey[900]}) padding-box, linear-gradient(to top, ${grey[800]}, ${grey[800]}) border-box`
}))

export const TextFieldForCryptoSelect = styled(TextField)({
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  '& label.Mui-focused': {
    color: 'black',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'none',
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    border: 'none',
    '&:hover fieldset': {
      borderColor: 'rgba(0, 0, 0, 0)',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
    '&.Mui-disabled fieldset': {
      border: 'none',
    },
  },
  '& .MuiFormHelperText-root': {
    margin: '10px 0px'
  },
  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 0, 0, 0)'
  },
  background: '#342F31',
  borderRadius: 6
})

export const TextFieldForCryptoAmount = styled(TextField)`
  background: #342F31;
  & .MuiOutlinedInput-input {
    direction: rtl;
  }
`