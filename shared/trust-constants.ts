import type { TrustLevel, VerificationStatus } from './types'

export const TRUST_LEVEL_STYLES: Record<TrustLevel, { bg: string; border: string; dot: string; text: string; bar: string }> = {
  high:   { bg: 'bg-emerald-50',  border: 'border-emerald-200',  dot: 'bg-emerald-500',  text: 'text-emerald-700', bar: 'bg-emerald-500' },
  medium: { bg: 'bg-amber-50',    border: 'border-amber-200',    dot: 'bg-amber-500',    text: 'text-amber-700',   bar: 'bg-amber-500' },
  low:    { bg: 'bg-zinc-100',    border: 'border-zinc-200',     dot: 'bg-zinc-400',     text: 'text-zinc-500',    bar: 'bg-zinc-400' },
  new:    { bg: 'bg-zinc-100',    border: 'border-zinc-200',     dot: 'bg-zinc-300',     text: 'text-zinc-400',    bar: 'bg-zinc-300' },
}

export const TRUST_LEVEL_LABELS: Record<TrustLevel, string> = {
  high:   'Trusted',
  medium: 'Established',
  low:    'New Seller',
  new:    'New Seller',
}

export const VERIFICATION_ICONS: Record<VerificationStatus, string> = {
  verified: '✓',
  pending:  '⏳',
  unverified: '',
}

export const TRUST_LEVEL_DESCRIPTIONS: Record<TrustLevel, string> = {
  high: 'This supplier has a strong track record of successful deals and satisfied buyers.',
  medium: 'This supplier has completed several deals. Check their deal history for details.',
  low: 'This supplier is relatively new. Consider starting with a smaller order.',
  new: 'This supplier has not yet completed enough deals to build a trust score.',
}
