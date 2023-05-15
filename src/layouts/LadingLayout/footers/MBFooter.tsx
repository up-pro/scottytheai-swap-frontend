import React, { createElement } from 'react';
import { Box, Button, Container, IconButton, Link, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SOCIAL_LINKS } from "../../../utils/constants";

export default function MBFooter() {
  return (
    <Box py={2} bgcolor={grey[900]}>
      <Container>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
          {SOCIAL_LINKS.map(linkItem => (
            <IconButton
              key={linkItem.id}
              component={Link}
              href={linkItem.url}
              target="_blank"
              sx={{ color: grey[600] }}
            >
              {createElement(linkItem.icon)}
            </IconButton>
          ))}
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Button variant="text" sx={{ color: grey[600] }}>Disclaimer</Button>
          <Button variant="text" sx={{ color: grey[600] }}>Report a Bug</Button>
        </Stack>
      </Container>
    </Box>
  )
}