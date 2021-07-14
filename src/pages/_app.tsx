import { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';
import { SideBarDrawerProvider } from '../context/SideBarDrawerContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { theme } from '../styles/theme.';
import { makeServer } from '../services/mirage';

import { ReactQueryDevtools } from 'react-query/devtools';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}
const queryCLient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryCLient}>
      <ChakraProvider theme={theme}>
        <SideBarDrawerProvider>
          <Component {...pageProps} />
        </SideBarDrawerProvider>
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
