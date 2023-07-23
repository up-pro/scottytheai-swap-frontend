import { CircularProgress, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

// ---------------------------------------------------------------------------------------------

export default function Loading() {
  return (
    <Stack height="100vh" width="100vw" justifyContent="center" alignItems="center" bgcolor={grey[900]} spacing={1}>
      <CircularProgress sx={{ color: '#FD7C1E' }} />
      <Typography component="span" color={grey[100]}>Loading...</Typography>
    </Stack>
  )
}