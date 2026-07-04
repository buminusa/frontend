"use client"

import { useState, useEffect } from "react"
import { Upload, X } from "lucide-react"

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
}: {
  label: string
  file: File | null
  onSelect: (file: File | null) => void
  onRemove: () => void
  placeholder: string
  accept?: string
}) {
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    if (!file) {
      setPreview(null)
      return
    }
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>

      {preview ? (
        <div className="relative w-fit">
          <img
            src={preview}
            alt={label}
            className="h-32 w-auto rounded-lg border border-gray-300 object-contain"
          />
          <button
            type="button"
            onClick={onRemove}
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-700"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-300 px-3 py-6 text-center text-sm text-gray-500 hover:border-green-600 hover:text-green-600">
          <Upload size={18} />
          <span>{placeholder}</span>
          <input
            type="file"
            accept={accept}
            onChange={(e) => onSelect(e.target.files?.[0] ?? null)}
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
    <div className="space-y-4">

      <div>
        <label className="mb-1.5 block text-sm font-medium">
          Nama Perusahaan
        </label>
        <input
          type="text"
          value={formData.company_name}
          onChange={(e) => onChange("company_name", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black"
          placeholder="PT Contoh Sejahtera"
        />
      </div>

      <FileUploadField
        label="Logo Perusahaan"
        file={formData.logo}
        onSelect={(file) => onFileChange("logo", file)}
        onRemove={() => onFileChange("logo", null)}
        placeholder="Upload logo perusahaan (PNG/JPG)"
      />

      <FileUploadField
        label="Foto NPWP"
        file={formData.npwp_file}
        onSelect={(file) => onFileChange("npwp_file", file)}
        onRemove={() => onFileChange("npwp_file", null)}
        placeholder="Upload foto NPWP"
      />

      <div>
        <label className="mb-1.5 block text-sm font-medium">
          Alamat
        </label>
        <textarea
          value={formData.address}
          onChange={(e) => onChange("address", e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black"
          placeholder="Alamat perusahaan"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Provinsi
          </label>
          <input
            type="text"
            value={formData.province}
            onChange={(e) => onChange("province", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black"
            placeholder="Jawa Barat"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Negara
          </label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => onChange("country", e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black"
            placeholder="Indonesia"
          />
        </div>

      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">
          Nomor Telepon
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black"
          placeholder="08xxxxxxxxxx"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">
          Deskripsi Bisnis
        </label>
        <textarea
          value={formData.business_description}
          onChange={(e) => onChange("business_description", e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black"
          placeholder="Ceritakan tentang bisnis Anda"
        />
      </div>

    </div>
  )
}