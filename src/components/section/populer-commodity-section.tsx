"use client"

import { useEffect, useMemo, useState } from "react"

import CategoryChip from "../category-chip"
import ProductCard from "../product-card"
import Link from "next/link"

import { ArrowRight, LayoutGrid, Tag } from "lucide-react"
import { AUTH_EVENT_NAME, getAuthToken } from "@/lib/auth"

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080").replace(/\/$/, "")

type ApiProduct = {
  id: number
  nama: string
  slug: string | null
  price_min: string | number
  category: { id: number; name_categories: string } | null
  supplier: { company_name: string; address?: string | null } | null
  images: { image_url: string }[]
}

type Product = {
  id: number
  slug: string
  name: string
  image: string
  price: number
  location: string
  categoryId: number | null
  categoryName: string | null
}

export default function PopulerCommoditySection() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()

    async function loadPopularProducts() {
      const token = getAuthToken()

      if (!token) {
        setProducts([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError("")

      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/products/popular?limit=12`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        })
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.message || "Gagal memuat komoditas populer.")
        }

        setProducts(
          (result.data as ApiProduct[]).map((product) => ({
            id: product.id,
            slug: product.slug ?? String(product.id),
            name: product.nama,
            image: product.images[0]?.image_url ?? "/hasil_bumi.png",
            price: Number(product.price_min),
            location: product.supplier?.address ?? product.supplier?.company_name ?? "Indonesia",
            categoryId: product.category?.id ?? null,
            categoryName: product.category?.name_categories ?? null,
          }))
        )
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setError(error instanceof Error ? error.message : "Gagal memuat komoditas populer.")
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    loadPopularProducts()
    window.addEventListener(AUTH_EVENT_NAME, loadPopularProducts)

    return () => {
      controller.abort()
      window.removeEventListener(AUTH_EVENT_NAME, loadPopularProducts)
    }
  }, [])

  const categories = useMemo(
    () =>
      Array.from(
        new Map(
          products
            .filter((product): product is Product & { categoryId: number; categoryName: string } =>
              product.categoryId !== null && product.categoryName !== null
            )
            .map((product) => [product.categoryId, product.categoryName])
        )
      ).map(([id, name]) => ({ id, name })),
    [products]
  )

  const filteredProducts = useMemo(() => {
    if (selectedCategoryId === null) return products

    return products.filter((product) => product.categoryId === selectedCategoryId)
  }, [products, selectedCategoryId])

  return (
    <section className="py-14">

      <div className="mx-auto max-w-7xl px-4">

        <h2 className="mb-8 text-3xl font-bold">
          Komoditas Populer
        </h2>

        {/* Category */}

        <div className="mb-10 flex gap-3 overflow-x-auto pb-2">

          <CategoryChip
            name="Semua"
            icon={LayoutGrid}
            active={selectedCategoryId === null}
            onClick={() => setSelectedCategoryId(null)}
          />

          {categories.map((category) => (
            <CategoryChip
              key={category.id}
              name={category.name}
              icon={Tag}
              active={category.id === selectedCategoryId}
              onClick={() => setSelectedCategoryId(category.id)}
            />
          ))}

        </div>

        {/* Products */}

        <div className="grid grid-cols-2 gap-5 mb-10 md:grid-cols-4 lg:grid-cols-6">

          {isLoading && <p className="col-span-full text-sm text-gray-500">Memuat komoditas populer...</p>}

          {!isLoading && error && <p className="col-span-full text-sm text-red-600">{error}</p>}

          {!isLoading && !error && filteredProducts.length === 0 && (
            <p className="col-span-full text-sm text-gray-500">Belum ada komoditas populer.</p>
          )}

          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}

        </div>

        <Link
    href={"/komoditas"}
    className="hidden md:flex items-center gap-2 font-medium text-gray-400 hover:gap-3 hover:text-green-600 transition-all">
    Lihat Semua
    <ArrowRight size={18} />
  </Link>

      </div>

    </section>
  )
}
