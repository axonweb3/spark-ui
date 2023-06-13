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
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  const store = createStore();
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <JotaiProvider store={store}>
          <WagmiConfig config={config}>
            <style jsx global>{`
              :root {
                --montserrat-font: ${montserrat.style.fontFamily};
              }
            `}</style>
            <Component {...pageProps} />
          </WagmiConfig>
        </JotaiProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
