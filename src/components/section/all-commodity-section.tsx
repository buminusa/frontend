"use client";
import { useMemo, useState } from "react";

import CategoryChip from "../category-chip";
import ProductCard from "../product-card";
import Link from "next/link";
import Pagination from "../pagination";

import { categories, products } from "../../data/dummy";
import { ArrowRight } from "lucide-react";

export default function AllCommoditySection() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "Semua") return products;

    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  const PRODUCTS_PER_PAGE = 18;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-8 text-3xl font-bold">Komoditas</h2>

        {/* Category */}

        <div className="mb-10 flex gap-3 overflow-x-auto pb-2">
          {categories.map((category: { name: string; icon: React.FC }) => (
            <CategoryChip
              key={category.name}
              name={category.name}
              icon={category.icon}
              active={category.name === selectedCategory}
              onClick={() => {
                setSelectedCategory(category.name);
                setCurrentPage(1);
              }}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-5 mb-10 md:grid-cols-4 lg:grid-cols-6">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}
