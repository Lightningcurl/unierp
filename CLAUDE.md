# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project overview

Modular ERP for a small distributor. Sales, inventory, and contacts.

## Stack
- Next.js (App Router) + TypeScript strict + Tailwind + shadcn/ui
- Supabase (Postgres, Auth, RLS) · npm · deployed on Vercel

## Rules — these are not suggestions
- TypeScript strict. NEVER use `any`. Use `unknown` plus a check instead.
- Validate every API input with Zod before touching the database.
- Never trust client input for prices, totals, IDs, or timestamps — derive them server-side.
- Every new table gets RLS enabled and an explicit policy in the same migration.
- Schema changes only via numbered files in `supabase/migrations/`. Never edit the DB by hand.
- No emojis in UI. No `dangerouslySetInnerHTML`. No secrets outside env vars.
- Money is `numeric(12,2)` in Postgres, never a float.

## Conventions (Unirsal house style)
- `@/` maps to `src/`. Components in `src/components/`, one per file, named exports.
- Supabase clients live in `src/lib/supabase/{client,server,admin}.ts` — nowhere else.
- Server-only modules open with `import "server-only"`. Components never call Supabase directly.
- Data helpers in `src/lib/data/`. Every list handles empty, loading, and error states.

## Commands

- `npm run dev -- -p 8080` — start the dev server (http://localhost:8080)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint (flat config via `eslint.config.mjs`, using `eslint-config-next`)

There is no test runner configured in this repo.

## Architecture

- **`app/`** — Next.js App Router routes. Each route directory has its own `page.tsx` and optionally `layout.tsx`. `app/productList/layout.tsx` wraps all `productList/*` routes with shared nav.
- **`components/`** — Reusable presentational components (`Button`, `Table`, `Input`, `Badge`, `Card`, `EmptyState`, `Skeleton`). `Table` is generic (`Table<T>`) and takes `labels`, `lines`, and a `renderRow` callback rather than being tied to a specific data shape.
- **`tsdrills/erp_domain.ts`** — Domain types and TS practice functions (`Product`, `Partner`, `SalesOrder`, `OrderLine`, `OrderStatus`, plus helpers like `orderTotal`, `tax`, `lowStock`). The `Product` type here is the one actually imported and used by `app/productList/*`, so domain modeling changes start here, not in `app/`.
- Path alias `@/*` resolves to the repo root (see `tsconfig.json`), e.g. `@/components/Table`, `@/tsdrills/erp_domain`.

## Before finishing any task
 Run `npm run typecheck` and `npm run build`. Do not report a task complete if either fails.

### Data flow (currently mock/in-memory)

There is no backend or API layer yet. `app/productList/page.tsx` defines and exports a hardcoded `products: Product[]` array directly from the page module, and `app/productList/[id]/page.tsx` imports that same `products` export to look up a product by id. When adding real data fetching, this in-memory array is the thing to replace.

### Client vs server components

Most interactive pages (`productList/page.tsx`, `productList/[id]/page.tsx`) are explicitly `"use client"` because they use `useState` or React's `use()`. Route layouts (e.g. `app/productList/layout.tsx`) are server components by default. Follow this split: keep state/interactivity in client components and static structure/navigation in server components.

### Dynamic routes

`app/productList/[id]/page.tsx` receives `params` as a `Promise<{ id: string }>` and unwraps it with React's `use()` — this is the async-params convention for this Next.js version, not `useParams()` or a synchronous prop.


