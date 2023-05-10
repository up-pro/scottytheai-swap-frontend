"use client"
import React, { createElement } from 'react';
import { Container, Button, Box, useTheme } from '@mui/material'
import { SOCIAL_LINKS } from '@/utils/constants'
import Link from 'next/link';
import { grey } from '@mui/material/colors'

// ----------------------------------------------------------------------------------------

export default function Footer() {
  const theme = useTheme()
  return (
    <Box sx={{ py: 2, bgcolor: theme.palette.background.paper }}>
      <Container maxWidth="md" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {SOCIAL_LINKS.map(linkItem => (
          <Button
            variant="text"
            startIcon={createElement(linkItem.icon)}
            component={Link}
            href={linkItem.url}
            target="_blank"
            sx={{ color: grey[600] }}
          >{linkItem.label}</Button>
        ))}
        <Button variant="text" sx={{ color: grey[600] }}>Disclaimer</Button>
        <Button variant="text" sx={{ color: grey[600] }}>Report a Bug</Button>
      </Container>
    </Box>
  )
}
