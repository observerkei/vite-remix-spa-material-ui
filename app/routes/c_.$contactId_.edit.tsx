import * as React from 'react';
import { Link, useLoaderData } from '@remix-run/react';
import Button from '@mui/material/Button';
import ContactInfoEdit from '@/components/Contact/ContactInfoEdit';
import type {
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { getContact } from '~/api/data';


export const clientLoader = async ({
  params,
}: LoaderFunctionArgs) => {
  console.log('load');
  console.log(params.contactId);
  const contact = await getContact(params.contactId);
  return Response.json({ contact });
};

export default function ContactPage() {
  const { contact } = useLoaderData<typeof clientLoader>();
  console.log('use');
  console.log(contact);

  return (
    <React.Fragment>
      <ContactInfoEdit contact={contact} />
    </React.Fragment>
  );
}
