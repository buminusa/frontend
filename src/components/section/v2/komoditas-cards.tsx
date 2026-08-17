"use client"

import Image from "next/image"
import Link from "next/link"
import { useCategoryGuard } from "@/lib/hooks/use-category-guard"
import type { Category } from "@/lib/types/api"

export default function KomoditasCards({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {categories.map((item) =>
        item.slug ? <KomoditasCard key={item.id} item={item} /> : null
      )}
    </div>
  )
}

function KomoditasCard({ item }: { item: Category }) {
  const navigate = useCategoryGuard()
  const href = `/komoditas?categorySlug=${item.slug}`

  function handleClick() {
    navigate(href)
  }

  return (
    <Link
      href={href}
      onClick={(e) => {
        e.preventDefault()
        handleClick()
      }}
      className="group relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[5/4] cursor-pointer block"
    >
      {item.image_url ? (
        <Image
          src={item.image_url}
          alt={item.name_categories}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-green-950/10 flex items-center justify-center">
          <svg className="w-12 h-12 text-green-900/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-green-950/95 via-green-950/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
        <h3 className="text-white text-base sm:text-lg font-medium mb-2">
          {item.name_categories}
        </h3>
        <span className="block h-0.5 w-8 bg-amber-400 transition-all duration-500 ease-out group-hover:w-16" />
      </div>
    </Link>
  )
}