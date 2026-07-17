import { Plus, LayoutDashboard } from "lucide-react"
import Link from "next/link"

interface SupplierHeaderProps {
  onAddClick: () => void
  onDashboardClick?: () => void
  total: number
}

export default function SupplierHeader({
  onAddClick,
  onDashboardClick,
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

      <div className="flex gap-2">
        <button
          onClick={onAddClick}
          className="flex items-center gap-1.5 rounded-full bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
        >
          <Plus size={16} />
          Tambah Produk
        </button>
        <Link
          href="/suplier/dashboard"
          className="flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <LayoutDashboard size={16} />
          Dashboard
        </Link>
      </div>
    </div>
  )
}