import { ContactRecord } from "~/api/data";
import Iframe from "react-iframe";
import React from "react";
import { Box } from "@mui/material";
import { appBarHeight } from '@/components/Drawer/Drawer';
import { windowsMargin } from '@/components/Drawer/Drawer';
import { console_dbg } from "~/api/util";

type ContactInfoParams = { 
    contact: ContactRecord;
}


export default function ContactInfo({ contact }: ContactInfoParams) {
    return (
        <>
            <iframe
                key={`form-${contact.id}`}
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