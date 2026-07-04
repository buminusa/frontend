import { PackageOpen } from "lucide-react"

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 py-16 text-center">
      <PackageOpen size={40} className="mb-3 text-gray-400" />
      <p className="text-sm font-medium text-gray-700">
        Belum ada produk
      </p>
      <p className="mt-1 text-sm text-gray-500">
        Tambahkan produk pertama kamu untuk mulai berjualan
      </p>
    </div>
  )
}