import ProductCard from "../product-card"
import { products } from "../../data/dummy"

interface OtherCommoditiesSectionProps {
  currentSlug: string
}

export default function OtherCommoditiesSection({
  currentSlug,
}: OtherCommoditiesSectionProps) {
  const otherProducts = products.filter(
    (product) => product.slug !== currentSlug
  )

  if (otherProducts.length === 0) {
    return null
  }

  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-4">

        <h2 className="mb-8 text-3xl font-bold">
          Komoditas Lainnya
        </h2>

        <div className="grid grid-cols-2 gap-5 mb-10 md:grid-cols-4 lg:grid-cols-6">
          {otherProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

      </div>
    </section>
  )
}