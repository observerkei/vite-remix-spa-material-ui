import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ProTip from './ProTip';
import Copyright from './Copyright';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {children}
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
