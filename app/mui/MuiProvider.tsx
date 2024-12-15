// fix hydration error.

import { ThemeProvider } from '@mui/material';
import theme from './theme';
import { CacheProvider } from '@emotion/react';
import ClientStyleContext from './ClientStyleContext';
import { useMemo, useState } from 'react';
import createCache from '@emotion/cache';


function createEmotionCache() {
  return createCache({ key: 'css' });
}

export function MuiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cache, setCache] = useState(createEmotionCache());

  const clientStyleContextValue = useMemo(
    () => ({
      reset() {
        setCache(createEmotionCache());
      },
    }),
    [],
  );

  return (
    <ClientStyleContext.Provider value={clientStyleContextValue}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </CacheProvider>
    </ClientStyleContext.Provider>
  );
}