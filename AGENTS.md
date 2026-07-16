<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Stack

- **Next.js 16.2.9** + React 19.2.4 + TypeScript
- **React Compiler** enabled (`next.config.ts` → `reactCompiler: true`)
- **Tailwind CSS v4** — uses `@import "tailwindcss"` in CSS, no `tailwind.config.js`. Config lives in `postcss.config.mjs` via `@tailwindcss/postcss`
- **shadcn/ui** (radix-nova style) — add components via `npx shadcn@latest add`. Config: `components.json`
- **framer-motion**, **recharts**, **lucide-react**

## Commands

| Task | Command |
|---|---|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Typecheck | `npx tsc --noEmit` (no script in package.json) |

No test framework is configured.

## Path alias

`@/*` → `./src/*` (defined in `tsconfig.json`)

## Backend API

- **Base URL**: `process.env.NEXT_PUBLIC_API_URL` → defaults to `http://localhost:8080`
- `/api/*` requests are proxied to backend via `next.config.ts` rewrites
- Auth: JWT token in `localStorage` key `auth_token`, sent as `Authorization: Bearer <token>`
- `UnauthorizedError` thrown on 401 responses — UI must handle session expiry
- Token change events dispatched as `auth:changed` CustomEvent

## Architecture

```
src/
├── app/
│   ├── page.tsx              # Landing page (public)
│   ├── login/                # Login
│   ├── register/             # Register
│   ├── home/                 # Home (post-login)
│   ├── komoditas/            # Commodity listings
│   │   └── [slug]/           # Commodity detail
│   ├── suplier/              # Supplier listings
│   └── dashboard/
│       ├── admin/            # Admin dashboard
│       ├── superadmin/       # Superadmin dashboard
│       └── supplier/         # Supplier dashboard
├── components/
│   ├── ui/                   # shadcn components (add via CLI)
│   ├── dashboard-section/    # Dashboard-specific components
│   ├── section/              # Landing page sections
│   └── supplier/             # Supplier components
├── lib/
│   ├── api/                  # API client layer (re-exports from index.ts)
│   ├── hooks/                # Custom hooks
│   ├── types/                # TypeScript types
│   └── utils.ts              # cn() for Tailwind class merging
└── data/
    └── dummy.ts              # Mock data
```

## Gotchas

- **Duplicate API files**: `src/lib/api.ts` and `src/lib/auth.ts` exist at root AND in `src/lib/api/` subdirectory. The canonical versions are in `src/lib/api/` (re-exported via `src/lib/api/index.ts`). Prefer importing from `@/lib/api`
- **Tailwind v4 syntax**: No `tailwind.config.js`. Uses `@theme inline` block in `globals.css` for design tokens. Dark mode via `.dark` class, not media query
- **API methods**: `src/lib/api/api.ts` has `apiGet`, `apiPost`, `apiPut`, `apiPatch`, `apiDelete`. The stale duplicate at `src/lib/api.ts` only has `apiGet`/`apiPatch` — don't import from there
- **Services layer**: Domain-specific API calls live in `src/lib/api/services/` (products, categories, company-profiles, users, orders, dashboard). Prefer using these over raw `apiGet`/`apiPost` calls
- **Indonesian locale**: UI text and API error messages are in Bahasa Indonesia. `format.ts` uses `id-ID` locale for number formatting
- **shadcn add**: Run `npx shadcn@latest add <component>` — it reads `components.json` for paths and style config
