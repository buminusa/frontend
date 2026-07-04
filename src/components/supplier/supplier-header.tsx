import { Plus } from "lucide-react"

interface SupplierHeaderProps {
  onAddClick: () => void
  total: number
}

export default function SupplierHeader({
  onAddClick,
  total,
}: SupplierHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Produk Saya</h1>
        <p className="mt-1 text-sm text-gray-500">
          {total} produk yang kamu jual
        </p>
      </div>

      <button
        onClick={onAddClick}
        className="flex items-center gap-1.5 rounded-full bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
      >
        <Plus size={16} />
        Tambah Produk
      </button>
    </div>
  )
}