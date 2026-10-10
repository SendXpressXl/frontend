import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export type Timeframe = 'daily' | 'weekly' | 'monthly';

interface RevenueDataPoint {
  label: string;
  revenue: number;
  deals: number;
}

interface ProductPerformance {
  id: string;
  title: string;
  category: string;
  dealsCount: number;
  revenueXlm: number;
  avgCompletionDays: number;
  disputeRatePct: number;
}

interface BuyerRegion {
  region: string;
  code: string;
  buyerCount: number;
  volumeXlm: number;
  percentage: number;
}

interface DisputeMetric {
  reason: string;
  count: number;
  percentage: number;
}

const mockRevenueSeries: Record<Timeframe, RevenueDataPoint[]> = {
  daily: [
    { label: 'Mon', revenue: 14200, deals: 4 },
    { label: 'Tue', revenue: 21800, deals: 6 },
    { label: 'Wed', revenue: 18500, deals: 5 },
    { label: 'Thu', revenue: 32400, deals: 9 },
    { label: 'Fri', revenue: 41200, deals: 11 },
    { label: 'Sat', revenue: 28900, deals: 7 },
    { label: 'Sun', revenue: 25600, deals: 6 },
  ],
  weekly: [
    { label: 'Week 1', revenue: 84500, deals: 26 },
    { label: 'Week 2', revenue: 112000, deals: 34 },
    { label: 'Week 3', revenue: 98400, deals: 29 },
    { label: 'Week 4', revenue: 136200, deals: 42 },
  ],
  monthly: [
    { label: 'May', revenue: 310000, deals: 94 },
    { label: 'Jun', revenue: 385000, deals: 118 },
    { label: 'Jul', revenue: 420000, deals: 130 },
    { label: 'Aug', revenue: 490000, deals: 152 },
    { label: 'Sep', revenue: 535000, deals: 165 },
    { label: 'Oct (MTD)', revenue: 268000, deals: 82 },
  ],
};

const mockTopProducts: ProductPerformance[] = [
  {
    id: 'PRD-01',
    title: 'Bulk Electronics — Raspberry Pi 5 (500x)',
    category: 'Hardware / Compute',
    dealsCount: 48,
    revenueXlm: 600000,
    avgCompletionDays: 2.8,
    disputeRatePct: 2.1,
  },
  {
    id: 'PRD-02',
    title: 'Wireless Sensor Array — 100 Units',
    category: 'IoT / Sensors',
    dealsCount: 36,
    revenueXlm: 244800,
    avgCompletionDays: 3.2,
    disputeRatePct: 0.0,
  },
  {
    id: 'PRD-03',
    title: 'Custom PCB Assembly — Batch #12',
    category: 'Manufacturing',
    dealsCount: 24,
    revenueXlm: 210000,
    avgCompletionDays: 4.5,
    disputeRatePct: 4.2,
  },
  {
    id: 'PRD-04',
    title: 'Precision Microcontrollers STM32 (1000x)',
    category: 'Components',
    dealsCount: 19,
    revenueXlm: 152000,
    avgCompletionDays: 2.1,
    disputeRatePct: 0.0,
  },
  {
    id: 'PRD-05',
    title: 'Industrial Power Supply Units 24V/10A',
    category: 'Power Equipment',
    dealsCount: 15,
    revenueXlm: 112500,
    avgCompletionDays: 3.0,
    disputeRatePct: 6.7,
  },
];

const mockBuyerRegions: BuyerRegion[] = [
  { region: 'North America', code: 'NA', buyerCount: 78, volumeXlm: 540000, percentage: 41 },
  { region: 'Europe (EU/EEA)', code: 'EU', buyerCount: 52, volumeXlm: 395000, percentage: 30 },
  { region: 'Asia Pacific', code: 'APAC', buyerCount: 34, volumeXlm: 224000, percentage: 17 },
  { region: 'Latin America', code: 'LATAM', buyerCount: 16, volumeXlm: 105000, percentage: 8 },
  { region: 'Middle East & Africa', code: 'MEA', buyerCount: 9, volumeXlm: 55300, percentage: 4 },
];

const mockDisputeReasons: DisputeMetric[] = [
  { reason: 'Carrier Transit Delay', count: 5, percentage: 45 },
  { reason: 'Packaging / Cosmetic Damage', count: 3, percentage: 27 },
  { reason: 'Specification Clarification', count: 2, percentage: 18 },
  { reason: 'Customs Clearance Query', count: 1, percentage: 10 },
];

