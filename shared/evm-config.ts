import { getDefaultConfig } from 'connectkit'
import { mainnet, arbitrum, base, avalanche } from 'wagmi/chains'
import { createConfig } from 'wagmi'

export const SUPPORTED_CHAINS = [mainnet, arbitrum, base, avalanche] as const

export const USDC_ADDRESSES: Record<number, `0x${string}`> = {
  [mainnet.id]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  [arbitrum.id]: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  [base.id]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  [avalanche.id]: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
}

export const CHAIN_LABELS: Record<number, string> = {
  [mainnet.id]: 'Ethereum',
  [arbitrum.id]: 'Arbitrum',
  [base.id]: 'Base',
  [avalanche.id]: 'Avalanche',
}

export const CHAIN_ICONS: Record<number, string> = {
  [mainnet.id]: '⟠',
  [arbitrum.id]: '🔵',
  [base.id]: '🔷',
  [avalanche.id]: '🔺',
}

export const wagmiConfig = createConfig(
  getDefaultConfig({
    appName: 'SendXpress',
    chains: SUPPORTED_CHAINS,
    walletConnectProjectId: 'demo', // placeholder for prototype
  })
)
