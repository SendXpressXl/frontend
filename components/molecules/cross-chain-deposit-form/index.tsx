import React, { useState } from 'react'
import { ChainSelector, getChainOptions, ChainOption } from '../../atoms/chain-selector'
import { CHAIN_LABELS } from '../../../shared/evm-config'

export interface CrossChainDepositFormProps {
  dealId: string
  dealAmount: string
  dealSymbol: string
  onSubmit: (chainId: number, amount: number) => void
  onCancel: () => void
}

type FormStep = 'chain' | 'amount' | 'review'

// Mock balances per chain
const MOCK_BALANCES: Record<number, string> = {
  1: '2,450.00',
  42161: '12,800.50',
  8453: '5,320.75',
  43114: '1,100.00',
}

export function CrossChainDepositForm({
  dealId,
  dealAmount,
  dealSymbol,
  onSubmit,
  onCancel,
}: CrossChainDepositFormProps) {
  const [step, setStep] = useState<FormStep>('chain')
  const [selectedChainId, setSelectedChainId] = useState<number | null>(null)
  const [amount, setAmount] = useState<string>('')
  const [isSubmitting, setSubmitting] = useState(false)

  const chains = getChainOptions()
  const selectedChain = chains.find((c) => c.id === selectedChainId)

  const handleSubmit = async () => {
    if (!selectedChainId || !amount) return
    setSubmitting(true)
    // Simulated CCTP deposit delay
    await new Promise((r) => setTimeout(r, 1200))
    onSubmit(selectedChainId, parseFloat(amount))
    setSubmitting(false)
  }

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {(['chain', 'amount', 'review'] as FormStep[]).map((s, i) => (
          <React.Fragment key={s}>
            {i > 0 && <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />}
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                step === s
                  ? 'bg-brand text-white'
                  : i < ['chain', 'amount', 'review'].indexOf(step)
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
              }`}
            >
              {i + 1}
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Chain selection */}
      {step === 'chain' && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Select source chain
          </h3>
          <ChainSelector
            chains={chains}
            selectedChainId={selectedChainId}
            balances={MOCK_BALANCES}
            onSelect={setSelectedChainId}
          />
          <button
            onClick={() => selectedChainId && setStep('amount')}
            disabled={!selectedChainId}
            className="w-full rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 2: Amount */}
      {step === 'amount' && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Enter USDC amount
          </h3>
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>From {selectedChain?.name}</span>
              <span>Balance: {MOCK_BALANCES[selectedChainId ?? 0] ?? '0.00'} USDC</span>
            </div>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={0}
              step="0.01"
              className="w-full bg-transparent text-2xl font-bold text-gray-900 outline-none dark:text-white"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setStep('chain')}
              className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Back
            </button>
            <button
              onClick={() => amount && parseFloat(amount) > 0 && setStep('review')}
              disabled={!amount || parseFloat(amount) <= 0}
              className="flex-1 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              Review
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 'review' && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Confirm deposit
          </h3>
          <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Deal</span>
              <span className="font-medium text-gray-900 dark:text-white">{dealId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Source chain</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {selectedChain?.icon} {selectedChain?.name}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Amount</span>
              <span className="font-medium text-gray-900 dark:text-white">{amount} USDC</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Deal requires</span>
              <span className="font-medium text-gray-900 dark:text-white">{dealAmount} {dealSymbol}</span>
            </div>
            <div className="border-t border-gray-100 pt-3 dark:border-gray-800">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Estimated time</span>
                <span className="font-medium text-gray-900 dark:text-white">~15-20 min</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setStep('amount')}
              className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-50"
            >
              {isSubmitting ? 'Confirming…' : 'Confirm Deposit'}
            </button>
          </div>
        </div>
      )}

      {/* Cancel link */}
      <button
        onClick={onCancel}
        className="w-full text-center text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      >
        Cancel
      </button>
    </div>
  )
}
