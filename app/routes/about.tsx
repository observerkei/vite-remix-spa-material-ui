import * as React from 'react';
import { Link } from '@remix-run/react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ThemeSwitch from '@/components/ToggleColorMode/ToggleColorMode'
import { Box } from '@mui/material';

export default function About() {
  return (
    <React.Fragment>
      <Box sx={{
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        margin: 2 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Material UI Remix in TypeScript example
        </Typography>

        <br />
        <ThemeSwitch />
        <br />
        <br />

        <Button variant="contained" component={Link} to="/">
          Go to the main page
        </Button>
      </Box>
    </React.Fragment>
  );
}
