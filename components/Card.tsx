import {
  DollarSign,
  ClipboardList,
  PackageX,
  Users,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Metric } from '@/tsdrills/erp_data'

const icons: Record<string, typeof DollarSign> = {
  revenue: DollarSign,
  'open-orders': ClipboardList,
  'low-stock': PackageX,
  customers: Users,
}

const toneClasses: Record<Metric['tone'], string> = {
  accent: 'text-primary bg-primary/10',
  neutral: 'text-foreground bg-muted',
  warning: 'text-warning bg-warning/12',
  destructive: 'text-destructive bg-destructive/12',
}

export function Card({ metric }: { metric: Metric }) {
  const Icon = icons[metric.id] ?? ClipboardList
  const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6 transition-colors duration-200 hover:border-primary/40">
      <div className="flex items-center justify-between gap-4">
        <span
          className={cn(
            'flex size-10 items-center justify-center rounded-md',
            toneClasses[metric.tone],
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground">
          <TrendIcon className="size-4" aria-hidden="true" />
          {metric.change}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-muted-foreground">
          {metric.label}
        </span>
        <span className="text-stat font-semibold tracking-tight text-foreground">
          {metric.value}
        </span>
      </div>

      <span className="text-sm text-muted-foreground">{metric.helper}</span>
    </div>
  )
}
