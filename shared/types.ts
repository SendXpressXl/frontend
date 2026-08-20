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
}
