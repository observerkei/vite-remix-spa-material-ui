import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import ContactList from '@/components/Contact/ContactList';
import Box from '@mui/material/Box';


import {
    DrawerHeader,
    drawerWidth
} from './Drawer';
import SearchBar from '../SearchBar/SearchBar';
import CreateIcon from '@mui/icons-material/Create';
import DrawerBottom from './DrawerBottom';
import TestList from '@/components/Contact/TestList';

export default function DrawerMenu({
    open,
    handleDrawerClose,
    handleCreateContact,
    theme,
    contacts,
}) {
    return (
        <>
            <Drawer
                sx={{
                    width: drawerWidth,
                    height: '100%',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <SearchBar />
                    <IconButton onClick={handleCreateContact}>
                        <CreateIcon />
                    </IconButton>

                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>

                <Divider />

                <ContactList contacts={contacts} />

                <DrawerBottom handleAddContact={handleCreateContact} />

            </Drawer>

        </>
    )
}