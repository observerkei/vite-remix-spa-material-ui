import * as React from 'react';
import { MetaFunction, redirect, useLoaderData } from '@remix-run/react';
import ContactInfo from '@/components/Contact/ContactInfo';
import type {
  LoaderFunctionArgs,
} from "@remix-run/node";
import { DEFAULT_TITLE, getContact } from '~/api/data';
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

export const meta: MetaFunction<typeof clientLoader> = ({
  data,
}) => {
  return [{ title: data.contact?.name || DEFAULT_TITLE }];
};

export default function ContactPage() {
  const { contact } = useLoaderData<typeof clientLoader>();
  console_dbg('use');
  console_dbg(contact);

  return (
    <React.Fragment>
        <ContactInfo contactId={contact.id} descriptionURI={contact.descriptionURI} />
    </React.Fragment>
  );
}
