import React from 'react'
import type { TrustScore } from '../../../shared/types'

export interface TrustScoreBarProps {
  trustScore: TrustScore
  showDetails?: boolean
  onClick?: () => void
}

const LEVEL_COLORS: Record<string, { bar: string; text: string }> = {
  high:   { bar: 'bg-emerald-500', text: 'text-emerald-700' },
  medium: { bar: 'bg-amber-500',   text: 'text-amber-700' },
  low:    { bar: 'bg-zinc-400',    text: 'text-zinc-500' },
  new:    { bar: 'bg-zinc-300',    text: 'text-zinc-400' },
}

export function TrustScoreBar({ trustScore, showDetails = true, onClick }: TrustScoreBarProps) {
  const colors = LEVEL_COLORS[trustScore.level] || LEVEL_COLORS.new
  const percentage = Math.min(100, Math.max(0, trustScore.score))

  return (
    <div
      className={onClick ? 'cursor-pointer' : ''}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-zinc-600">Trust Score</span>
        <span className={`text-xs font-bold ${colors.text}`}>{trustScore.score}/100</span>
      </div>

      <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colors.bar}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {showDetails && (
        <div className="flex items-center gap-3 mt-2 text-[11px] text-zinc-400">
          <span>{trustScore.completedDeals} deals</span>
          <span>·</span>
          <span>{trustScore.avgRating.toFixed(1)}★ avg</span>
          {trustScore.disputedDeals > 0 && (
            <>
              <span>·</span>
              <span>{trustScore.disputedDeals} disputes</span>
            </>
          )}
        </div>
      )}
    </div>
  )
}
