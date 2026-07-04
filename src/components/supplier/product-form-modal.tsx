"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { Product } from "@/components/supplier/product-card"

interface ProductFormModalProps {
  initialData: Product | null
  onClose: () => void
  onSave: (product: Product) => void
}

const emptyForm = {
  name: "",
  category: "",
  price: "",
  unit: "",
  stock: "",
  image: "",
  status: "aktif" as "aktif" | "nonaktif",
}

export default function ProductFormModal({
  initialData,
  onClose,
  onSave,
}: ProductFormModalProps) {
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        category: initialData.category,
        price: String(initialData.price),
        unit: initialData.unit,
        stock: String(initialData.stock),
        image: initialData.image,
        status: initialData.status,
      })
    } else {
      setForm(emptyForm)
    }
  }, [initialData])

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSave({
      id: initialData?.id ?? crypto.randomUUID(),
      name: form.name,
      category: form.category,
      price: Number(form.price) || 0,
      unit: form.unit,
      stock: Number(form.stock) || 0,
      image: form.image,
      status: form.status,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {initialData ? "Edit Produk" : "Tambah Produk"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Nama Produk</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600"
              placeholder="Beras Premium"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Kategori</label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600"
              placeholder="Pangan"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium">Harga (Rp)</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600"
                placeholder="15000"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Satuan</label>
              <input
                type="text"
                value={form.unit}
                onChange={(e) => handleChange("unit", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600"
                placeholder="kg"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Stok</label>
            <input
              type="number"
              value={form.stock}
              onChange={(e) => handleChange("stock", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600"
              placeholder="100"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">URL Gambar</label>
            <input
              type="text"
              value={form.image}
              onChange={(e) => handleChange("image", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Status</label>
            <select
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-600"
            >
              <option value="aktif">Aktif</option>
              <option value="nonaktif">Nonaktif</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-green-600 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  )
}