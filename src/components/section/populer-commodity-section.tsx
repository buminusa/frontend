"use client"

import { useMemo, useState } from "react"

import CategoryChip from "../category-chip"
import ProductCard from "../product-card"
import Link from "next/link"

import {
  categories,
  products,
} from "../../data/dummy"
import { ArrowRight } from "lucide-react"

export default function PopulerCommoditySection() {
  const [selectedCategory, setSelectedCategory] =
    useState("Semua")

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "Semua")
      return products

    return products.filter(
      (product) =>
        product.category === selectedCategory
    )
  }, [selectedCategory])

  return (
    <section className="py-14">

      <div className="mx-auto max-w-7xl px-4">

        <h2 className="mb-8 text-3xl font-bold">
          Komoditas Populer
        </h2>

        {/* Category */}

        <div className="mb-10 flex gap-3 overflow-x-auto pb-2">

          {categories.map((category: { name: string; icon: React.FC }) => (
            <CategoryChip
              key={category.name}
              name={category.name}
              icon={category.icon}
              active={category.name === selectedCategory}
              onClick={() =>
                setSelectedCategory(category.name)
              }
            />
          ))}

        </div>

        {/* Products */}

        <div className="grid grid-cols-2 gap-5 mb-10 md:grid-cols-4 lg:grid-cols-6">

          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}

        </div>

        <Link
    href={"/komoditas"}
    className="hidden md:flex items-center gap-2 font-semibold text-[#1A3A1B] hover:gap-3 transition-all">
    Lihat Semua
    <ArrowRight size={18} />
  </Link>

      </div>

    </section>
  )
}