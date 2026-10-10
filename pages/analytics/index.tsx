import React from 'react';
import Head from 'next/head';
import { Navbar, DealAnalyticsDashboard } from '../../components/organisms';

export default function AnalyticsPage() {
  return (
    <>
      <Head>
        <title>Seller Deal Analytics | SendXpress</title>
        <meta
          name="description"
          content="Comprehensive deal performance overview, revenue metrics, regional distribution, and dispute tracking for SendXpress sellers."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-zinc-50 flex flex-col">
        <Navbar />

        <main className="flex-1">
          <DealAnalyticsDashboard />
        </main>

        <footer className="border-t border-zinc-200 bg-white py-6 mt-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <p>© {new Date().getFullYear()} SendXpress. Trustless B2B escrow and settlement.</p>
            <div className="flex gap-4">
              <span>Stellar Soroban Escrow</span>
              <span>•</span>
              <span>CCTP Cross-Chain</span>
              <span>•</span>
              <span>Automated Disputes</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