export function DealAnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState<Timeframe>('daily');
  const [hoveredPoint, setHoveredPoint] = useState<RevenueDataPoint | null>(null);

  const series = mockRevenueSeries[timeframe];

  const totalRevenue = useMemo(() => {
    return series.reduce((acc, p) => acc + p.revenue, 0);
  }, [series]);

  const totalDeals = useMemo(() => {
    return series.reduce((acc, p) => acc + p.deals, 0);
  }, [series]);

  const avgDealSize = totalDeals > 0 ? Math.round(totalRevenue / totalDeals) : 0;

  // Chart coordinate calculations
  const maxRevenue = Math.max(...series.map((p) => p.revenue), 1);
  const chartHeight = 220;
  const chartWidth = 640;
  const paddingX = 40;
  const paddingY = 24;

  const points = series.map((p, index) => {
    const x = paddingX + (index / (series.length - 1)) * (chartWidth - paddingX * 2);
    const y = chartHeight - paddingY - (p.revenue / maxRevenue) * (chartHeight - paddingY * 2);
    return { ...p, x, y };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const areaD = points.length > 0
    ? `${pathD} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`
    : '';

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Seller Deal Analytics</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              Live Metrics
            </span>
          </div>
          <p className="text-sm text-zinc-500 mt-1">
            Real-time performance overview, sales volume, dispute resolutions, and buyer demographics.
          </p>
        </div>

        {/* Timeframe selector */}
        <div className="inline-flex rounded-lg bg-zinc-100 p-1 border border-zinc-200">
          {(['daily', 'weekly', 'monthly'] as Timeframe[]).map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all capitalize ${
                timeframe === tf
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue */}
        <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs hover:border-zinc-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Total Revenue</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">+14.2%</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-zinc-900">
              {totalRevenue.toLocaleString()}
            </span>
            <span className="text-xs font-medium text-zinc-500">XLM</span>
          </div>
          <p className="mt-1 text-xs text-zinc-500">
            ≈ ${(totalRevenue * 0.12).toLocaleString(undefined, { maximumFractionDigits: 0 })} USD equivalent
          </p>
        </div>

        {/* Total Deals */}
        <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs hover:border-zinc-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Deals Handled</span>
            <span className="text-xs font-semibold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded">98.2% completed</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-zinc-900">{totalDeals}</span>
            <span className="text-xs text-emerald-600 font-medium">141 completed</span>
          </div>
          <p className="mt-1 text-xs text-zinc-500">3 active escrow / 2 cancelled</p>
        </div>

        {/* Avg Deal Size */}
        <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs hover:border-zinc-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Avg Deal Size</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">+6.8%</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-zinc-900">{avgDealSize.toLocaleString()}</span>
            <span className="text-xs font-medium text-zinc-500">XLM</span>
          </div>
          <p className="mt-1 text-xs text-zinc-500">Consistently healthy basket value</p>
        </div>

        {/* Completion Time & Dispute */}
        <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-xs hover:border-zinc-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Avg Settlement</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Fast</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-zinc-900">2.6</span>
            <span className="text-xs font-medium text-zinc-500">days</span>
          </div>
          <p className="mt-1 text-xs text-zinc-500">Dispute rate strictly 1.8% (all resolved)</p>
        </div>
      </div>

      {/* Main Revenue Chart & Deal Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive SVG Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-zinc-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-zinc-900">Revenue & Deal Volume Over Time</h2>
              <p className="text-xs text-zinc-500">Showing {timeframe} trends across locked and released escrows</p>
            </div>
            {hoveredPoint && (
              <div className="text-right">
                <span className="text-xs text-zinc-400 block">{hoveredPoint.label}</span>
                <span className="text-sm font-bold text-emerald-600">
                  {hoveredPoint.revenue.toLocaleString()} XLM ({hoveredPoint.deals} deals)
                </span>
              </div>
            )}
          </div>

          <div className="relative w-full overflow-hidden">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-56 stroke-zinc-200"
            >
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1={paddingX} y1={paddingY} x2={chartWidth - paddingX} y2={paddingY} strokeDasharray="3 3" />
              <line
                x1={paddingX}
                y1={chartHeight / 2}
                x2={chartWidth - paddingX}
                y2={chartHeight / 2}
                strokeDasharray="3 3"
              />
              <line
                x1={paddingX}
                y1={chartHeight - paddingY}
                x2={chartWidth - paddingX}
                y2={chartHeight - paddingY}
                stroke="#e4e4e7"
                strokeWidth="1.5"
              />

              {/* Gradient Area Fill */}
              {areaD && <path d={areaD} fill="url(#revenueGradient)" stroke="none" />}

              {/* Line */}
              {pathD && <path d={pathD} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}

              {/* Data points */}
              {points.map((pt) => (
                <g key={pt.label}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredPoint?.label === pt.label ? '6' : '4'}
                    className="fill-emerald-600 stroke-white stroke-2 cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredPoint(pt)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  <text
                    x={pt.x}
                    y={chartHeight - 6}
                    textAnchor="middle"
                    className="text-[10px] fill-zinc-400 font-medium select-none"
                  >
                    {pt.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Deal Status Distribution Card */}
        <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-zinc-900 mb-1">Deal Funnel & Status</h2>
            <p className="text-xs text-zinc-500 mb-4">Lifecycle breakdown across all historical orders</p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-medium text-zinc-700 mb-1">
                  <span>Completed & Released</span>
                  <span className="font-semibold text-emerald-700">141 (94.0%)</span>
                </div>
                <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '94%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-zinc-700 mb-1">
                  <span>In Escrow / Transit</span>
                  <span className="font-semibold text-blue-700">6 (4.0%)</span>
                </div>
                <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '4%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-zinc-700 mb-1">
                  <span>Disputes Resolved</span>
                  <span className="font-semibold text-amber-700">2 (1.3%)</span>
                </div>
                <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '1.3%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-zinc-700 mb-1">
                  <span>Cancelled Prior to Funding</span>
                  <span className="font-semibold text-zinc-500">1 (0.7%)</span>
                </div>
                <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-zinc-400 h-full rounded-full" style={{ width: '0.7%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
            <span className="text-zinc-500">Need deal details?</span>
            <Link href="/deals" className="text-emerald-600 font-semibold hover:underline">
              View All Deals →
            </Link>
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-xs">
        <div className="p-6 border-b border-zinc-100">
          <h2 className="text-base font-bold text-zinc-900">Top Performing Listings</h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Listings generating the highest deal volume and cumulative escrow settlements
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                <th className="py-3 px-6">Product / Listing</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Deals</th>
                <th className="py-3 px-4 text-right">Total Revenue</th>
                <th className="py-3 px-4 text-center">Avg Time</th>
                <th className="py-3 px-4 text-center">Dispute Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-xs">
              {mockTopProducts.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-50/70 transition-colors">
                  <td className="py-3.5 px-6 font-semibold text-zinc-900">
                    {p.title}
                    <span className="block text-[11px] font-mono text-zinc-400 mt-0.5">{p.id}</span>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-600">{p.category}</td>
                  <td className="py-3.5 px-4 text-center font-bold text-zinc-900">{p.dealsCount}</td>
                  <td className="py-3.5 px-4 text-right font-extrabold text-emerald-700">
                    {p.revenueXlm.toLocaleString()} XLM
                  </td>
                  <td className="py-3.5 px-4 text-center text-zinc-600">{p.avgCompletionDays}d</td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                        p.disputeRatePct === 0
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {p.disputeRatePct.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Buyer Regions & Dispute Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Buyer Regions */}
        <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-zinc-900">Buyer Geographic Distribution</h2>
              <p className="text-xs text-zinc-500">Regional demand for targeted inventory and shipping setup</p>
            </div>
            <span className="text-xs font-semibold text-zinc-500 bg-zinc-100 px-2 py-1 rounded">5 Regions</span>
          </div>

          <div className="space-y-3.5">
            {mockBuyerRegions.map((region) => (
              <div key={region.code} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-zinc-800">{region.region}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-500 font-mono text-[11px]">{region.buyerCount} buyers</span>
                    <span className="font-semibold text-zinc-900">{region.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all"
                    style={{ width: `${region.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dispute Summary */}
        <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-zinc-900">Dispute Summary & Root Causes</h2>
              <p className="text-xs text-zinc-500">100% of reported escrow mediation issues resolved</p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
              98.2% Clean Escrow
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-zinc-50 rounded-lg p-3 border border-zinc-100 text-center">
              <span className="text-xs text-zinc-500 block">Total Claims</span>
              <span className="text-lg font-bold text-zinc-900">11</span>
            </div>
            <div className="bg-emerald-50/60 rounded-lg p-3 border border-emerald-100 text-center">
              <span className="text-xs text-emerald-800 block">Resolution Rate</span>
              <span className="text-lg font-bold text-emerald-700">100%</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Top Reported Inquiries</h3>
            {mockDisputeReasons.map((reason) => (
              <div key={reason.reason} className="flex items-center justify-between text-xs py-1 border-b border-zinc-100 last:border-none">
                <span className="text-zinc-700 font-medium">{reason.reason}</span>
                <span className="text-zinc-500 font-mono text-[11px]">
                  {reason.count} cases ({reason.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
