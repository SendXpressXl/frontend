import { useState, useEffect, useCallback } from 'react'
import type { CurrencyCode } from '../shared/currencies'
import { SUPPORTED_CURRENCIES, DEFAULT_CURRENCY, detectCurrencyFromLocale, formatCurrency } from '../shared/currencies'
import { getExchangeRates, convertFromXLM } from '../shared/exchangeRates'

const STORAGE_KEY = 'sendxpress-currency'

interface UseCurrencyReturn {
  currency: CurrencyCode
  setCurrency: (code: CurrencyCode) => void
  rates: Record<string, number>
  loading: boolean
  convert: (xlmAmount: number) => number
  format: (xlmAmount: number) => string
  formatConverted: (xlmAmount: number) => string
}

export function useCurrency(): UseCurrencyReturn {
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY)
  const [rates, setRates] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  // Load saved currency on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null
    const resolved = stored && stored in SUPPORTED_CURRENCIES
      ? stored
      : detectCurrencyFromLocale()
    setCurrencyState(resolved)
  }, [])

  // Fetch rates whenever currency changes
  useEffect(() => {
    let cancelled = false

    async function fetchRates() {
      setLoading(true)
      try {
        const allCodes = Object.keys(SUPPORTED_CURRENCIES) as CurrencyCode[]
        const fetched = await getExchangeRates(allCodes)
        if (!cancelled) {
          setRates(fetched)
        }
      } catch (err) {
        console.error('[useCurrency] Failed to fetch rates:', err)
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchRates()

    // Refresh rates every 5 minutes
    const interval = setInterval(fetchRates, 5 * 60 * 1000)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code)
    localStorage.setItem(STORAGE_KEY, code)
  }, [])

  const convert = useCallback((xlmAmount: number): number => {
    const rate = rates[currency]
    if (!rate) return xlmAmount // fallback: return raw amount
    return convertFromXLM(xlmAmount, rate)
  }, [rates, currency])

  const format = useCallback((xlmAmount: number): string => {
    const converted = convert(xlmAmount)
    return formatCurrency(converted, currency)
  }, [convert, currency])

  const formatConverted = useCallback((xlmAmount: number): string => {
    const rate = rates[currency]
    if (!rate || currency === 'USD') return ''
    const converted = convert(xlmAmount)
    return `~${formatCurrency(converted, currency)}`
  }, [convert, rates, currency])

  return {
    currency,
    setCurrency,
    rates,
    loading,
    convert,
    format,
    formatConverted,
  }
}
