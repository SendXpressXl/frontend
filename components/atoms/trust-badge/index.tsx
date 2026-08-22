import React from 'react'
import type { TrustLevel, VerificationStatus } from '../../../shared/types'

export interface TrustBadgeProps {
  level: TrustLevel
  verification: VerificationStatus
  showLabel?: boolean
  size?: 'sm' | 'md'
}

const LEVEL_STYLES: Record<TrustLevel, { bg: string; border: string; dot: string; text: string }> = {
  high:   { bg: 'bg-emerald-50',  border: 'border-emerald-200',  dot: 'bg-emerald-500',  text: 'text-emerald-700' },
  medium: { bg: 'bg-amber-50',    border: 'border-amber-200',    dot: 'bg-amber-500',    text: 'text-amber-700' },
  low:    { bg: 'bg-zinc-100',    border: 'border-zinc-200',     dot: 'bg-zinc-400',     text: 'text-zinc-500' },
  new:    { bg: 'bg-zinc-100',    border: 'border-zinc-200',     dot: 'bg-zinc-300',     text: 'text-zinc-400' },
}

const VERIFICATION_ICONS: Record<VerificationStatus, string> = {
  verified: '✓',
  pending:  '⏳',
  unverified: '',
}

const LEVEL_LABELS: Record<TrustLevel, string> = {
  high:   'Trusted',
  medium: 'Established',
  low:    'New Seller',
  new:    'New Seller',
}

export function TrustBadge({ level, verification, showLabel = true, size = 'sm' }: TrustBadgeProps) {
  const styles = LEVEL_STYLES[level]
  const icon = VERIFICATION_ICONS[verification]

  const sizeClasses = size === 'sm'
    ? 'px-2 py-0.5 text-[10px] gap-1'
    : 'px-2.5 py-1 text-xs gap-1.5'

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${styles.bg} ${styles.border} ${styles.text} ${sizeClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
      {icon && <span className="font-bold">{icon}</span>}
      {showLabel && <span>{LEVEL_LABELS[level]}</span>}
    </span>
  )
}
