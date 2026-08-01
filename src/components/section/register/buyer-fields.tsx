"use client"

import { User, MapPin, Phone, Globe } from "lucide-react"
import AuthField from "../auth-field"

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
  return (
    <div className="space-y-5">
      <AuthField
        label="Nama Lengkap"
        value={formData.full_name}
        onChange={(v) => onChange("full_name", v)}
        placeholder="Nama lengkap sesuai identitas"
        icon={User}
      />

      <AuthField
        label="Alamat"
        value={formData.address}
        onChange={(v) => onChange("address", v)}
        placeholder="Alamat lengkap"
        icon={MapPin}
        textarea
      />

      <div className="grid grid-cols-2 gap-4">
        <AuthField
          label="Provinsi"
          value={formData.province}
          onChange={(v) => onChange("province", v)}
          placeholder="Jawa Barat"
          icon={MapPin}
        />

        <AuthField
          label="Negara"
          value={formData.country}
          onChange={(v) => onChange("country", v)}
          placeholder="Indonesia"
          icon={Globe}
        />
      </div>

      <AuthField
        label="Nomor Telepon"
        value={formData.phone}
        onChange={(v) => onChange("phone", v)}
        placeholder="08xxxxxxxxxx"
        type="tel"
        icon={Phone}
      />
    </div>
  )
}