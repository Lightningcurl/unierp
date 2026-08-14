import {SalesOrder} from "@/tsdrills/erp_domain"

export type Trend = 'up' | 'down'

export type MetricTone = 'accent' | 'neutral' | 'warning' | 'destructive'

export type Metric = {
  id: string
  label: string
  value: string
  helper: string
  trend?: Trend
  change: string
  tone: MetricTone
}

export type Urgency = 'critical' | 'high' | 'watch'

export const metrics: Metric[] = [
  {
    id: 'revenue',
    label: 'Revenue (MTD)',
    value: '$1.284M',
    helper: 'vs. $1.16M last month',
    trend: 'up',
    change: '+10.7%',
    tone: 'accent',
  },
  {
    id: 'open-orders',
    label: 'Open orders',
    value: '342',
    helper: '48 awaiting fulfilment',
    trend: 'up',
    change: '+18',
    tone: 'neutral',
  },
  {
    id: 'low-stock',
    label: 'Low stock items',
    value: '27',
    helper: '9 below safety threshold',
    trend: 'up',
    change: '+6',
    tone: 'warning',
  },
  {
    id: 'customers',
    label: 'Active customers',
    value: '1,908',
    helper: '54 new this month',
    trend: 'up',
    change: '+2.9%',
    tone: 'neutral',
  },
]

export const urgentOrders: SalesOrder[] = [
  {
    id: 'SO-48213',
    customer: 'Northwind Traders',
    value: '$86,400',
    dueIn: 'Overdue 2d',
    status: 'Awaiting stock',
    urgency: 'critical',
  },
  {
    id: 'SO-48197',
    customer: 'Contoso Manufacturing',
    value: '$52,100',
    dueIn: 'Due today',
    status: 'Pending approval',
    urgency: 'critical',
  },
  {
    id: 'SO-48250',
    customer: 'Fabrikam Logistics',
    value: '$41,780',
    dueIn: 'Due in 1d',
    status: 'Partially picked',
    urgency: 'high',
  },
  {
    id: 'SO-48231',
    customer: 'Tailspin Toys',
    value: '$33,020',
    dueIn: 'Due in 2d',
    status: 'Credit hold',
    urgency: 'high',
  },
  {
    id: 'SO-48266',
    customer: 'Adventure Works',
    value: '$28,540',
    dueIn: 'Due in 3d',
    status: 'Ready to ship',
    urgency: 'watch',
  },
]
