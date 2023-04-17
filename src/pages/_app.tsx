import type { AppProps } from 'next/app';
import { Provider } from 'jotai';
import './style.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}
