"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { Product } from "@/components/supplier/product-card"
import { getAuthToken } from "@/lib/auth"

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080").replace(/\/$/, "")

type Category = {
  id: number
  name_categories: string
}

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

interface ProductFormModalProps {
  initialData: Product | null
  onClose: () => void
  onSave: (product: Product) => void
}

const emptyForm = {
  name: "",
  categoryId: "",
  priceMin: "",
  priceMax: "",
  unit: "",
  minOrder: "",
  description: "",
  hsCode: "",
}

function formFromProduct(product: Product | null) {
  if (!product) return emptyForm

  return {
    name: product.name,
    categoryId: product.categoryId ? String(product.categoryId) : "",
    priceMin: String(product.price),
    priceMax: String(product.priceMax ?? product.price),
    unit: product.unit,
    minOrder: String(product.stock),
    description: product.description ?? "",
    hsCode: product.hsCode ?? "",
  }
}

export default function ProductFormModal({
  initialData,
  onClose,
  onSave,
}: ProductFormModalProps) {
  const [form, setForm] = useState(() => formFromProduct(initialData))
  const [images, setImages] = useState<File[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const controller = new AbortController()

    async function loadCategories() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/categories?limit=100`, {
          signal: controller.signal,
        })
        const result = await response.json()

        if (response.ok) setCategories(result.data as Category[])
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setMessage("Gagal memuat kategori.")
        }
      }
    }

    loadCategories()

    return () => controller.abort()
  }, [])

  const handleChange = (field: keyof typeof emptyForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const token = getAuthToken()

    if (!token) {
      setMessage("Silakan masuk kembali untuk menyimpan produk.")
      return
    }

    setIsSubmitting(true)
    setMessage("")

    const formData = new FormData()
    formData.append("nama", form.name)
    formData.append("min_order", form.minOrder)
    formData.append("price_min", form.priceMin)
    formData.append("price_max", form.priceMax)
    formData.append("unit", form.unit)

    if (form.categoryId) formData.append("categoryId", form.categoryId)
    if (form.description) formData.append("description", form.description)
    if (form.hsCode) formData.append("hs_code", form.hsCode)
    images.forEach((image) => formData.append("images", image))

    try {
      const response = await fetch(
        initialData ? `${API_BASE_URL}/api/v1/products/${initialData.id}` : `${API_BASE_URL}/api/v1/products`,
        {
        method: initialData ? "PUT" : "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
        },
      )
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Gagal menyimpan produk.")
      }

      const product = result.data as ApiProduct
      onSave({
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
      })
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Gagal menyimpan produk.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {initialData ? "Edit Produk" : "Tambah Produk"}
          </h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-black">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Nama Produk</label>
            <input type="text" value={form.name} onChange={(e) => handleChange("name", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600" required />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Kategori</label>
            <select value={form.categoryId} onChange={(e) => handleChange("categoryId", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600">
              <option value="">Pilih kategori (opsional)</option>
              {categories.map((category) => <option key={category.id} value={category.id}>{category.name_categories}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium">Harga minimum (Rp)</label>
              <input type="number" min="0" value={form.priceMin} onChange={(e) => handleChange("priceMin", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Harga maksimum (Rp)</label>
              <input type="number" min="0" value={form.priceMax} onChange={(e) => handleChange("priceMax", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium">Satuan</label>
              <input type="text" value={form.unit} onChange={(e) => handleChange("unit", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600" placeholder="kg" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Minimal order</label>
              <input type="number" min="1" value={form.minOrder} onChange={(e) => handleChange("minOrder", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600" required />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Deskripsi</label>
            <textarea value={form.description} onChange={(e) => handleChange("description", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600" rows={3} />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">HS code</label>
            <input type="text" value={form.hsCode} onChange={(e) => handleChange("hsCode", e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Gambar produk (maks. 5)</label>
            <input type="file" accept="image/png,image/jpeg" multiple onChange={(e) => setImages(Array.from(e.target.files ?? []).slice(0, 5))} className="block w-full text-sm" />
          </div>

          {message && <p className="text-sm text-red-600">{message}</p>}

          <button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-green-600 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400">
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      </div>
    </div>
  )
}
