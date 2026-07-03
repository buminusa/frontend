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

export default function BuyerFields({
  formData,
  onChange,
}: BuyerFieldsProps) {
  return (
    <div className="space-y-4">

      <div>
        <label className="mb-1.5 block text-sm font-medium">
          Nama Lengkap
        </label>
        <input
          type="text"
          value={formData.full_name}
          onChange={(e) => onChange("full_name", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black"
          placeholder="Nama lengkap sesuai identitas"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">
          Alamat
        </label>
        <textarea
          value={formData.address}
          onChange={(e) => onChange("address", e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black"
          placeholder="Alamat lengkap"
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

    </div>
  )
}