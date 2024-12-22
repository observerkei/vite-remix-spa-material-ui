import * as React from 'react';
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { console_dbg } from '~/api/util';
import { getContact, getLocalData, HOME_PAGE, setLocalData } from '~/api/data';
import ContactInfo from '@/components/Contact/ContactInfo';

// https://remix.run/docs/en/main/route/meta
export const meta: MetaFunction = () => [
  { title: 'Favorite collection' },
  { name: 'description', content: 'Welcome to Favorite collection!' },
];


// https://remix.run/docs/en/main/file-conventions/routes#basic-routes
export default function Index() {
  let localHomePage = getLocalData(HOME_PAGE, "");
  console_dbg('home get page: ', localHomePage);
  
  return (
    <React.Fragment>
      <ContactInfo contactId={`home-${localHomePage}`} descriptionURI={localHomePage} />
    </React.Fragment>
  );
}
