import React, { useState } from 'react'
import Head from 'next/head'
import { Navbar } from '../../components/organisms'
import { EscrowTimeline } from '../../components/organisms/escrow-timeline'
import { FundDealModal } from '../../components/organisms/fund-deal-modal'
import { TrustBadge } from '../../components/atoms'
import { Deal, TrustScore } from '../../shared/types'

const mockDeals: Deal[] = [
  {
    id: 'DL-2024-0860',
    title: 'Wireless Sensor Array — 100 Units',
    buyer: 'GCKV7…A3QM',
    seller: 'GBXNQ…F4PL',
    amount: BigInt(6800_0000000),
    decimals: 7,
    symbol: 'XLM',
    status: 'created',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    steps: [
      { id: 'created', label: 'Deal Created', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), completed: false, current: true },
      { id: 'funds_locked', label: 'Funds Locked', completed: false, current: false },
      { id: 'goods_shipped', label: 'Goods Shipped', completed: false, current: false },
      { id: 'received', label: 'Received', completed: false, current: false },
      { id: 'released', label: 'Released', completed: false, current: false },
    ],
  },
  {
    id: 'DL-2024-0847',
    title: 'Bulk Electronics — 500x Raspberry Pi 5',
    buyer: 'GCKV7…A3QM',
    seller: 'GBXNQ…F4PL',
    amount: BigInt(12500_0000000),
    decimals: 7,
    symbol: 'XLM',
    status: 'goods_shipped',
    txHash: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    steps: [
      { id: 'created', label: 'Deal Created', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), completed: true, current: false },
      { id: 'funds_locked', label: 'Funds Locked', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), completed: true, current: false, txHash: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2' },
      { id: 'goods_shipped', label: 'Goods Shipped', timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), completed: false, current: true },
      { id: 'received', label: 'Received', completed: false, current: false },
      { id: 'released', label: 'Released', completed: false, current: false },
    ],
  },
  {
    id: 'DL-2024-0832',
    title: 'Custom PCB Assembly — Batch #12',
    buyer: 'GDAZJ…8KWN',
    seller: 'GCQUH…2NRL',
    amount: BigInt(8750_0000000),
    decimals: 7,
    symbol: 'XLM',
    status: 'goods_shipped',
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    steps: [
      { id: 'created', label: 'Deal Created', timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), completed: true, current: false },
      { id: 'funds_locked', label: 'Funds Locked', timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), completed: true, current: false },
      { id: 'goods_shipped', label: 'Goods Shipped', timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), completed: false, current: true },
      { id: 'received', label: 'Received', completed: false, current: false },
      { id: 'released', label: 'Released', completed: false, current: false },
    ],
    dispute: {
      raisedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      reason: 'Package arrived damaged — 3 boards cracked on delivery',
      status: 'open',
    },
  },
  {
    id: 'DL-2024-0815',
    title: 'LED Strip Order — 200m Warm White',
    buyer: 'GBHOX…3MVC',
    seller: 'GAXPL…7DWR',
    amount: BigInt(3200_0000000),
    decimals: 7,
    symbol: 'XLM',
    status: 'cancelled',
    deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    steps: [
      { id: 'created', label: 'Deal Created', timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), completed: true, current: false },
      { id: 'funds_locked', label: 'Funds Locked', timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), completed: true, current: false },
      { id: 'goods_shipped', label: 'Goods Shipped', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), completed: false, current: true },
      { id: 'received', label: 'Received', completed: false, current: false },
      { id: 'released', label: 'Released', completed: false, current: false },
    ],
  },
  {
    id: 'DL-2024-0801',
    title: 'Sensor Module Supply — IoT Batch',
    buyer: 'GCMXZ…5PQH',
    seller: 'GDKLR…9BFN',
    amount: BigInt(15000_0000000),
    decimals: 7,
    symbol: 'XLM',
    status: 'received',
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000),
    steps: [
      { id: 'created', label: 'Deal Created', timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), completed: true, current: false },
      { id: 'funds_locked', label: 'Funds Locked', timestamp: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000), completed: true, current: false },
      { id: 'goods_shipped', label: 'Goods Shipped', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), completed: true, current: false },
      { id: 'received', label: 'Received', timestamp: new Date(Date.now() - 30 * 60 * 1000), completed: false, current: true },
      { id: 'released', label: 'Released', completed: false, current: false },
    ],
    milestones: [
      { id: 'ms-1', label: 'Milestone 1 — Prototype delivery', amount: BigInt(5000_0000000), decimals: 7, symbol: 'XLM', completed: true, timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
      { id: 'ms-2', label: 'Milestone 2 — Full batch delivery', amount: BigInt(7000_0000000), decimals: 7, symbol: 'XLM', completed: true, timestamp: new Date(Date.now() - 30 * 60 * 1000) },
      { id: 'ms-3', label: 'Milestone 3 — QA sign-off', amount: BigInt(3000_0000000), decimals: 7, symbol: 'XLM', completed: false },
    ],
  },
]

