import { ContactRecord } from "~/api/data";
import Iframe from "react-iframe";
import React from "react";
import { Box } from "@mui/material";
import { appBarHeight } from '@/components/Drawer/AppHead';
import { windowsMargin } from '@/components/Drawer/DrawerBak';



export default function ContactInfo({ contact }: { contact: ContactRecord }) {
    return (
        <>
            <iframe
                src={ contact.descriptionURI || ""}
                sandbox="allow-scripts allow-forms allow-same-origin"
                frameBorder="0"
                loading="lazy"
                style={{
                    overflow: "hidden",
                    height: '100%',
                    width: '100%',
                    flexGrow: 1,
                }}
            />
        </>
    )
}