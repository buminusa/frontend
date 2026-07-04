import ProductCard, { Product } from "@/components/supplier/product-card"
import EmptyState from "@/components/supplier/empty-state"

interface ProductListProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
}

export default function ProductList({
  products,
  onEdit,
  onDelete,
}: ProductListProps) {
  if (products.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}