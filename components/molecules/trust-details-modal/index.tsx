import React, { useEffect, useRef } from 'react'
import type { TrustScore } from '../../../shared/types'
import { TrustBadge } from '../../atoms/trust-badge'

export interface TrustDetailsModalProps {
  trustScore: TrustScore
  supplierName?: string
  isOpen: boolean
  onClose: () => void
}

export function TrustDetailsModal({ trustScore, supplierName, isOpen, onClose }: TrustDetailsModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const accountAge = trustScore.accountAgeDays >= 30
    ? `${Math.floor(trustScore.accountAgeDays / 30)} months`
    : `${trustScore.accountAgeDays} days`

  const disputeRate = trustScore.completedDeals > 0
    ? ((trustScore.disputedDeals / trustScore.completedDeals) * 100).toFixed(1)
    : '0'

  const rows = [
    { label: 'Completed Deals', value: trustScore.completedDeals.toLocaleString(), icon: '📦' },
    { label: 'Average Rating', value: `${trustScore.avgRating.toFixed(1)} / 5.0`, icon: '⭐' },
    { label: 'Dispute Rate', value: `${disputeRate}%`, icon: trustScore.disputedDeals > 0 ? '⚠️' : '✅' },
    { label: 'Disputes Resolved in Favor', value: trustScore.disputedDeals > 0 ? `${trustScore.resolvedInFavor}/${trustScore.disputedDeals}` : '—', icon: '⚖️' },
    { label: 'Account Age', value: accountAge, icon: '📅' },
    { label: 'Verification', value: trustScore.verificationStatus === 'verified' ? 'Verified ✓' : trustScore.verificationStatus === 'pending' ? 'Pending' : 'Unverified', icon: '🔒' },
  ]

  const levelDescriptions: Record<string, string> = {
    high: 'This supplier has a strong track record of successful deals and satisfied buyers.',
    medium: 'This supplier has completed several deals. Check their deal history for details.',
    low: 'This supplier is relatively new. Consider starting with a smaller order.',
    new: 'This supplier has not yet completed enough deals to build a trust score.',
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-zinc-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-zinc-900">
              {supplierName ? `${supplierName}'s Trust Score` : 'Trust Score'}
            </h3>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Score display */}
          <div className="flex items-center gap-4 mb-3">
            <div className="text-3xl font-black text-zinc-900">{trustScore.score}</div>
            <div className="flex-1">
              <div className="h-2 bg-zinc-100 rounded-full overflow-hidden mb-1">
                <div
                  className={`h-full rounded-full ${
                    trustScore.level === 'high' ? 'bg-emerald-500' :
                    trustScore.level === 'medium' ? 'bg-amber-500' :
                    'bg-zinc-300'
                  }`}
                  style={{ width: `${trustScore.score}%` }}
                />
              </div>
              <TrustBadge level={trustScore.level} verification={trustScore.verificationStatus} size="sm" />
            </div>
          </div>

          <p className="text-xs text-zinc-500 leading-relaxed">
            {levelDescriptions[trustScore.level]}
          </p>
        </div>

        {/* Breakdown */}
        <div className="px-6 py-4">
          <h4 className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-3">How this score is calculated</h4>
          <div className="space-y-3">
            {rows.map(row => (
              <div key={row.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{row.icon}</span>
                  <span className="text-sm text-zinc-600">{row.label}</span>
                </div>
                <span className="text-sm font-semibold text-zinc-900">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-100">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
