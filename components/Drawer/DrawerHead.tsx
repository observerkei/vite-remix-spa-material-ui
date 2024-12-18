import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { drawerWidth, mobileMaxWidth } from './Drawer';
import ToggleColorMode from '@/components/ToggleColorMode/ToggleColorMode';
import { Box } from '@mui/material';
import { useMediaQuery } from "react-responsive";


interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

export const appBarHeight = 70;
export const appBarHeightREM = 3;

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


export default function DrawerHead({ handleDrawerOpen, open }) {

    const isMobile = useMediaQuery({ maxWidth: mobileMaxWidth });

    return (
        <>
            <AppBar position="fixed" open={open} sx={{
                height: `${appBarHeight}px`,
                justifyContent: 'center',
            }}>
                <Toolbar style={isMobile && open
                    ? {
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginLeft: `-${drawerWidth}px`,
                    }
                    : {
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center', 
                    }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={[
                                {
                                    mr: 2,
                                },
                                open && { display: 'none' },
                            ]}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Persistent drawer
                        </Typography>
                    </Box>


                    <ToggleColorMode />

                </Toolbar>
            </AppBar>
        </>
    )
}