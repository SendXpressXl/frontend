import { CctpTransaction } from './types'

export const mockCctpTransactions: CctpTransaction[] = [
  {
    id: 'cctp-001',
    dealId: 'DL-2024-0860',
    sourceChainId: 1,
    sourceChainName: 'Ethereum',
    destChainName: 'Stellar',
    amount: '6,800.00',
    usdcAmount: 6800,
    txHash: '0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
    phase: 'complete',
    startedAt: new Date(Date.now() - 45 * 60 * 1000),
    completedAt: new Date(Date.now() - 5 * 60 * 1000),
    phases: {
      burning: new Date(Date.now() - 45 * 60 * 1000),
      attesting: new Date(Date.now() - 40 * 60 * 1000),
      minting: new Date(Date.now() - 10 * 60 * 1000),
      complete: new Date(Date.now() - 5 * 60 * 1000),
    },
  },
  {
    id: 'cctp-002',
    dealId: 'DL-2024-0847',
    sourceChainId: 42161,
    sourceChainName: 'Arbitrum',
    destChainName: 'Stellar',
    amount: '12,500.00',
    usdcAmount: 12500,
    txHash: '0xfedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210',
    phase: 'attesting',
    startedAt: new Date(Date.now() - 20 * 60 * 1000),
    phases: {
      burning: new Date(Date.now() - 20 * 60 * 1000),
      attesting: new Date(Date.now() - 15 * 60 * 1000),
    },
  },
]

export function getMockCctpForDeal(dealId: string): CctpTransaction | undefined {
  return mockCctpTransactions.find((tx) => tx.dealId === dealId)
}
