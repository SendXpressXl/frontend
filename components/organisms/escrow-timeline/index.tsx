import React, { FunctionComponent } from 'react'
import { Deal, DealStep, DisputeInfo } from '../../../shared/types'
import { Utils } from '../../../shared/utils'
import { useCurrencyContext } from '../../../hooks/CurrencyContext'
import moment from 'moment'

interface EscrowTimelineProps {
  deal: Deal
  onMarkReceived?: () => void
  onRaiseDispute?: () => void
  onReleaseFunds?: () => void
}

function StatusIcon({ step, isLast }: { step: DealStep; isLast: boolean }) {
  if (step.completed) {
    return (
      <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30">
        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    )
  }

  if (step.current) {
    return (
      <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-brand shadow-lg shadow-brand/40 animate-pulse-glow">
        <div className="h-2.5 w-2.5 rounded-full bg-white" />
      </div>
    )
  }

  return (
    <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800">
      <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600" />
    </div>
  )
}

function Connector({ completed }: { completed: boolean }) {
  return (
    <div className="ml-4 w-0.5 flex-1 md:mx-0 md:my-0 md:h-0.5 md:w-full">
      <div
        className={`h-full w-full transition-colors duration-500 ${
          completed ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-700'
        }`}
      />
    </div>
  )
}

function DisputeBranch({ dispute }: { dispute: DisputeInfo }) {
  const statusColors = {
    open: 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-400',
    under_review: 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/30 dark:text-amber-400',
    resolved: 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-400',
  }

  const statusLabels = {
    open: 'Open',
    under_review: 'Under Review',
    resolved: 'Resolved',
  }

  return (
    <div className="ml-12 mt-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800/50 dark:bg-red-950/20 md:ml-12">
      <div className="mb-2 flex items-center gap-2">
        <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm font-semibold text-red-700 dark:text-red-400">Dispute Raised</span>
        <span className={`ml-auto rounded-full border px-2 py-0.5 text-xs font-medium ${statusColors[dispute.status]}`}>
          {statusLabels[dispute.status]}
        </span>
      </div>
      <p className="text-sm text-red-600/80 dark:text-red-400/70">{dispute.reason}</p>
      <div className="mt-2 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
        <span>Raised {moment(dispute.raisedAt).fromNow()}</span>
        {dispute.resolvedAt && <span>Resolved {moment(dispute.resolvedAt).fromNow()}</span>}
      </div>
    </div>
  )
}

