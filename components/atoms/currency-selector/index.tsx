import { useState, useRef, useEffect } from 'react'
import { useCurrencyContext } from '../../../hooks/CurrencyContext'
import { SUPPORTED_CURRENCIES, type CurrencyCode } from '../../../shared/currencies'

export function CurrencySelector() {
  const { currency, setCurrency, loading } = useCurrencyContext()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = SUPPORTED_CURRENCIES[currency]

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
        aria-label="Select currency"
        title={`${current.name} — click to change`}
      >
        <span className="text-base">{current.flag}</span>
        <span className="font-medium">{currency}</span>
        {loading && (
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" title="Fetching rates" />
        )}
        <svg
          className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">
          {(Object.keys(SUPPORTED_CURRENCIES) as CurrencyCode[]).map((code) => {
            const c = SUPPORTED_CURRENCIES[code]
            const isSelected = code === currency

            return (
              <button
                key={code}
                onClick={() => {
                  setCurrency(code)
                  setOpen(false)
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  isSelected ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-base">{c.flag}</span>
                <span className="font-medium">{c.code}</span>
                <span className="text-gray-400 dark:text-gray-500 text-xs ml-auto">{c.symbol}</span>
                {isSelected && (
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
