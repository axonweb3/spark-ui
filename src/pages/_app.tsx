import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as JotaiProvider } from 'jotai';
import theme from '@/theme';
import { IPWCoreConfig, PWCoreProvider } from '@/hooks/pw-core/provider';
import { EthProvider, PwCollector } from '@lay2/pw-core';

const PW_CORE_CONFIG: IPWCoreConfig = {
  // XXX: CKB mainnet: https://mainnet.ckb.dev
  nodeUrl: 'https://testnet.ckb.dev',
  provider: new EthProvider(),
  // FIXME: consider using a project local collector
  collector: new PwCollector('https://cellapitest.ckb.pw'),
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PWCoreProvider config={PW_CORE_CONFIG}>
      <ChakraProvider theme={theme}>
        <JotaiProvider>
          <Component {...pageProps} />
        </JotaiProvider>
      </ChakraProvider>
    </PWCoreProvider>
  );
}
