import { Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { Height, Margin } from "@mui/icons-material";
import {
    Form,
} from "@remix-run/react";

export const appBottomHeight = 64;

export default function DrawerBottom({ handleDrawerClose }) {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'stretch',
                    margin: '10px',
                }}
            >
                <Form method="post" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    flexGrow: 1,
                }}>
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        type="submit"
                        sx={{
                            flexGrow: 1,
                        }}
                        onClick={() => handleDrawerClose()}
                    >
                        ADD
                    </Button>

                </Form>
            </Box>

        </>
    )
}