import * as React from 'react';
import { Link, redirect, useLoaderData } from '@remix-run/react';
import Button from '@mui/material/Button';
import ContactInfoEdit from '@/components/Contact/ContactInfoEdit';
import type {
  LinksFunction,
  ActionFunctionArgs,
} from "@remix-run/node";
import { deleteContact } from '~/api/data';
import { console_dbg } from '@/app/api/util';


export const clientAction = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  console_dbg('load del: ', params.contactId as string);
  await deleteContact(params.contactId as string);
  return redirect(`/`);
};
