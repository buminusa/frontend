"use client"

import { User, MapPin, Phone, Globe } from "lucide-react"
import AuthField from "../auth-field"
import { useLanguage } from "@/lib/langue/provider"

interface BuyerFieldsProps {
  formData: {
    full_name: string
    address: string
    province: string
    country: string
    phone: string
  }
  onChange: (field: string, value: string) => void
}

export default function BuyerFields({ formData, onChange }: BuyerFieldsProps) {
  const { t } = useLanguage()

  return (
    <div className="space-y-5">
      <AuthField
        label={t("auth.field.fullName")}
        value={formData.full_name}
        onChange={(v) => onChange("full_name", v)}
        placeholder={t("auth.register.fullNamePlaceholder")}
        icon={User}
      />

      <AuthField
        label={t("auth.field.address")}
        value={formData.address}
        onChange={(v) => onChange("address", v)}
        placeholder={t("auth.register.addressPlaceholder")}
        icon={MapPin}
        textarea
      />

      <div className="grid grid-cols-2 gap-4">
        <AuthField
          label={t("auth.field.province")}
          value={formData.province}
          onChange={(v) => onChange("province", v)}
          placeholder="Jawa Barat"
          icon={MapPin}
        />

        <AuthField
          label={t("auth.field.country")}
          value={formData.country}
          onChange={(v) => onChange("country", v)}
          placeholder="Indonesia"
          icon={Globe}
        />
      </div>

      <AuthField
        label={t("auth.field.phone")}
        value={formData.phone}
        onChange={(v) => onChange("phone", v)}
        placeholder="08xxxxxxxxxx"
        type="tel"
        icon={Phone}
      />
    </div>
  )
}