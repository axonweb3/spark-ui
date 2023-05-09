import type { AppProps } from 'next/app';
import { Provider as JotaiProvider } from 'jotai';
import {
  SpinalConfigProvider,
  chains as predefineChains,
  configureChains,
  publicProvider,
} from '@spinal/react';
import './style.css';

const { rpcClient, indexer } = configureChains(
  [predefineChains.testnet],
  [publicProvider()],
);

const config = {
  autoConnect: true,
  rpcClient,
  indexer,
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SpinalConfigProvider config={config}>
      <JotaiProvider>
        <Component {...pageProps} />
      </JotaiProvider>
    </SpinalConfigProvider>
  );
}
