import React, { useEffect } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { useModal } from 'connectkit'

export interface EvmWalletConnectProps {
  onConnected?: (address: string) => void
}

export function EvmWalletConnect({ onConnected }: EvmWalletConnectProps) {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { setOpen } = useModal()

  useEffect(() => {
    if (isConnected && address && onConnected) {
      onConnected(address)
    }
  }, [isConnected, address, onConnected])

  if (isConnected && address) {
    const truncated = `${address.slice(0, 6)}…${address.slice(-4)}`
    return (
      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {truncated}
          </span>
        </div>
        <button
          onClick={() => disconnect()}
          className="text-xs font-medium text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setOpen(true)}
      className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
    >
      Connect EVM Wallet
    </button>
  )
}
