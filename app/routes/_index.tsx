import * as React from 'react';
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { console_dbg } from '~/api/util';
import { getContact } from '~/api/data';
import ContactInfo from '@/components/Contact/ContactInfo';

// https://remix.run/docs/en/main/route/meta
export const meta: MetaFunction = () => [
  { title: 'Favorite collection' },
  { name: 'description', content: 'Welcome to Favorite collection!' },
];


export const clientLoader = async ({
  params,
}: LoaderFunctionArgs) => {
  console_dbg('index loader');
  console_dbg(params.contactId as string);
  console_dbg('contactId: ', params.contactId as string)
  const contact = await getContact(params.contactId as string);
  return Response.json({ contact });
};



// https://remix.run/docs/en/main/file-conventions/routes#basic-routes
export default function Index() {
  return (
    <React.Fragment>
      <ContactInfo contactId='observerkei' descriptionURI='https://observerkei.top' />
    </React.Fragment>
  );
}
