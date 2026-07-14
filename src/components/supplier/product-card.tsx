"use client"

import { useState } from "react"
import Image from "next/image"
import { Pencil, Trash2 } from "lucide-react"
import { getAuthToken } from "@/lib/auth"

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080").replace(/\/$/, "")

export interface Product {
  id: string
  name: string
  category: string
  categoryId?: number | null
  price: number
  priceMax?: number
  unit: string
  stock: number
  image: string
  status: "aktif" | "nonaktif"
  description?: string | null
  hsCode?: string | null
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
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState("")

  const handleDelete = async () => {
    if (!window.confirm(`Hapus produk ${product.name}?`)) return

    const token = getAuthToken()

    if (!token) {
      setDeleteError("Silakan masuk kembali untuk menghapus produk.")
      return
    }

    setIsDeleting(true)
    setDeleteError("")

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/products/${product.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(result.message || "Gagal menghapus produk.")
      }

      onDelete(product.id)
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : "Gagal menghapus produk.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <div className="relative h-36 w-full bg-gray-100">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            unoptimized={product.image.startsWith("http")}
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
          <p className="text-xs text-gray-500">Min. order: {product.stock}</p>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            disabled={isDeleting}
            onClick={() => onEdit(product)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-300 py-1.5 text-xs font-medium hover:border-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Pencil size={13} />
            Edit
          </button>
          <button
            disabled={isDeleting}
            onClick={handleDelete}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={13} />
            {isDeleting ? "Menghapus..." : "Hapus"}
          </button>
        </div>

        {deleteError && <p className="mt-2 text-xs text-red-600">{deleteError}</p>}
      </div>
    </div>
  )
}
