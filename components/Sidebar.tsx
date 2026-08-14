'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

type NavItem = {
  id: string
  label: string
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'contacts', label: 'Contacts' },
  { id: 'products', label: 'Products' },
  { id: 'sales-orders', label: 'Sales Orders' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'settings', label: 'Settings' },
]

export function Sidebar() {
  const [active, setActive] = useState('')
  const router = useRouter()

  return (
    <aside className="sticky top-0 hidden h-svh w-60 shrink-0 self-start border-r border-border bg-card md:flex md:flex-col">
      <div className="flex h-16 items-center border-b border-border px-6">
        <span className="text-base font-semibold text-foreground">
          Operations
        </span>
      </div>

      <nav aria-label="Primary" className="flex flex-col gap-1 p-4">
        {navItems.map((item) => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {setActive(item.id); router.push(item.label.toLowerCase())}}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'rounded-md px-3 py-2 text-left text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                isActive
                  ? 'bg-primary/10 font-semibold text-primary'
                  : 'font-medium text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {item.label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}