function InstallmentProgress({ milestones }: { milestones: Deal['milestones'] }) {
  if (!milestones || milestones.length === 0) return null

  const completed = milestones.filter((m) => m.completed).length
  const total = milestones.length

  return (
    <div className="ml-12 mt-3 rounded-xl border border-brand/20 bg-brand-light/50 p-4 dark:border-brand/30 dark:bg-brand/10 md:ml-12">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Installment Progress</span>
        <span className="text-xs font-medium text-brand">{completed}/{total} milestones</span>
      </div>
      <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand to-emerald-500 transition-all duration-700"
          style={{ width: `${(completed / total) * 100}%` }}
        />
      </div>
      <div className="space-y-2">
        {milestones.map((m) => (
          <div key={m.id} className="flex items-center gap-2">
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full ${
                m.completed
                  ? 'bg-emerald-500'
                  : 'border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800'
              }`}
            >
              {m.completed && (
                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className={`text-sm ${m.completed ? 'text-gray-500 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
              {m.label}
            </span>
            <span className="ml-auto text-xs text-gray-400">
              {Number(m.amount) / 10 ** m.decimals} {m.symbol}
              {formatConverted(Number(m.amount) / 10 ** m.decimals) && (
                <span className="block text-[10px]">{formatConverted(Number(m.amount) / 10 ** m.decimals)}</span>
              )}
            </span>
            {m.timestamp && (
              <span className="text-xs text-gray-400">{moment(m.timestamp).format('MMM D, h:mm A')}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function TxHashLink({ hash }: { hash?: string }) {
  if (!hash) return null
  const shortHash = `${hash.slice(0, 6)}...${hash.slice(-4)}`
  return (
    <a
      href={`https://stellar.expert/explorer/testnet/tx/${hash}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs text-brand hover:text-brand-dark hover:underline"
    >
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
      {shortHash}
    </a>
  )
}

const EscrowTimeline: FunctionComponent<EscrowTimelineProps> = ({
  deal,
  onMarkReceived,
  onRaiseDispute,
  onReleaseFunds,
}) => {
  const { formatConverted } = useCurrencyContext()
  const isCancelled = deal.status === 'cancelled'
  const currentStepIndex = deal.steps.findIndex((s) => s.current)
  const cancelledStep = isCancelled ? deal.steps.find((s) => !s.completed && !s.current) : null

  const getActionButton = (step: DealStep) => {
    if (!step.current) return null

    switch (step.id) {
      case 'goods_shipped':
        return (
          <button
            onClick={onMarkReceived}
            className="mt-3 w-full rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-500/20 transition-all hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 active:scale-[0.98]"
          >
            Mark as Received
          </button>
        )
      case 'received':
        return (
          <button
            onClick={onReleaseFunds}
            className="mt-3 w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/30 active:scale-[0.98]"
          >
            Release Funds
          </button>
        )
      default:
        return null
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{deal.title}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Deal #{deal.id} &middot; {deal.buyer} &harr; {deal.seller}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-50 px-3 py-1.5 dark:bg-emerald-900/20">
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {Number(deal.amount) / 10 ** deal.decimals} {deal.symbol}
            </span>
            {formatConverted(Number(deal.amount) / 10 ** deal.decimals) && (
              <span className="block text-[10px] text-emerald-500 dark:text-emerald-500 mt-0.5">
                {formatConverted(Number(deal.amount) / 10 ** deal.decimals)}
              </span>
            )}
          </div>
          {deal.txHash && <TxHashLink hash={deal.txHash} />}
        </div>
      </div>

      {/* Estimated time remaining */}
      {deal.deadline && !isCancelled && (
        <div className="mb-6 flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-800/50">
          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {Utils.getRemainingTime(deal.deadline)}
          </span>
        </div>
      )}

      {/* Cancelled banner */}
      {isCancelled && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 dark:border-red-800/50 dark:bg-red-950/20">
          <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="text-sm font-medium text-red-700 dark:text-red-400">
            Deal cancelled
            {cancelledStep?.timestamp && ` on ${moment(cancelledStep.timestamp).format('MMM D, YYYY [at] h:mm A')}`}
          </span>
        </div>
      )}

      {/* Timeline */}
      <div className="relative">
        {/* Desktop: horizontal layout */}
        <div className="hidden md:block">
          <div className="flex items-start">
            {deal.steps.map((step, index) => {
              const isLast = index === deal.steps.length - 1
              return (
                <div key={step.id} className={`flex flex-1 flex-col items-center ${!isLast ? '' : ''}`}>
                  <StatusIcon step={step} isLast={isLast} />
                  <div className="mt-3 text-center">
                    <p
                      className={`text-sm font-semibold ${
                        step.current
                          ? 'text-brand'
                          : step.completed
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : isCancelled && !step.completed
                          ? 'text-red-400'
                          : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </p>
                    {step.timestamp && (
                      <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                        {moment(step.timestamp).format('MMM D, h:mm A')}
                      </p>
                    )}
                    {step.txHash && (
                      <div className="mt-1">
                        <TxHashLink hash={step.txHash} />
                      </div>
                    )}
                    {isCancelled && step.current && (
                      <div className="mt-2 h-2 w-2 animate-pulse rounded-full bg-red-500 mx-auto" />
                    )}
                    <div className="mt-2">{getActionButton(step)}</div>
                  </div>
                  {!isLast && (
                    <div className="mx-2 mt-4 h-0.5 w-full flex-1">
                      <div
                        className={`h-full transition-colors duration-500 ${
                          step.completed ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile: vertical layout */}
        <div className="md:hidden">
          {deal.steps.map((step, index) => {
            const isLast = index === deal.steps.length - 1
            return (
              <div key={step.id} className="relative flex gap-4">
                <div className="flex flex-col items-center">
                  <StatusIcon step={step} isLast={isLast} />
                  {!isLast && <Connector completed={step.completed} />}
                </div>
                <div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
                  <p
                    className={`text-sm font-semibold ${
                      step.current
                        ? 'text-brand'
                        : step.completed
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : isCancelled && !step.completed
                        ? 'text-red-400'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.timestamp && (
                    <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                      {moment(step.timestamp).format('MMM D, YYYY [at] h:mm A')}
                    </p>
                  )}
                  {step.txHash && (
                    <div className="mt-1">
                      <TxHashLink hash={step.txHash} />
                    </div>
                  )}
                  {isCancelled && step.current && (
                    <div className="mt-2 flex items-center gap-1.5">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                      <span className="text-xs text-red-500">Cancelled here</span>
                    </div>
                  )}
                  <div>{getActionButton(step)}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Dispute branch */}
      {deal.dispute && <DisputeBranch dispute={deal.dispute} />}

      {/* Installment milestones */}
      {deal.milestones && deal.milestones.length > 0 && <InstallmentProgress milestones={deal.milestones} />}

      {/* Quick actions footer */}
      {!isCancelled && deal.status !== 'released' && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="pulse-dot" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Last updated {moment(deal.updatedAt).fromNow()}
            </span>
          </div>
          {!deal.dispute && onRaiseDispute && (
            <button
              onClick={onRaiseDispute}
              className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-800/50 dark:text-red-400 dark:hover:bg-red-950/20"
            >
              Raise Dispute
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export { EscrowTimeline }
export type { EscrowTimelineProps }
