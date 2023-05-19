import type { AppProps } from 'next/app';
import theme from '@/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as JotaiProvider, createStore } from 'jotai';
import { SpinalConfigProvider, chains } from '@spinal-ckb/react';

const config = {
  autoConnect: true,
  chains: [chains.testnet],
};

export default function App({ Component, pageProps }: AppProps) {
  const store = createStore();
  return (
    <ChakraProvider theme={theme}>
      <JotaiProvider store={store}>
        <SpinalConfigProvider config={config}>
          <Component {...pageProps} />
        </SpinalConfigProvider>
      </JotaiProvider>
    </ChakraProvider>
  );
}
