import React from 'react'
import type { TrustLevel, VerificationStatus } from '../../../shared/types'
import { TRUST_LEVEL_STYLES, TRUST_LEVEL_LABELS, VERIFICATION_ICONS } from '../../../shared/trust-constants'

export interface TrustBadgeProps {
  level: TrustLevel
  verification: VerificationStatus
  showLabel?: boolean
  size?: 'sm' | 'md'
}

export function TrustBadge({ level, verification, showLabel = true, size = 'sm' }: TrustBadgeProps) {
  const styles = TRUST_LEVEL_STYLES[level]
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
      {showLabel && <span>{TRUST_LEVEL_LABELS[level]}</span>}
    </span>
  )
}
