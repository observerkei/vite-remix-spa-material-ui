import { Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { Height, Margin } from "@mui/icons-material";
import {
    Form,
} from "@remix-run/react";
import { mobileMaxWidth } from "./Drawer";
import { useMediaQuery } from 'react-responsive';
import { CustomWidthTooltip } from "../Contact/ContactList";
import ImportButtom from './ImportButton';
import ExportButtom from './ExportButton';


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
                    padding: '10px',
                }}
            >
                <Form method="post" style={{
                    display: 'flex',
                    alignItems: 'stretch',
                    width: '100%',
                    justifyContent: 'center',
                    flexGrow: 1,
                }}>
                    <CustomWidthTooltip title={"Add Favorite"} placement={'top'} arrow>
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            type="submit"
                            sx={{
                                flexGrow: 1,
                                borderRadius: 28,
                            }}
                            fullWidth={true}
                            onClick={closeDrawer}
                        >
                            ADD
                        </Button>
                    </CustomWidthTooltip>
                    <ImportButtom />
                    <ExportButtom />

                </Form>
            </Box>

        </>
    )
}