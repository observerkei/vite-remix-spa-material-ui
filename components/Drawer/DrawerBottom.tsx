import { Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { Height, Margin } from "@mui/icons-material";
import {
    Form,
} from "@remix-run/react";
import { mobileMaxWidth } from "./Drawer";
import { useMediaQuery } from 'react-responsive';

export const appBottomHeight = 64;

export default function DrawerBottom({ handleDrawerClose }: { handleDrawerClose: any }) {
    const isMobile = useMediaQuery({ maxWidth: mobileMaxWidth });

    const closeDrawer = () => {
        if (isMobile) {
            handleDrawerClose();
        }
    }

    return (
        <>
            <Box
                sx={{
                    flex: "0 0 auto",
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingRight: '10px',
                    paddingLeft: '10px',
                }}
            >
                <Form method="post" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexGrow: 1,
                }}>
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        type="submit"
                        sx={{
                            flexGrow: 1,
                        }}
                        onClick={closeDrawer}
                    >
                        ADD
                    </Button>

                </Form>
            </Box>

        </>
    )
}