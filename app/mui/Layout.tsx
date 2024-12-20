import * as React from 'react';
import Container from '@mui/material/Container';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        height: '100dvh',
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      {children}
    </Container>
  );
}
