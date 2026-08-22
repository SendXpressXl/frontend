import React from 'react'
import { CHAIN_LABELS, CHAIN_ICONS } from '../../../shared/evm-config'

export interface ChainOption {
  id: number
  name: string
  icon: string
}

export interface ChainSelectorProps {
  chains: ChainOption[]
  selectedChainId: number | null
  balances: Record<number, string>
  onSelect: (chainId: number) => void
}

export function ChainSelector({ chains, selectedChainId, balances, onSelect }: ChainSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {chains.map((chain) => {
        const isSelected = selectedChainId === chain.id
        const balance = balances[chain.id] ?? '0.00'
        return (
          <button
            key={chain.id}
            onClick={() => onSelect(chain.id)}
            className={`flex flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-all ${
              isSelected
                ? 'border-brand bg-brand/5 dark:bg-brand/10'
                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{chain.icon}</span>
              <span className={`text-sm font-semibold ${isSelected ? 'text-brand' : 'text-gray-900 dark:text-white'}`}>
                {chain.name}
              </span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {balance} USDC
            </span>
          </button>
        )
      })}
    </div>
  )
}

export function getChainOptions(): ChainOption[] {
  return Object.entries(CHAIN_LABELS).map(([id, name]) => ({
    id: Number(id),
    name,
    icon: CHAIN_ICONS[Number(id)] ?? '?',
  }))
}
