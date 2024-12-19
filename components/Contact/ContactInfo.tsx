import { ContactRecord } from "~/api/data";
import Iframe from "react-iframe";
import React from "react";
import { Box } from "@mui/material";
import { appBarHeight } from '@/components/Drawer/DrawerHead';
import { windowsMargin } from '@/components/Drawer/Drawer';



export default function ContactInfo({ contact }: { contact: ContactRecord }) {
    return (
        <>
            <Box sx={{
                height: `calc(100vh - ${appBarHeight}px)`,
                display: 'flex',
                marginBottom: 0,
            }}>
                <iframe
                    src={ contact.descriptionURI || ""}
                    sandbox="allow-scripts allow-forms allow-same-origin"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    loading="lazy"
                    style={{
                        overflow: "hidden",
                        alignSelf: 'stretch',
                    }}
                />
            </Box>

        </>
    )
}