import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { RemixBrowser } from '@remix-run/react';
import CssBaseline from '@mui/material/CssBaseline';
import { MuiProvider } from './mui/MuiProvider';
import { dataInit } from './api/data'

const hydrate = () => {
  React.startTransition(() => {
    dataInit();
    ReactDOM.hydrateRoot(
      document,
      <MuiProvider>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <RemixBrowser />
      </MuiProvider>,
    );
  });
};

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);

} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  setTimeout(hydrate, 1);
}
