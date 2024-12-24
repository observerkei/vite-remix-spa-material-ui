import * as React from 'react';
import type { MetaFunction } from '@remix-run/node';
import { console_dbg } from '~/api/util';
import { DEFAULT_TITLE, getLocalData, HOME_PAGE } from '~/api/data';
import ContactInfo from '@/components/Contact/ContactInfo';

// https://remix.run/docs/en/main/route/meta
export const meta: MetaFunction = () => [
  { title: DEFAULT_TITLE },
  { name: 'description', content: 'Welcome to Favorite collection!' },
];


// https://remix.run/docs/en/main/file-conventions/routes#basic-routes
export default function Index() {
  const localHomePage = getLocalData(HOME_PAGE, "");
  console_dbg('home get page: ', localHomePage);
  
  return (
    <React.Fragment>
      <ContactInfo contactId={`home-${localHomePage}`} descriptionURI={localHomePage} />
    </React.Fragment>
  );
}
