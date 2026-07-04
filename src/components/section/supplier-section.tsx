"use client"

import { useState } from "react"
import SupplierHeader from "@/components/supplier/supplier-header"
import ProductList from "@/components/supplier/product-list"
import ProductFormModal from "@/components/supplier/product-form-modal"
import { Product } from "@/components/supplier/product-card"

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Beras Premium",
    category: "Pangan",
    price: 15000,
    unit: "kg",
    stock: 250,
    image: "",
    status: "aktif",
  },
]

export default function SupplierSection() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

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
    // TODO: panggil API create/update produk
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

        <ProductList
          products={products}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
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