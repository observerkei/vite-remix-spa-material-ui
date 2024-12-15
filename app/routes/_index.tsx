import * as React from 'react';
import { useEffect } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Link as RemixLink } from '@remix-run/react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useColorScheme } from '@mui/material/styles';


// https://remix.run/docs/en/main/route/meta
export const meta: MetaFunction = () => [
  { title: 'Remix Starter' },
  { name: 'description', content: 'Welcome to remix!' },
];

// https://remix.run/docs/en/main/file-conventions/routes#basic-routes
export default function Index() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  setTimeout(() => setMode('light'), 3);

  return (
    <React.Fragment>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Material UI Remix in TypeScript example
      </Typography>
      <Link to="/about" color="secondary" component={RemixLink}>
        Go to the about page
      </Link>
      <br/>
      <Link to="/test" color="secondary" component={RemixLink}>
        Go to the test page
      </Link>
    </React.Fragment>
  );
}
function useEffetc(arg0: () => void, arg1: never[]) {
  throw new Error('Function not implemented.');
}

