import * as React from 'react';
import { Link, useLoaderData } from '@remix-run/react';
import Button from '@mui/material/Button';
import ContactInfo from '@/components/Contact/ContactInfo';
import type {
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { getContact } from '~/api/data';


export const clientLoader = async ({
  request,
}: LoaderFunctionArgs) => {
  console.log('load');
  const url = new URL(request.url);
  const contactId: string = url.searchParams.get("contactId") || "";
  const contact = await getContact(contactId);
  return Response.json({ contact });
};

export default function ContactPage() {
  const { contact } = useLoaderData<typeof clientLoader>();
  console.log('use');
  console.log(contact);

  return (
    <React.Fragment>
      <ContactInfo />
      <br />
      <Button variant="contained" component={Link} to="/">
        Go to the main page
      </Button>

    </React.Fragment>
  );
}
