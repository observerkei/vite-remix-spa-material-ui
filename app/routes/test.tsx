import * as React from 'react';
import Drawer from '@/components/Drawer/Drawer';
import Button from '@mui/material/Button';
import { Link } from '@remix-run/react';
import { useColorScheme, createTheme, ThemeProvider } from '@mui/material/styles';

export default function Test() {
    const theme = createTheme({
        colorSchemes: {
          dark: true,
        },
      });


    return (
        <>

            <Drawer />
            
            <br/>

            <Button variant="contained" component={Link} to="/">
                Go to the main page
            </Button>

        </>
    );
}
