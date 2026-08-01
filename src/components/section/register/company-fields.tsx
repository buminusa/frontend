"use client"

import { useEffect, useMemo, useState } from "react"
import { Upload, X, Building2, MapPin, Phone, Globe, FileText } from "lucide-react"
import AuthField from "../auth-field"

interface CompanyFieldsProps {
  formData: {
    company_name: string
    npwp_file: File | null
    logo: File | null
    address: string
    province: string
    country: string
    phone: string
    business_description: string
  }
  onChange: (field: string, value: string) => void
  onFileChange: (field: string, file: File | null) => void
}

function FileUploadField({
  label,
  file,
  onSelect,
  onRemove,
  placeholder,
  accept = "image/*",
  maxSizeBytes = 1024 * 1024,
  Icon,
}: {
  label: string
  file: File | null
  onSelect: (file: File | null) => void
  onRemove: () => void
  placeholder: string
  accept?: string
  maxSizeBytes?: number
  Icon: typeof Upload
}) {
  const [fileError, setFileError] = useState<string | null>(null)
  const preview = useMemo(() => {
    if (!file) return null
    return URL.createObjectURL(file)
  }, [file])

  useEffect(() => {
    if (!preview) return
    return () => URL.revokeObjectURL(preview)
  }, [preview])

  const handleFileSelect = (file: File | null) => {
    if (file && file.size > maxSizeBytes) {
      setFileError("Ukuran file maksimal 1 MB.")
      onSelect(null)
      return
    }

    setFileError(null)
    onSelect(file)
  }

  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-500">
        {label}
      </label>

      {fileError ? (
        <p className="mb-2 text-xs text-red-600">{fileError}</p>
      ) : null}

      {preview && file?.type.startsWith("image/") ? (
        <div className="relative w-fit">
          <img
            src={preview}
            alt={label}
            className="h-32 w-auto rounded-xl border border-gray-200 object-contain"
          />
          <button
            type="button"
            onClick={onRemove}
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white shadow-md transition hover:bg-green-700"
          >
            <X size={14} />
          </button>
        </div>
      ) : file ? (
        <div className="flex w-fit items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
          <span>{file.name}</span>
          <button
            type="button"
            onClick={onRemove}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white shadow-md transition hover:bg-green-700"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-white px-3 py-6 text-center text-sm text-gray-500 transition hover:border-green-600 hover:bg-[rgba(22,163,74,0.03)] hover:text-green-600">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A3A1B]/5 text-[#1A3A1B] transition group-hover:bg-green-600 group-hover:text-white">
            <Icon size={18} />
          </span>
          <span className="text-xs">{placeholder}</span>
          <input
            type="file"
            accept={accept}
            onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null)}
            className="hidden"
          />
        </label>
      )}
    </div>
  )
}

export default function CompanyFields({
  formData,
  onChange,
  onFileChange,
}: CompanyFieldsProps) {
  return (
    <div className="space-y-5">
      <AuthField
        label="Nama Perusahaan"
        value={formData.company_name}
        onChange={(v) => onChange("company_name", v)}
        placeholder="PT Contoh Sejahtera"
        icon={Building2}
      />

      <FileUploadField
        label="Logo Perusahaan"
        file={formData.logo}
        onSelect={(file) => onFileChange("logo", file)}
        onRemove={() => onFileChange("logo", null)}
        placeholder="Upload logo perusahaan (PNG/JPG)"
        accept="image/png,image/jpeg"
        Icon={Upload}
      />

      <FileUploadField
        label="Foto NPWP"
        file={formData.npwp_file}
        onSelect={(file) => onFileChange("npwp_file", file)}
        onRemove={() => onFileChange("npwp_file", null)}
        placeholder="Upload foto NPWP (maks. 1 MB)"
        accept="image/png,image/jpeg,application/pdf"
        Icon={FileText}
      />

      <AuthField
        label="Alamat"
        value={formData.address}
        onChange={(v) => onChange("address", v)}
        placeholder="Alamat perusahaan"
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

      <AuthField
        label="Deskripsi Bisnis"
        value={formData.business_description}
        onChange={(v) => onChange("business_description", v)}
        placeholder="Ceritakan tentang bisnis Anda"
        icon={FileText}
        textarea
        rows={4}
      />
    </div>
  )
}