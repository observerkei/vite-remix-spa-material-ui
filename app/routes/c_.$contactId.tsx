import * as React from 'react';
import { Link, redirect, useLoaderData, useNavigate } from '@remix-run/react';
import Button from '@mui/material/Button';
import ContactInfo from '@/components/Contact/ContactInfo';
import type {
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { getContact } from '~/api/data';
import { Box } from "@mui/material";
import { console_dbg } from '@/app/api/util';


export const clientLoader = async ({
  params,
}: LoaderFunctionArgs) => {
  console_dbg('c loader');
  console_dbg(params.contactId as string);
  const contact = await getContact(params.contactId as string);
  
  // empty contact.
  const descriptionURI = contact?.descriptionURI || "";
  if (descriptionURI === "") {
      return redirect(`/c/${contact?.id}/edit`);
  }

  return Response.json({ contact });
};

export default function ContactPage() {
  const { contact } = useLoaderData<typeof clientLoader>();
  console_dbg('use');
  console_dbg(contact);

  return (
    <React.Fragment>
        <ContactInfo contact={contact} />
    </React.Fragment>
  );
}
