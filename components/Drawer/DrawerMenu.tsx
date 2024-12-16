import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import ContactList from '@/components/Contact/ContactList';


import {
    DrawerHeader,
    drawerWidth
} from './Drawer';
import { Search } from '@mui/icons-material';
import SearchBar from '../SearchBar/SearchBar';
import { appBarHeight } from './DrawerHead';
import CreateIcon from '@mui/icons-material/Create';

export default function DrawerMenu({
    open, 
    handleDrawerClose, 
    handleCreateContact, 
    theme,
    contacts
}) {
    return (
        <>
            <Drawer
                sx={{
                    width: drawerWidth,
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

                <ContactList contacts={contacts}/>

            </Drawer>

        </>
    )
}