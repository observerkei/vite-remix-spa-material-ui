import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import ContactList, { CustomWidthTooltip } from '@/components/Contact/ContactList';

import SearchBar from '../SearchBar/SearchBar';
import CreateIcon from '@mui/icons-material/Create';
import DrawerBottom from './DrawerBottom';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { console_dbg } from '@/app/api/util';
import {
    ContactRecord,
    HOME_PAGE,
    OPEN_DRAWER,
    PageType,
    getLocalData,
    setLocalData,
} from '~/api/data';
import ToggleColorMode from '../ToggleColorMode/ToggleColorMode';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import { TextField } from '@mui/material';
import HomeSetting from './DrawerAppbarHomeSetting';

export const drawerWidth = 240;
export const mobileMaxWidth = 600;
export const appBarHeight = 56;
export const windowsMargin = 10;
export const desktopMinWidth = 1200;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme }) => ({
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'stretch',

    paddingBottom: theme.spacing(1),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    [`@media (max-width: ${mobileMaxWidth}px)`]: {
        marginLeft: 0,
    },
    variants: [
        {
            props: ({ open }) => open,
            style: {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
            },
        },
    ],
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                [`@media (min-width: ${mobileMaxWidth}px)`]: {
                    width: `calc(100% - ${drawerWidth}px)`,
                    marginLeft: `${drawerWidth}px`,
                    transition: theme.transitions.create(['margin', 'width'], {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                },
            },
        },
    ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    flex: "0 0 auto"
}));

type DrawerParams = {
    contacts: ContactRecord[];
    children: React.ReactElement;
    urlFocusContactId: string;
    pageType: PageType;
    navigate: any;
    Form: any;
    searchDefaultValue: string;
    submit: any;
};

export default function PersistentDrawerLeft({
    contacts,
    children,
    urlFocusContactId,
    pageType,
    navigate,
    Form,
    searchDefaultValue,
    submit,
}: DrawerParams) {
    const theme = useTheme();
    const isDesktop = useMediaQuery({ minWidth: desktopMinWidth });
    const localOpen = getLocalData(OPEN_DRAWER, false);
    const localHomePage = getLocalData(HOME_PAGE, "");
    const [open, setOpen] = React.useState(localOpen);
    const [hideHomeSetting, setHideHomeSetting] = React.useState(true);
    const [homePage, setHomePage] = React.useState(localHomePage);

    const handleOpenDrawer = (open: boolean) => {
        setOpen(open);
        setLocalData(OPEN_DRAWER, open);
    };

    const handleSetHomePage = (home: string) => {
        setHomePage(home);
        setLocalData(HOME_PAGE, home);
    };

    const handleDrawerOpen = () => {
        handleOpenDrawer(true)
    };

    const handleDrawerClose = () => {
        handleOpenDrawer(false)
    };

    const [focusContact, setFocusContact] = useState({} as ContactRecord);
    if (urlFocusContactId !== focusContact?.id) {
        console_dbg('update url f c : ', urlFocusContactId);
        const nowFocusContact: ContactRecord[]
            = contacts.filter((c) => c.id == urlFocusContactId);
        if (nowFocusContact.length) {

            setFocusContact(nowFocusContact[0]);
            console_dbg("u f c id 2: ", JSON.stringify(nowFocusContact));

        }
    }

    const isMobile = useMediaQuery({ maxWidth: mobileMaxWidth });
    const focusContactDescriptURL = focusContact?.descriptionURI || "";
    const focusContactId = focusContact?.id || "";

    const appHeadText = focusContact?.name || "Favorite collection";

    return (
        <Box sx={{ display: 'flex', flexGrow: 1, }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {
                                mr: 2,
                            },
                            open && !isMobile && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <CustomWidthTooltip title={"Cover the window"} placement={'bottom'} arrow>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={() =>
                                window.location.href = focusContact.descriptionURI as string
                            }
                            sx={[
                                {
                                    mr: 2,
                                },
                                !(pageType === PageType.CONTACT_DESCRIPT && focusContactDescriptURL.length > 0) && { display: 'none' },
                            ]}
                        >
                            <AspectRatioIcon />
                        </IconButton>
                    </CustomWidthTooltip>

                    <HomeSetting 
                        pageType={pageType}
                        hideHomeSetting={hideHomeSetting} 
                        setHideHomeSetting={setHideHomeSetting}
                        homePage={homePage}
                        setHomePage={handleSetHomePage}
                    />

                    <Box sx={[
                        {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        },
                        hideHomeSetting && {
                            width: '100%',
                        }
                    ]}>
                        <Typography variant="h6" noWrap component="div" >
                            {hideHomeSetting && appHeadText}
                        </Typography>

                        <ToggleColorMode />
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    display: 'flex',
                    flexDirection: 'column',
                }}
                variant={isMobile ? "temporary" : "persistent"}
                anchor="left"
                onClose={handleDrawerClose}
                open={open}
            >
                <DrawerHeader>
                    <SearchBar
                        Form={Form}
                        searchDefaultValue={searchDefaultValue}
                        submit={submit}
                    />
                    <IconButton onClick={() => {
                        if (focusContact?.id && focusContact.id.length !== 0) {
                            if (isMobile) {
                                handleDrawerClose();
                            }

                            navigate(`/c/${focusContact.id}/edit`);
                        }
                    }}
                        sx={[
                            !(focusContactId.length > 0) && { display: 'none' },
                        ]}
                    >
                        <CreateIcon />
                    </IconButton>

                    <CustomWidthTooltip title={'Close Sidebar'} placement={'bottom'} arrow>


                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </CustomWidthTooltip>

                </DrawerHeader>
                <Divider />

                <ContactList
                    contacts={contacts}
                    focusContact={focusContact}
                    setFocusContact={setFocusContact}
                    handleDrawerClose={handleDrawerClose}
                />

                <DrawerBottom handleDrawerClose={handleDrawerClose} />

            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Box sx={{ flexGrow: '1' }} >
                    {children}
                </Box>

            </Main>
        </Box>
    );
}
