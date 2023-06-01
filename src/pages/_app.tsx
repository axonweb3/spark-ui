import type { AppProps } from 'next/app';
import theme from '@/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as JotaiProvider, createStore } from 'jotai';
import {
  MetaMaskConnector,
  SpinalConfigProvider,
  chains,
} from '@spinal-ckb/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

const queryClient = new QueryClient();

const config = {
  autoConnect: true,
  chains: [chains.testnet],
  connectors: [new MetaMaskConnector()],
};

export default function App({ Component, pageProps }: AppProps) {
  const store = createStore();
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <JotaiProvider store={store}>
          <SpinalConfigProvider config={config}>
            <style jsx global>{`
              :root {
                --montserrat-font: ${montserrat.style.fontFamily};
              }
            `}</style>
            <Component {...pageProps} />
          </SpinalConfigProvider>
        </JotaiProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
