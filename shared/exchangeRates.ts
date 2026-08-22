import type { CurrencyCode } from './currencies'

interface RateCache {
  rates: Record<string, number>
  timestamp: number
}

const CACHE_KEY = 'sendxpress-exchange-rates'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// CoinGecko IDs for assets we support
const COINGECKO_IDS: Record<string, string> = {
  XLM: 'stellar',
  USDC: 'usd-coin',
  BTC: 'bitcoin',
  ETH: 'ethereum',
}

/**
 * Fetches the current XLM price in the given fiat currencies from CoinGecko.
 * Results are cached in localStorage for 5 minutes.
 */
export async function getExchangeRates(
  currencies: CurrencyCode[]
): Promise<Record<string, number>> {
  // Check cache first
  const cached = readCache()
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    // Filter to only the requested currencies
    const filtered: Record<string, number> = {}
    for (const c of currencies) {
      if (cached.rates[c] !== undefined) {
        filtered[c] = cached.rates[c]
      }
    }
    if (Object.keys(filtered).length === currencies.length) {
      return filtered
    }
  }

  // Fetch fresh rates
  const vsCurrencies = currencies.join(',').toLowerCase()
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=${vsCurrencies}`

  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    })

    if (!response.ok) {
      throw new Error(`CoinGecko returned ${response.status}`)
    }

    const data = await response.json()
    const xlmRates = data.stellar

    if (!xlmRates) {
      throw new Error('No stellar data in response')
    }

    // Normalize keys to uppercase
    const rates: Record<string, number> = {}
    for (const [key, value] of Object.entries(xlmRates)) {
      rates[key.toUpperCase()] = value as number
    }

    // Update cache
    writeCache(rates)

    return rates
  } catch (err) {
    console.error('[ExchangeRates] Failed to fetch rates:', err)

    // Return stale cache if available
    if (cached) {
      console.warn('[ExchangeRates] Using stale cached rates')
      return cached.rates
    }

    // Last resort: hardcoded approximate rates
    return getHardcodedRates(currencies)
  }
}

/**
 * Converts an XLM amount to a fiat currency.
 * @param xlmAmount - Amount in XLM
 * @param currency - Target currency code
 * @param rate - XLM-to-fiat rate (how many fiat units per 1 XLM)
 */
export function convertFromXLM(xlmAmount: number, rate: number): number {
  return xlmAmount * rate
}

function readCache(): RateCache | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as RateCache
  } catch {
    return null
  }
}

function writeCache(rates: Record<string, number>): void {
  try {
    const cache: RateCache = { rates, timestamp: Date.now() }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache))
  } catch {
    // localStorage might be full or unavailable
  }
}

function getHardcodedRates(currencies: CurrencyCode[]): Record<string, number> {
  // Rough approximations as of mid-2025 — only used when API is completely down
  const fallback: Record<string, number> = {
    USD: 0.35,
    NGN: 540,
    EUR: 0.32,
    GBP: 0.27,
    KES: 45,
    GHS: 5.5,
    ZAR: 6.4,
    INR: 29,
    BRL: 1.75,
    CNY: 2.5,
  }

  const result: Record<string, number> = {}
  for (const c of currencies) {
    if (fallback[c] !== undefined) {
      result[c] = fallback[c]
    }
  }
  return result
}
