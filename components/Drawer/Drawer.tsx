import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import DrawerMenu from './DrawerMenu';
import DrawerHead from './DrawerHead';
import { appBarHeight } from './DrawerHead';
import { 
  createEmptyContact,
  ContactRecord,
} from '@/app/api/data';

import { useColorScheme, createTheme, ThemeProvider } from '@mui/material/styles';

export const windowsMargin = 10;
export const drawerWidth = 300;
export const drawerWidthREM = 10;
export const mobileMaxWidth = 600;


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
        [`@media (max-width: ${mobileMaxWidth}px)`]: {
          marginLeft: `-${drawerWidth}px`,
        },
      },
    },
  ],
}));


export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


export default function PersistentDrawerLeft({
  contacts,
  children
}: { contacts: Array<ContactRecord>, children: React.ReactNode }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleCreateContact = () => {
    const create = createEmptyContact();
    create.then((createContact) => {
      contacts.push(createContact);
    })
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <DrawerHead handleDrawerOpen={handleDrawerOpen} open={open} />
      <DrawerMenu
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleCreateContact={handleCreateContact}
        theme={theme}
        contacts={contacts}
      />
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main >
    </Box >
  );
}
