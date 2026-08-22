export type DealStatus =
  | 'created'
  | 'funds_locked'
  | 'goods_shipped'
  | 'received'
  | 'released'
  | 'disputed'
  | 'cancelled'

export interface DealStep {
  id: DealStatus
  label: string
  timestamp?: Date
  completed: boolean
  current: boolean
  txHash?: string
}

export interface DisputeInfo {
  raisedAt: Date
  reason: string
  status: 'open' | 'under_review' | 'resolved'
  resolvedAt?: Date
}

export interface InstallmentMilestone {
  id: string
  label: string
  amount: bigint
  decimals: number
  symbol: string
  completed: boolean
  timestamp?: Date
}

export interface Deal {
  id: string
  title: string
  buyer: string
  seller: string
  amount: bigint
  decimals: number
  symbol: string
  status: DealStatus
  steps: DealStep[]
  dispute?: DisputeInfo
  milestones?: InstallmentMilestone[]
  deadline?: Date
  createdAt: Date
  updatedAt: Date
  txHash?: string
  fundingMethod?: 'stellar' | 'evm'
}

// Cross-chain (CCTP) types

export type CctpPhase = 'burning' | 'attesting' | 'minting' | 'complete'

export interface CctpTransaction {
  id: string
  dealId: string
  sourceChainId: number
  sourceChainName: string
  destChainName: string
  amount: string
  usdcAmount: number
  txHash: string
  phase: CctpPhase
  startedAt: Date
  completedAt?: Date
  phases: {
    burning?: Date
    attesting?: Date
    minting?: Date
    complete?: Date
  }
}

export interface EvmChain {
  id: number
  name: string
  icon: string
  usdcAddress: string
  rpcUrl: string
}
