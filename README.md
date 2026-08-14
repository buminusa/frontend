# Bumi Nusa - Frontend

Frontend untuk **Bumi Nusa** (BumiNusa.id), platform B2B yang mempertemukan supplier (perusahaan) dengan buyer. Dibangun dengan Next.js + React + TypeScript.

Backend API: [buminusa/backend](https://github.com/buminusa/backend)

## Tech Stack

- **Framework:** Next.js 16 + React 19 (React Compiler aktif)
- **Bahasa:** TypeScript
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/postcss`, tanpa `tailwind.config.js`) + shadcn/ui
- **Animasi & Chart:** framer-motion, recharts, lucide-react

## Struktur Proyek

```
src/
├── app/                     # Routing (App Router)
│   ├── login, register      # Autentikasi
│   ├── forgot-password      # Lupa password
│   ├── reset-password       # Reset password via token
│   ├── verify-email         # Verifikasi email via link dari email
│   ├── home, komoditas,     # Halaman publik buyer
│   ├── suplier, keranjang
│   └── dashboard/           # Dashboard admin, super-admin, supplier
├── components/
│   ├── ui/                  # Komponen shadcn/ui
│   ├── section/             # Section halaman landing & auth
│   └── dashboard-section/   # Komponen dashboard
├── lib/
│   ├── api/                 # API client (canonical) + services per domain
│   ├── hooks/               # Custom hooks
│   └── types/               # TypeScript types
└── data/
    └── dummy.ts             # Mock data
```

## Perintah

| Task | Command |
|---|---|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Typecheck | `npx tsc --noEmit` |

## Konfigurasi

Salin `.env.example` menjadi `.env.local` (jika ada), atau set variabel berikut:

```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

- Request `/api/*` di-proxy ke backend via `next.config.ts` rewrites.
- Path alias: `@/*` → `./src/*`.

## Autentikasi & Verifikasi Email

- JWT disimpan di `localStorage` (key `auth_token`), dikirim via header `Authorization: Bearer <token>`.
- Perubahan token membangkitkan event `auth:changed` (listener di `AuthRouteGuard` & hooks).
- Respons `401` melempar `UnauthorizedError` — UI harus menangani sesi kedaluwarsa.

### Verifikasi email

1. Registrasi (`/register`) → backend mengirim email berisi link `/verify-email?token=...`.
2. Halaman `/verify-email` memanggil `GET /api/v1/auth/verify-email?token=...` dan menampilkan status verifikasi.
3. **Akun yang belum verified tidak dapat login**: saat login, token tidak disimpan & redirect dibatalkan, ditampilkan notice dengan petunjuk verifikasi. Guard rute (client) juga membuang token tanpa klaim `verified: true` pada JWT payload.

> Catatan: backend harus menyertakan `verified: user.verified` di payload JWT saat login agar guard bisa mendeteksi status verifikasi dari token.

## Catatan API Layer

- File canonical API ada di `src/lib/api/` (`api.ts`, `auth.ts`, `errors.ts`) dan dire-export via `src/lib/api/index.ts`.
- Panggilan per domain berada di `src/lib/api/services/` (products, categories, company-profiles, users, orders, dashboard).
- Pesan error dari backend ditampilkan apa adanya (tidak diganti pesan generik), dengan fallback untuk error jaringan/status HTTP.