type TabFilter = 'all' | 'active' | 'disputed' | 'completed'

// Mock trust scores for sellers — in production these come from the
// on-chain trust contract and are fetched per seller address.
const SELLER_TRUST: Record<string, TrustScore> = {
  'GBXNQ…F4PL': { address: 'GBXNQ…F4PL', score: 87, level: 'high', completedDeals: 847, disputedDeals: 12, resolvedInFavor: 9, avgRating: 4.8, accountAgeDays: 420, verificationStatus: 'verified' },
  'GCQUH…2NRL': { address: 'GCQUH…2NRL', score: 62, level: 'medium', completedDeals: 34, disputedDeals: 3, resolvedInFavor: 2, avgRating: 4.2, accountAgeDays: 180, verificationStatus: 'verified' },
  'GAXPL…7DWR': { address: 'GAXPL…7DWR', score: 15, level: 'new', completedDeals: 2, disputedDeals: 0, resolvedInFavor: 0, avgRating: 3.5, accountAgeDays: 14, verificationStatus: 'unverified' },
  'GDKLR…9BFN': { address: 'GDKLR…9BFN', score: 94, level: 'high', completedDeals: 1203, disputedDeals: 8, resolvedInFavor: 7, avgRating: 4.9, accountAgeDays: 680, verificationStatus: 'verified' },
}

export default function DealsPage() {
  const [activeTab, setActiveTab] = useState<TabFilter>('all')
  const [fundDeal, setFundDeal] = useState<Deal | null>(null)

  const filteredDeals = mockDeals.filter((deal) => {
    if (activeTab === 'all') return true
    if (activeTab === 'active') return !['cancelled', 'released'].includes(deal.status) && !deal.dispute
    if (activeTab === 'disputed') return !!deal.dispute
    if (activeTab === 'completed') return deal.status === 'released' || deal.status === 'cancelled'
    return true
  })

  const tabs: { key: TabFilter; label: string; count: number }[] = [
    { key: 'all', label: 'All Deals', count: mockDeals.length },
    { key: 'active', label: 'Active', count: mockDeals.filter((d) => !['cancelled', 'released'].includes(d.status) && !d.dispute).length },
    { key: 'disputed', label: 'Disputed', count: mockDeals.filter((d) => !!d.dispute).length },
    { key: 'completed', label: 'Completed', count: mockDeals.filter((d) => d.status === 'released' || d.status === 'cancelled').length },
  ]

  return (
    <>
      <Head>
        <title>My Deals — SendXpress</title>
        <meta name="description" content="Track your escrow deals and transactions" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />

        <main className="mx-auto max-w-4xl px-4 pb-20 pt-24 sm:px-6">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">My Deals</h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Track the status of your escrow-protected transactions
            </p>
          </div>

          {/* Filter tabs */}
          <div className="mb-8 flex gap-1 overflow-x-auto rounded-xl bg-white p-1 shadow-sm dark:bg-gray-900">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-brand text-white shadow-sm'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-xs ${
                    activeTab === tab.key
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Deal list */}
          <div className="space-y-6">
            {filteredDeals.length === 0 ? (
              <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-gray-900">
                <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">No deals found</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">No deals match this filter.</p>
              </div>
            ) : (
              filteredDeals.map((deal) => {
                const sellerTrust = SELLER_TRUST[deal.seller]
                return (
                  <div key={deal.id}>
                    {sellerTrust && (
                      <div className="mb-2 flex items-center gap-2 pl-1">
                        <span className="text-xs text-gray-400">Seller:</span>
                        <TrustBadge level={sellerTrust.level} verification={sellerTrust.verificationStatus} size="sm" />
                        <span className="text-xs text-gray-500">{sellerTrust.score}/100</span>
                      </div>
                    )}
                    <EscrowTimeline
                      deal={deal}
                      onMarkReceived={() => alert(`Marked ${deal.id} as received`)}
                      onRaiseDispute={() => alert(`Dispute raised for ${deal.id}`)}
                      onReleaseFunds={() => alert(`Funds released for ${deal.id}`)}
                      onFundDeal={() => setFundDeal(deal)}
                    />
                  </div>
                )
              })
            )}
          </div>
        </main>

        {fundDeal && (
          <FundDealModal
            deal={fundDeal}
            isOpen={!!fundDeal}
            onClose={() => setFundDeal(null)}
          />
        )}
      </div>
    </>
  )
}
