import React, { createContext, useContext } from 'react'
import { useCurrency } from './useCurrency'
import type { CurrencyCode } from '../shared/currencies'

interface CurrencyContextValue {
  currency: CurrencyCode
  setCurrency: (code: CurrencyCode) => void
  rates: Record<string, number>
  loading: boolean
  convert: (xlmAmount: number) => number
  format: (xlmAmount: number) => string
  formatConverted: (xlmAmount: number) => string
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const currencyData = useCurrency()

  return (
    <CurrencyContext.Provider value={currencyData}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrencyContext(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext)
  if (!ctx) {
    throw new Error('useCurrencyContext must be used within a CurrencyProvider')
  }
  return ctx
}
