import React, { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Deal } from '../../../shared/types'
import { EvmWalletConnect } from '../../molecules/evm-wallet-connect'
import { CrossChainDepositForm } from '../../molecules/cross-chain-deposit-form'
import { CctpStatusTracker, CctpPhase } from '../cctp-status-tracker'
import { FormPledge } from '../../molecules/form-pledge'
import { Utils } from '../../../shared/utils'

export interface FundDealModalProps {
  deal: Deal
  isOpen: boolean
  onClose: () => void
}

type FundingMethod = null | 'stellar' | 'evm'
type EvmStep = 'wallet' | 'deposit' | 'tracking'

export function FundDealModal({ deal, isOpen, onClose }: FundDealModalProps) {
  const [method, setMethod] = useState<FundingMethod>(null)
  const [evmStep, setEvmStep] = useState<EvmStep>('wallet')
  const [evmAddress, setEvmAddress] = useState<string | null>(null)
  const [cctpTxHash, setCctpTxHash] = useState<string | null>(null)
  const [selectedChainId, setSelectedChainId] = useState<number | null>(null)

  const handleClose = () => {
    setMethod(null)
    setEvmStep('wallet')
    setEvmAddress(null)
    setCctpTxHash(null)
    setSelectedChainId(null)
    onClose()
  }

  const handleEvmConnected = (address: string) => {
    setEvmAddress(address)
    setEvmStep('deposit')
  }

  const handleDepositSubmit = (chainId: number, amount: number) => {
    setSelectedChainId(chainId)
    // Generate a mock tx hash
    const hash = '0x' + Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('')
    setCctpTxHash(hash)
    setEvmStep('tracking')
  }

  const handleCctpComplete = () => {
    // In a real app, this would update the deal status
  }

  const formattedAmount = Utils.formatAmount(deal.amount, deal.decimals)

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          {/* Header */}
          <div className="mb-5 flex items-center justify-between">
            <div>
              <Dialog.Title className="text-lg font-bold text-gray-900 dark:text-white">
                Fund Deal
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {deal.title} — {formattedAmount} {deal.symbol}
              </Dialog.Description>
            </div>
            <Dialog.Close className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Dialog.Close>
          </div>

          {/* Method selection */}
          {method === null && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Choose funding method
              </p>
              <button
                onClick={() => setMethod('stellar')}
                className="flex w-full items-center gap-4 rounded-xl border-2 border-gray-200 p-4 text-left transition-all hover:border-brand hover:bg-brand/5 dark:border-gray-700 dark:hover:border-brand dark:hover:bg-brand/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                  <span className="text-xl">⭐</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Stellar Wallet
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Deposit directly from your Freighter wallet
                  </p>
                </div>
              </button>
              <button
                onClick={() => setMethod('evm')}
                className="flex w-full items-center gap-4 rounded-xl border-2 border-gray-200 p-4 text-left transition-all hover:border-brand hover:bg-brand/5 dark:border-gray-700 dark:hover:border-brand dark:hover:bg-brand/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                  <span className="text-xl">⟠</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Deposit from another chain
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Bridge USDC from Ethereum, Arbitrum, Base, or Avalanche via CCTP
                  </p>
                </div>
              </button>
            </div>
          )}

          {/* Stellar flow */}
          {method === 'stellar' && (
            <div>
              <button
                onClick={() => setMethod(null)}
                className="mb-4 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <FormPledge
                account=""
                decimals={deal.decimals}
                symbol={deal.symbol}
                onPledge={handleClose}
                updatedAt={Date.now()}
              />
            </div>
          )}

          {/* EVM flow */}
          {method === 'evm' && (
            <div>
              <button
                onClick={() => {
                  if (evmStep === 'wallet') setMethod(null)
                  else if (evmStep === 'deposit') setEvmStep('wallet')
                  else setEvmStep('deposit')
                }}
                className="mb-4 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              {evmStep === 'wallet' && (
                <EvmWalletConnect onConnected={handleEvmConnected} />
              )}

              {evmStep === 'deposit' && (
                <CrossChainDepositForm
                  dealId={deal.id}
                  dealAmount={formattedAmount}
                  dealSymbol={deal.symbol}
                  onSubmit={handleDepositSubmit}
                  onCancel={handleClose}
                />
              )}

              {evmStep === 'tracking' && cctpTxHash && selectedChainId && (
                <CctpStatusTracker
                  txHash={cctpTxHash}
                  sourceChainId={selectedChainId}
                  destChainName="Stellar"
                  amount={formattedAmount}
                  onComplete={handleCctpComplete}
                />
              )}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
