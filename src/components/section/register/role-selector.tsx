"use client"

import { ShoppingBag, Store } from "lucide-react"

interface RoleSelectorProps {
  role: "buyer" | "supplier"
  onChange: (role: "buyer" | "supplier") => void
}

const options = [
  {
    id: "buyer" as const,
    label: "Saya Pembeli",
    sub: "Beli komoditas langsung dari petani",
    Icon: ShoppingBag,
  },
  {
    id: "supplier" as const,
    label: "Saya Supplier",
    sub: "Pasarkan produk Anda lebih luas",
    Icon: Store,
  },
]

export default function RoleSelector({ role, onChange }: RoleSelectorProps) {
  return (
    <div className="mb-8 grid grid-cols-2 gap-3">
      {options.map(({ id, label, sub, Icon }) => {
        const active = role === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={
              "group flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition " +
              (active
                ? "border-green-600 bg-[rgba(22,163,74,0.06)] ring-1 ring-green-600/40"
                : "border-gray-200 bg-white hover:border-gray-300")
            }
          >
            <span
              className={
                "flex h-9 w-9 items-center justify-center rounded-lg transition " +
                (active
                  ? "bg-green-600 text-white"
                  : "bg-[#1A3A1B]/5 text-[#1A3A1B] group-hover:bg-[#1A3A1B]/10")
              }
            >
              <Icon size={16} />
            </span>

            <span
              className={
                "text-sm font-semibold " +
                (active ? "text-[#1A3A1B]" : "text-gray-700")
              }
            >
              {label}
            </span>

            <span className="text-[11px] leading-snug text-gray-500">{sub}</span>
          </button>
        )
      })}
    </div>
  )
}