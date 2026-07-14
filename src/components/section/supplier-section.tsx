"use client"

import { useEffect, useState } from "react"
import SupplierHeader from "@/components/supplier/supplier-header"
import ProductList from "@/components/supplier/product-list"
import ProductFormModal from "@/components/supplier/product-form-modal"
import { Product } from "@/components/supplier/product-card"
import { AUTH_EVENT_NAME, getAuthToken } from "@/lib/auth"

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080").replace(/\/$/, "")

type ApiProduct = {
  id: number
  nama: string
  price_min: string | number
  price_max: string | number
  min_order: number
  unit: string | null
  status: string
  description: string | null
  hs_code: string | null
  category: { id: number; name_categories: string } | null
  images: { image_url: string }[]
}

export default function SupplierSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()

    async function loadMyProducts() {
      const token = getAuthToken()

      if (!token) {
        setProducts([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError("")

      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/products/me`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        })
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.message || "Gagal memuat produk.")
        }

        setProducts(
          (result.data as ApiProduct[]).map((product) => ({
            id: String(product.id),
            name: product.nama,
            category: product.category?.name_categories ?? "Tanpa kategori",
            categoryId: product.category?.id ?? null,
            price: Number(product.price_min),
            priceMax: Number(product.price_max),
            unit: product.unit ?? "unit",
            stock: product.min_order,
            image: product.images[0]?.image_url ?? "",
            status: product.status === "Active" ? "aktif" : "nonaktif",
            description: product.description,
            hsCode: product.hs_code,
          })),
        )
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setError(error instanceof Error ? error.message : "Gagal memuat produk.")
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    loadMyProducts()
    window.addEventListener(AUTH_EVENT_NAME, loadMyProducts)

    return () => {
      controller.abort()
      window.removeEventListener(AUTH_EVENT_NAME, loadMyProducts)
    }
  }, [])

  const handleAddClick = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const handleEditClick = (product: Product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const handleSave = (product: Product) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id)
      if (exists) {
        return prev.map((p) => (p.id === product.id ? product : p))
      }
      return [...prev, product]
    })
    setIsModalOpen(false)
  }

  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-4">
        <SupplierHeader onAddClick={handleAddClick} total={products.length} />

        {isLoading ? (
          <p className="text-sm text-gray-500">Memuat produk...</p>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <ProductList
            products={products}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        )}
      </div>

      {isModalOpen && (
        <ProductFormModal
          initialData={editingProduct}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </section>
  )
}
