import * as React from 'react';
import { Link, redirect, useLoaderData } from '@remix-run/react';
import Button from '@mui/material/Button';
import ContactInfoEdit from '@/components/Contact/ContactInfoEdit';
import type {
  LinksFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/node";
import {
  Form,
} from "@remix-run/react";
import { getContact, updateContact, ContactInfoType, ContactRecord } from '~/api/data';
import { console_dbg } from '@/app/api/util';
import invariant from 'tiny-invariant';

export const clientAction = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  console_dbg('insert edit action.');
  invariant(params.contactId, "Missing contactId param");
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  
  return redirect(`/c/${params.contactId}`);
};

// export const clientAction = async ({
//   params,
//   request,
// }: ActionFunctionArgs) => {
//   console_dbg('insert edit action.');

//   const formData = await request.formData();
//   console_dbg('get from: ', JSON.stringify(formData));


//   const updates = Object.fromEntries(formData);
//   await updateContact(params.contactId as string, updates);

  
//   return redirect(`/c/${params?.contactId}/edit`);
// }

export const clientLoader = async ({
  params,
}: LoaderFunctionArgs) => {
  console_dbg('c edit loader');
  console_dbg(params.contactId as string);
  const contact = await getContact(params.contactId as string);
  return Response.json({ contact });
};

export default function ContactPage() {
  const { contact } = useLoaderData<typeof clientLoader>();
  console_dbg('use');
  console_dbg(contact);

  return (
    <React.Fragment>
      <ContactInfoEdit contact={contact} Form={Form} />
    </React.Fragment>
  );
}
