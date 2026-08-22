import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Navbar } from '../components/organisms'
import { useCurrencyContext } from '../hooks/CurrencyContext'

/* ── Data ─────────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: '🌍',
    title: 'Global Supplier Discovery',
    desc: 'Browse verified suppliers across 120+ countries through a curated social feed — filterable by product, country, and MOQ.',
  },
  {
    icon: '💬',
    title: 'In-App Negotiation',
    desc: 'Message suppliers directly, share specs, and agree on price, quantity, and shipping terms without leaving the platform.',
  },
  {
    icon: '🔒',
    title: 'Stellar Escrow Protection',
    desc: 'Funds are locked in a Soroban smart contract and only released when you confirm delivery. Zero counterparty risk.',
  },
  {
    icon: '📦',
    title: 'Shipment Tracking',
    desc: 'End-to-end visibility from warehouse to doorstep. Live status updates tied to your order on-chain.',
  },
  {
    icon: '⭐',
    title: 'On-Chain Trust Scores',
    desc: 'Every supplier and importer has a verifiable reputation score built from completed trades on the Stellar network.',
  },
  {
    icon: '⚡',
    title: 'Instant Settlement',
    desc: 'Payments settle on Stellar in under 5 seconds. No wire delays, no SWIFT fees, no FX markup.',
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Connect Your Wallet',
    desc: 'Install Freighter and link your Stellar wallet in seconds. No email sign-up required.',
  },
  {
    n: '02',
    title: 'Find a Supplier',
    desc: 'Browse the feed, review profiles and past trade history, then send a deal proposal.',
  },
  {
    n: '03',
    title: 'Lock Funds in Escrow',
    desc: 'Sign the escrow transaction. Your payment is held on-chain until you confirm receipt.',
  },
  {
    n: '04',
    title: 'Receive & Release',
    desc: 'Goods arrive, you confirm. The supplier is paid instantly. Rate the trade and build your reputation.',
  },
]

const TESTIMONIALS = [
  {
    name: 'Amara T.',
    role: 'Importer · Lagos, Nigeria',
    text: 'SendXpress removed all the anxiety from cross-border importing. The escrow held my funds safely until the goods arrived. I will never go back to bank transfers.',
    trades: '47 completed trades',
  },
  {
    name: 'Wei L.',
    role: 'Supplier · Shenzhen, China',
    text: 'I get paid in XLM the moment my buyer confirms delivery. Settlement that used to take 10 business days now takes 10 seconds. Game-changing.',
    trades: '213 completed trades',
  },
  {
    name: 'Fatou D.',
    role: 'Importer · Dakar, Senegal',
    text: 'Found a fabric supplier, negotiated price in the chat, and had the deal closed in one afternoon. The whole process was seamless.',
    trades: '31 completed trades',
  },
]

const TICKS = [
  { f: '🇳🇬 Lagos',        t: 'Fabric — 2,400 yards',  xlm: 890, status: 'Escrow released' },
  { f: '🇨🇳 Shenzhen',     t: 'Electronics — 500 units',xlm: 4200, status: 'In transit' },
  { f: '🇮🇳 Mumbai',       t: 'Textiles — 1,000 m',    xlm: 620, status: 'Delivered' },
  { f: '🇧🇷 São Paulo',    t: 'Coffee — 200 kg',        xlm: 310, status: 'Escrow released' },
  { f: '🇩🇪 Hamburg',      t: 'Machinery parts',        xlm: 7800, status: 'In transit' },
  { f: '🇵🇭 Manila',       t: 'Furniture — 12 sets',   xlm: 1100, status: 'Delivered' },
]

/* ── Ticker ────────────────────────────────────────────────────── */
function TradeTicker() {
  const { formatConverted } = useCurrencyContext()
  const items = [...TICKS, ...TICKS]
  return (
    <div className="relative overflow-hidden py-3 border-y border-zinc-100 bg-zinc-50">
      <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-zinc-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-zinc-50 to-transparent z-10 pointer-events-none" />
      <div className="marquee-track">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5 px-6 shrink-0">
            <div className="pulse-dot shrink-0" />
            <span className="text-xs font-medium text-zinc-700">{item.f}</span>
            <span className="text-xs text-zinc-400">·</span>
            <span className="text-xs text-zinc-500">{item.t}</span>
            <span className="text-xs font-semibold text-zinc-800">
              {item.xlm.toLocaleString()} XLM
              {formatConverted(item.xlm) && <span className="text-zinc-400 ml-1">({formatConverted(item.xlm)})</span>}
            </span>
            <span className="text-xs text-emerald-600 font-medium">{item.status}</span>
            <span className="text-zinc-200 mx-2">|</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Page ──────────────────────────────────────────────────────── */
const Home: NextPage = () => {
  const { formatConverted } = useCurrencyContext()
  return (
    <>
      <Head>
        <title>SendXpress — Cross-Border Trade on Stellar</title>
        <meta name="description" content="SendXpress connects importers with verified global suppliers. Negotiate in real-time and pay safely through Soroban smart contract escrow on Stellar." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-white text-zinc-900 overflow-x-hidden">
        <Navbar />

        {/* ── HERO ──────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-14 sm:pb-16">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Left */}
            <div className="flex-1 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-7">
                <div className="pulse-dot" />
                <span className="text-xs font-medium text-emerald-700">Live on Stellar Soroban</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-zinc-900 mb-5">
                Trade globally.<br />
                <span className="text-emerald-600">Pay trustlessly.</span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-500 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                SendXpress connects importers with verified suppliers worldwide. Negotiate in real-time,
                then pay through Soroban escrow — funds released only on delivery.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link href="/marketplace"
                  className="px-6 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors min-h-[44px] flex items-center justify-center">
                  Browse Suppliers →
                </Link>
                <Link href="/sell"
                  className="px-6 py-3 text-sm font-semibold text-zinc-700 bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-zinc-300 rounded-lg transition-colors min-h-[44px] flex items-center justify-center">
                  List Your Products
                </Link>
              </div>

              {/* Trust chips */}
              <div className="flex flex-wrap items-center gap-2 mt-8 justify-center lg:justify-start">
                {['⚡ Stellar Network','🔷 Soroban Contracts','🔐 Freighter Wallet','🌍 120+ Countries'].map(t => (
                  <span key={t} className="text-xs text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-md px-2.5 py-1">{t}</span>
                ))}
              </div>
            </div>

            {/* Right — trade card mockup */}
            <div className="flex-shrink-0 w-full max-w-sm mx-auto">
              <div className="rounded-xl border border-zinc-200 bg-white shadow-lg overflow-hidden">
                <div className="h-1 bg-emerald-600" />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="pulse-dot" />
                      <span className="text-xs font-semibold text-emerald-700 tracking-wide uppercase">Active Trade</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 bg-zinc-50 border border-zinc-200 px-2 py-0.5 rounded">ESCROW LOCKED</span>
                  </div>

                  <div className="flex items-center gap-3 mb-5 pb-5 border-b border-zinc-100">
                    <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center text-xl shrink-0">🇨🇳</div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-zinc-900">ShenTex Manufacturing</div>
                      <div className="text-xs text-zinc-400 mt-0.5">Shenzhen, China · ⭐ 4.9 · 847 trades</div>
                    </div>
                  </div>

                  <div className="space-y-2.5 mb-5">
                    {[
                      { l: 'Product',  v: 'Cotton Fabric — 2,400 yards' },
                      { l: 'Amount',   v: `3,200 XLM${formatConverted(3200) ? ` (${formatConverted(3200)})` : ''}` },
                      { l: 'Shipping', v: 'DHL Express · 7–10 days' },
                      { l: 'Status',   v: 'In transit' },
                    ].map(({ l, v }) => (
                      <div key={l} className="flex items-center justify-between">
                        <span className="text-xs text-zinc-400">{l}</span>
                        <span className="text-xs font-medium text-zinc-800">{v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                    <span className="text-emerald-600 text-sm">🔒</span>
                    <div>
                      <div className="text-xs font-semibold text-emerald-700">Funds secured in escrow</div>
                      <div className="text-[11px] text-emerald-600 mt-0.5">Released automatically on delivery confirmation</div>
                    </div>
                  </div>

                  <button className="mt-4 w-full py-2.5 rounded-lg border border-zinc-200 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
                    Track Shipment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TICKER ──────────────────────────────────────────────── */}
        <TradeTicker />

        {/* ── STATS ────────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { n: '120+',  l: 'Countries',      sub: 'active suppliers' },
              { n: '8K+',   l: 'Verified Suppliers', sub: 'across all categories' },
              { n: '$0',    l: 'Escrow Fees',    sub: 'always free' },
              { n: '100%',  l: 'On-Chain',       sub: 'transparent trades' },
            ].map(s => (
              <div key={s.l} className="rounded-xl border border-zinc-100 bg-zinc-50 px-5 py-5 text-center">
                <div className="text-2xl sm:text-3xl font-black text-zinc-900 mb-1">{s.n}</div>
                <div className="text-sm font-semibold text-zinc-700">{s.l}</div>
                <div className="text-xs text-zinc-400 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ─────────────────────────────────────────────── */}
        <section id="features" className="border-t border-zinc-100 bg-zinc-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
            <p className="text-xs font-semibold text-emerald-600 tracking-widest uppercase mb-3">Platform</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-2">
              Built for serious cross-border trade.
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base mb-10 max-w-lg">
              Every feature designed to remove friction and risk from international commerce.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.map(f => (
                <div key={f.title} className="rounded-xl border border-zinc-200 bg-white p-5 sm:p-6 hover:border-emerald-200 hover:shadow-sm transition-all">
                  <span className="text-2xl mb-3 block">{f.icon}</span>
                  <h3 className="font-semibold text-zinc-900 mb-1.5 text-sm sm:text-base">{f.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
        <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <p className="text-xs font-semibold text-emerald-600 tracking-widest uppercase mb-3">Process</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-10">
            Complete a trade in four steps.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            {/* Connector */}
            <div className="hidden lg:block absolute top-5 left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px bg-zinc-200" />

            {STEPS.map(s => (
              <div key={s.n} className="flex flex-row lg:flex-col gap-4 lg:gap-0">
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-xl border border-zinc-200 bg-white flex items-center justify-center lg:mb-5 relative z-10 shadow-sm">
                    <span className="text-xs font-black text-emerald-600">{s.n}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 mb-1.5 text-sm">{s.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
        <section className="border-t border-zinc-100 bg-zinc-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
            <p className="text-xs font-semibold text-emerald-600 tracking-widest uppercase mb-3">Testimonials</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-10">
              Trusted by importers and suppliers worldwide.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {TESTIMONIALS.map(t => (
                <div key={t.name} className="rounded-xl border border-zinc-200 bg-white p-5 sm:p-6">
                  <p className="text-sm text-zinc-600 leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-sm font-bold text-emerald-700 shrink-0">
                        {t.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-zinc-900">{t.name}</div>
                        <div className="text-xs text-zinc-400">{t.role}</div>
                      </div>
                    </div>
                    <span className="text-xs text-emerald-600 font-medium shrink-0 ml-2">{t.trades}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SUPPLIER CTA ─────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-zinc-900 mb-2">Are you a supplier?</h3>
              <p className="text-sm text-zinc-500 max-w-md leading-relaxed">
                List your products and reach importers worldwide. Receive payments in XLM instantly on delivery — no bank, no delays.
              </p>
            </div>
            <Link href="/sell"
              className="shrink-0 px-6 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors min-h-[44px] flex items-center justify-center whitespace-nowrap">
              Start Selling →
            </Link>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────────── */}
        <section className="border-t border-zinc-100 bg-zinc-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-zinc-900 mb-3">
              Ready to trade globally?
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
              Connect your Stellar wallet and find your first verified supplier in minutes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/marketplace"
                className="px-8 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors min-h-[44px] flex items-center justify-center">
                Browse Suppliers →
              </Link>
              <a href="https://github.com/SendXpress/frontend" target="_blank" rel="noopener noreferrer"
                className="px-8 py-3 text-sm font-semibold text-zinc-600 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-lg transition-colors min-h-[44px] flex items-center justify-center">
                View on GitHub
              </a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────── */}
        <footer className="border-t border-zinc-200 bg-white px-4 sm:px-6 py-10">
          <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-emerald-600 flex items-center justify-center">
                  <span className="text-[11px] font-black text-white">S</span>
                </div>
                <span className="text-sm font-bold text-zinc-900">SendXpress</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-[200px]">
                Cross-border social commerce secured by Stellar &amp; Soroban smart contracts.
              </p>
            </div>

            {[
              { t: 'Platform',   ls:[['Marketplace','/marketplace'],['Dashboard','/dashboard'],['Messages','/messages']] },
              { t: 'Developers', ls:[['GitHub','https://github.com/SendXpress'],['Smart Contracts','https://github.com/SendXpress/smartcontract'],['Backend API','https://github.com/SendXpress/backend']] },
              { t: 'Company',    ls:[['About','/about'],['For Suppliers','/sell'],['Issues','https://github.com/SendXpress/frontend/issues']] },
            ].map(col => (
              <div key={col.t}>
                <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-3">{col.t}</p>
                <ul className="space-y-2">
                  {col.ls.map(([l, h]) => (
                    <li key={l}>
                      <a
                        href={h}
                        target={h.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-center">
            <p className="text-xs text-zinc-400">© 2026 SendXpress. MIT License.</p>
            <p className="text-xs text-zinc-400">Powered by Stellar &amp; Soroban</p>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Home
