export interface Currency {
  code: string
  name: string
  symbol: string
  locale: string
  flag: string
}

export const SUPPORTED_CURRENCIES: Record<string, Currency> = {
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', locale: 'en-US', flag: '🇺🇸' },
  NGN: { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', locale: 'en-NG', flag: '🇳🇬' },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', locale: 'en-IE', flag: '🇪🇺' },
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£', locale: 'en-GB', flag: '🇬🇧' },
  KES: { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', locale: 'en-KE', flag: '🇰🇪' },
  GHS: { code: 'GHS', name: 'Ghanaian Cedi', symbol: 'GH₵', locale: 'en-GH', flag: '🇬🇭' },
  ZAR: { code: 'ZAR', name: 'South African Rand', symbol: 'R', locale: 'en-ZA', flag: '🇿🇦' },
  INR: { code: 'INR', name: 'Indian Rupee', symbol: '₹', locale: 'en-IN', flag: '🇮🇳' },
  BRL: { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', locale: 'pt-BR', flag: '🇧🇷' },
  CNY: { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', locale: 'zh-CN', flag: '🇨🇳' },
}

export type CurrencyCode = keyof typeof SUPPORTED_CURRENCIES

export const DEFAULT_CURRENCY: CurrencyCode = 'USD'

/**
 * Detects the user's likely currency from their browser locale.
 * Falls back to USD if the locale doesn't map to a supported currency.
 */
export function detectCurrencyFromLocale(): CurrencyCode {
  if (typeof navigator === 'undefined') return DEFAULT_CURRENCY

  const lang = navigator.language || 'en-US'
  // Try to match the region part (e.g. "en-NG" -> "NG")
  const region = lang.split('-')[1]?.toUpperCase()

  if (region && region in SUPPORTED_CURRENCIES) {
    return region as CurrencyCode
  }

  // Some common locale -> currency mappings
  const localeMap: Record<string, CurrencyCode> = {
    'en': 'USD',
    'pt': 'BRL',
    'zh': 'CNY',
    'hi': 'INR',
  }

  const langCode = lang.split('-')[0].toLowerCase()
  if (langCode in localeMap) {
    return localeMap[langCode]
  }

  return DEFAULT_CURRENCY
}

/**
 * Formats a converted amount with the correct currency symbol and locale.
 */
export function formatCurrency(amount: number, currencyCode: CurrencyCode): string {
  const currency = SUPPORTED_CURRENCIES[currencyCode]
  if (!currency) return `${amount.toFixed(2)} ${currencyCode}`

  try {
    return new Intl.NumberFormat(currency.locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: amount >= 1000 ? 0 : 2,
      maximumFractionDigits: amount >= 1000 ? 0 : 2,
    }).format(amount)
  } catch {
    return `${currency.symbol}${amount.toFixed(2)}`
  }
}
