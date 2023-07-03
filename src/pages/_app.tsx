import type { AppProps } from 'next/app';
import theme from '@/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as JotaiProvider, createStore } from 'jotai';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Montserrat } from 'next/font/google';
import { WagmiConfig, configureChains, createConfig, mainnet } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const montserrat = Montserrat({ subsets: ['latin'] });

const queryClient = new QueryClient();

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()],
);

const config = createConfig({
  autoConnect: false,
  publicClient,
  webSocketPublicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  const store = createStore();
  return (
    <>
      <style jsx global>{`
        :root {
          --montserrat-font: ${montserrat.style.fontFamily};
        }
      `}</style>
      <QueryClientProvider client={queryClient}>
        <JotaiProvider store={store}>
          <ChakraProvider theme={theme}>
            <WagmiConfig config={config}>
              <Component {...pageProps} />
            </WagmiConfig>
          </ChakraProvider>
        </JotaiProvider>
      </QueryClientProvider>
    </>
  );
}
