"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getAuthToken } from "@/lib/auth"
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react"

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080"
).replace(/\/$/, "")

type ApiProduct = {
  id: number
  nama: string
  slug: string
  description: string | null
  price_min: string | number
  price_max: string | number
  min_order: number
  unit: string | null
  status: string
  hs_code: string | null

  category: {
    id: number
    name_categories: string
  } | null

  supplier: {
    id: number
    company_name: string
    slug: string
    logo_url: string | null
  } | null

  images: {
    id: number
    image_url: string
  }[]
}

type ProductDetail = {
  id: string
  name: string
  slug: string
  description: string
  category: string

  priceMin: number
  priceMax: number

  minOrder: number
  unit: string

  status: string
  hsCode: string

  image: string

  supplier: {
    id: number
    companyName: string
    slug: string
    logo: string
  } | null
}

export default function ProductDetailSection() {
  const params = useParams()
  const slug = params.slug as string

  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const router = useRouter()

  useEffect(() => {
    const controller = new AbortController()

    async function loadProduct() {
      const token = getAuthToken()

      if (!token) {
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError("")

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/products/slug/${slug}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          }
        )

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.message || "Gagal memuat produk.")
        }

        const apiProduct: ApiProduct = result.data

        setProduct({
          id: String(apiProduct.id),
          name: apiProduct.nama,
          slug: apiProduct.slug,
          description: apiProduct.description ?? "",
          category:
            apiProduct.category?.name_categories ?? "Tanpa kategori",

          priceMin: Number(apiProduct.price_min),
          priceMax: Number(apiProduct.price_max),

          minOrder: apiProduct.min_order,
          unit: apiProduct.unit ?? "unit",

          status: apiProduct.status,
          hsCode: apiProduct.hs_code ?? "-",

          image: apiProduct.images[0]?.image_url ?? "",

          supplier: apiProduct.supplier
            ? {
                id: apiProduct.supplier.id,
                companyName: apiProduct.supplier.company_name,
                slug: apiProduct.supplier.slug,
                logo: apiProduct.supplier.logo_url ?? "",
              }
            : null,
        })
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setError(
            error instanceof Error
              ? error.message
              : "Gagal memuat produk."
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadProduct()

    return () => controller.abort()
  }, [slug])

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm text-gray-500">
            Memuat produk...
          </p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      </section>
    )
  }

  if (!product) {
    return (
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm text-gray-500">
            Produk tidak ditemukan.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12">
  <div className="mx-auto max-w-6xl px-4">

    <button
      onClick={() => router.back()}
      className="mb-8 flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
    >
      <ArrowLeft className="h-4 w-4" />
      Kembali
    </button>

    <div className="grid gap-12 lg:grid-cols-2">

      {/* Product Image */}
      <div>
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name}
          className="aspect-square w-full rounded-2xl border object-cover"
        />
      </div>

      {/* Product Detail */}
      <div className="space-y-6">

        <div>
          <p className="text-sm text-gray-500">
            {product.category}
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            {product.name}
          </h1>
        </div>

        <div>
          <p className="text-3xl font-bold text-green-600">
            Rp {product.priceMin.toLocaleString("id-ID")}
          </p>

          {product.priceMax > product.priceMin && (
            <p className="mt-1 text-gray-500">
              hingga Rp{" "}
              {product.priceMax.toLocaleString("id-ID")}
            </p>
          )}
        </div>

        <div className="rounded-xl border bg-white p-5">
          <div className="grid grid-cols-2 gap-4 text-sm">

            <div>
              <p className="text-gray-500">Minimum Order</p>
              <p className="font-medium">
                {product.minOrder} {product.unit}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Status</p>
              <p className="font-medium">{product.status}</p>
            </div>

            <div>
              <p className="text-gray-500">HS Code</p>
              <p className="font-medium">{product.hsCode}</p>
            </div>

            <div>
              <p className="text-gray-500">Supplier</p>
              <p className="font-medium">
                {product.supplier?.companyName ?? "-"}
              </p>
            </div>

          </div>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold">
            Deskripsi Produk
          </h2>

          <p className="leading-7 text-gray-600">
            {product.description || "-"}
          </p>
        </div>

      </div>
    </div>
  </div>
</section>
  )
}