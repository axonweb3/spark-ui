import type { AppProps } from 'next/app';
import theme from '@/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as JotaiProvider, createStore } from 'jotai';
import { Montserrat } from 'next/font/google';
import { WagmiConfig, configureChains, createConfig, mainnet } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { Global, css } from '@emotion/react';
import Head from 'next/head';
import { trpc } from '@/server';

const montserrat = Montserrat({ subsets: ['latin'] });

const { publicClient, webSocketPublicClient } = configureChains([mainnet], [publicProvider()]);

const config = createConfig({
  autoConnect: false,
  publicClient,
  webSocketPublicClient,
});

function App({ Component, pageProps }: AppProps) {
  const store = createStore();
  return (
    <JotaiProvider store={store}>
      <ChakraProvider theme={theme}>
        <WagmiConfig config={config}>
          <Global
            styles={css`
              :root {
                --montserrat-font: ${montserrat.style.fontFamily};
              }
              body {
                color: ${theme.colors.black};
              }
            `}
          />
          <Head>
            <title>Spark</title>
          </Head>
          <Component {...pageProps} />
        </WagmiConfig>
      </ChakraProvider>
    </JotaiProvider>
  );
}

export default trpc.withTRPC(App);
