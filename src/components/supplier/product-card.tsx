import Image from "next/image"
import { Pencil, Trash2 } from "lucide-react"

export interface Product {
  id: string
  name: string
  category: string
  price: number
  unit: string
  stock: number
  image: string
  status: "aktif" | "nonaktif"
}

interface ProductCardProps {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
}

export default function ProductCard({
  product,
  onEdit,
  onDelete,
}: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <div className="relative h-36 w-full bg-gray-100">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gray-400">
            Tidak ada gambar
          </div>
        )}

        <span
          className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-xs font-medium ${
            product.status === "aktif"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {product.status === "aktif" ? "Aktif" : "Nonaktif"}
        </span>
      </div>

      <div className="p-3">
        <p className="text-xs text-gray-500">{product.category}</p>
        <h3 className="mt-0.5 truncate text-sm font-semibold">
          {product.name}
        </h3>

        <div className="mt-1 flex items-center justify-between">
          <p className="text-sm font-bold text-green-700">
            Rp{product.price.toLocaleString("id-ID")}
            <span className="text-xs font-normal text-gray-500">
              {" "}
              /{product.unit}
            </span>
          </p>
          <p className="text-xs text-gray-500">Stok: {product.stock}</p>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-300 py-1.5 text-xs font-medium hover:border-black"
          >
            <Pencil size={13} />
            Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
          >
            <Trash2 size={13} />
            Hapus
          </button>
        </div>
      </div>
    </div>
  )
}