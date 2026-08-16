"use client"

import { useState } from "react"
import { Eye, EyeOff, LucideIcon } from "lucide-react"
import { useLanguage } from "@/lib/langue/provider"

interface AuthFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  icon: LucideIcon
  error?: string | null
  helper?: string
  textarea?: boolean
  rows?: number
}

export default function AuthField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon: Icon,
  error,
  helper,
  textarea,
  rows = 3,
}: AuthFieldProps) {
  const { t } = useLanguage()
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === "password"
  const resolvedType = isPassword && showPassword ? "text" : type

  const fieldClasses =
    "w-full rounded-xl border auth-paper px-3.5 text-sm shadow-sm outline-none transition placeholder:text-[#2A1F18]/40 focus:border-[#E8A33D] focus:ring-4 focus:ring-[#E8A33D]/15" +
    (textarea
      ? " py-3"
      : " py-2.5 pl-10") +
    (error
      ? " border-[#A8331E]/60 focus:border-[#A8331E] focus:ring-[#A8331E]/15"
      : " border-[#2A1F18]/15")

  const inputEl = textarea ? (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={fieldClasses}
    />
  ) : (
    <input
      type={resolvedType}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={fieldClasses}
    />
  )

  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[#2A1F18]/60">
        {label}
      </label>

      <div className="relative">
        {!textarea && (
          <Icon
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2A1F18]/40"
          />
        )}

        {inputEl}

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? t("auth.field.hidePassword") : t("auth.field.showPassword")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-red-600">{error}</p>
      ) : helper ? (
        <p className="mt-1.5 text-xs text-gray-500">{helper}</p>
      ) : null}
    </div>
  )
}
