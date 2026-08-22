import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { CurrencyProvider } from '../hooks/CurrencyContext'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CurrencyProvider>
      <Component {...pageProps} />
    </CurrencyProvider>
  );
}

export default MyApp
