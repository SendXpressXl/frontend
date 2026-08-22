import React, { useState, useEffect } from 'react'
import { CHAIN_LABELS } from '../../../shared/evm-config'

export type CctpPhase = 'burning' | 'attesting' | 'minting' | 'complete'

export interface CctpStatusTrackerProps {
  txHash: string
  sourceChainId: number
  destChainName: string
  amount: string
  onComplete?: () => void
}

const PHASES: { id: CctpPhase; label: string; description: string }[] = [
  { id: 'burning', label: 'Burning USDC', description: 'Burning USDC on source chain' },
  { id: 'attesting', label: 'Awaiting Attestation', description: 'Circle verifying the burn' },
  { id: 'minting', label: 'Minting on Stellar', description: 'Minting USDC on destination' },
  { id: 'complete', label: 'Complete', description: 'Funds locked in escrow' },
]

function PhaseIcon({ phase, currentPhase }: { phase: CctpPhase; currentPhase: CctpPhase }) {
  const phaseIndex = PHASES.findIndex((p) => p.id === phase)
  const currentIndex = PHASES.findIndex((p) => p.id === currentPhase)

  if (phaseIndex < currentIndex) {
    return (
      <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30">
        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    )
  }

  if (phaseIndex === currentIndex) {
    if (phase === 'complete') {
      return (
        <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30">
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )
    }
    return (
      <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-brand shadow-lg shadow-brand/40 animate-pulse-glow">
        <div className="h-2.5 w-2.5 rounded-full bg-white" />
      </div>
    )
  }

  return (
    <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800">
      <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600" />
    </div>
  )
}

export function CctpStatusTracker({
  txHash,
  sourceChainId,
  destChainName,
  amount,
  onComplete,
}: CctpStatusTrackerProps) {
  const [currentPhase, setCurrentPhase] = useState<CctpPhase>('burning')
  const [timestamps, setTimestamps] = useState<Partial<Record<CctpPhase, Date>>>({
    burning: new Date(),
  })

  // Simulate phase progression for demo
  useEffect(() => {
    const phaseOrder: CctpPhase[] = ['burning', 'attesting', 'minting', 'complete']
    const currentIndex = phaseOrder.indexOf(currentPhase)

    if (currentIndex >= phaseOrder.length - 1) {
      onComplete?.()
      return
    }

    const timer = setTimeout(() => {
      const nextPhase = phaseOrder[currentIndex + 1]
      setCurrentPhase(nextPhase)
      setTimestamps((prev) => ({ ...prev, [nextPhase]: new Date() }))
    }, 3000)

    return () => clearTimeout(timer)
  }, [currentPhase, onComplete])

  const sourceChainName = CHAIN_LABELS[sourceChainId] ?? 'Unknown'
  const truncatedHash = `${txHash.slice(0, 8)}…${txHash.slice(-6)}`

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Cross-Chain Transfer
          </span>
          <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand">
            CCTP
          </span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Route</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {sourceChainName} → {destChainName}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Amount</span>
            <span className="font-medium text-gray-900 dark:text-white">{amount} USDC</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Tx Hash</span>
            <span className="font-mono text-xs text-gray-900 dark:text-white">{truncatedHash}</span>
          </div>
        </div>
      </div>

      {/* Phase timeline */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
        <div className="space-y-0">
          {PHASES.map((phase, i) => (
            <div key={phase.id} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <PhaseIcon phase={phase.id} currentPhase={currentPhase} />
                {i < PHASES.length - 1 && (
                  <div
                    className={`w-0.5 flex-1 min-h-[24px] ${
                      PHASES.findIndex((p) => p.id === phase.id) <
                      PHASES.findIndex((p) => p.id === currentPhase)
                        ? 'bg-emerald-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
              </div>
              <div className="pb-6 pt-1">
                <p
                  className={`text-sm font-semibold ${
                    PHASES.findIndex((p) => p.id === phase.id) <=
                    PHASES.findIndex((p) => p.id === currentPhase)
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {phase.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {phase.description}
                </p>
                {timestamps[phase.id] && (
                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    {timestamps[phase.id]!.toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
