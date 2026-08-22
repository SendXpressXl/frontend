import type { AppProps } from 'next/app'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider } from 'connectkit'
import { wagmiConfig } from '../shared/evm-config'
import '../styles/globals.css'
import { CurrencyProvider } from '../hooks/CurrencyContext'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CurrencyProvider>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider>
            <Component {...pageProps} />
          </ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </CurrencyProvider>
  );
}

export default MyApp
