"use client"

import { ShoppingBag, Store } from "lucide-react"
import { useLanguage } from "@/lib/langue/provider"

interface RoleSelectorProps {
  role: "buyer" | "supplier"
  onChange: (role: "buyer" | "supplier") => void
}

const options = [
  {
    id: "buyer" as const,
    labelKey: "auth.register.roleBuyerLabel",
    subKey: "auth.register.roleBuyerSub",
    Icon: ShoppingBag,
  },
  {
    id: "supplier" as const,
    labelKey: "auth.register.roleSupplierLabel",
    subKey: "auth.register.roleSupplierSub",
    Icon: Store,
  },
]

export default function RoleSelector({ role, onChange }: RoleSelectorProps) {
  const { t } = useLanguage()

  return (
    <div className="mb-8 grid grid-cols-2 gap-3">
      {options.map(({ id, labelKey, subKey, Icon }) => {
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
              {t(labelKey)}
            </span>

            <span className="text-[11px] leading-snug text-gray-500">{t(subKey)}</span>
          </button>
        )
      })}
    </div>
  )
}