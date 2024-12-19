import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import ContactList from '@/components/Contact/ContactList';
import Box from '@mui/material/Box';


import {
    desktopMinWidth,
    DrawerHeader,
    drawerWidth,
    drawerWidthREM,
    mobileMaxWidth,
} from './Drawer';

import SearchBar from '../SearchBar/SearchBar';
import CreateIcon from '@mui/icons-material/Create';
import DrawerBottom from './DrawerBottom';
import TestList from '@/components/Contact/TestList';
import { useState } from 'react';
import { useNavigate } from '@remix-run/react';
import { useMediaQuery } from 'react-responsive';
import { console_dbg } from '@/app/api/util';


export default function DrawerMenu({
    open,
    setOpen,
    handleDrawerClose,
    handleCreateContact,
    theme,
    contacts,
}) {
    const [focusContactId, setFocusContactId] = useState("");
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ maxWidth: mobileMaxWidth });

    console_dbg(`open`);
    console_dbg(open);

    return (
        <>
            <Drawer
                sx={{
                    width: `${drawerWidth}px`,
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
                    <IconButton onClick={() => {
                        if (focusContactId.length !== 0) {
                            if (isMobile) {
                                setOpen(false);
                            }
                            navigate(`/c/${focusContactId}/edit`);
                        } 
                    }}>
                        <CreateIcon />
                    </IconButton>

                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>

                <Divider />

                <ContactList 
                    contacts={contacts} 
                    focusContactId={focusContactId} 
                    setFocusContactId={setFocusContactId}
                    setOpen={(open) => setOpen(open)}
                />

                <DrawerBottom handleAddContact={handleCreateContact} />

            </Drawer>

        </>
    )
}