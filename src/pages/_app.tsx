import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as JotaiProvider } from 'jotai';
import {
  SpinalConfigProvider,
  chains as predefineChains,
  configureChains,
  publicProvider,
} from '@spinal-ckb/react';
import theme from '@/theme';

const { rpcClient, indexer } = configureChains(
  [predefineChains.testnet, predefineChains.mainnet],
  [publicProvider()],
);

const config = {
  autoConnect: true,
  rpcClient,
  indexer,
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SpinalConfigProvider config={config}>
        <JotaiProvider>
          <Component {...pageProps} />
        </JotaiProvider>
      </SpinalConfigProvider>
    </ChakraProvider>
  );
}
