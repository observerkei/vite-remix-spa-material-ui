import React from "react";

type ContactInfoParams = { 
    contactId: string;
    descriptionURI: string;
}


export default function ContactInfo({ contactId, descriptionURI }: ContactInfoParams) {
    return (
        <>
            <iframe
                key={`form-${contactId}`}
                src={ descriptionURI || ""}
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