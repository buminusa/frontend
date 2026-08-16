"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/langue/provider"

const images = [
  "/img1.webp",
  "/img2.webp",
  "/img3.webp",
  "/img5.webp",
]

export default function HeroHomeV2() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [search, setSearch] = useState("")
  const router = useRouter()
  const { t } = useLanguage()

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [])

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(nextSlide, 4000)

    return () => clearInterval(interval)
  }, [nextSlide, isPaused])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()

    const keyword = search.trim()

    if (!keyword) {
      router.push("/komoditas")
      return
    }

    router.push(`/komoditas?search=${encodeURIComponent(keyword)}`)
  }

  return (
    <section
      className="relative h-[520px] w-full overflow-hidden bg-black md:h-[580px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slider */}

      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex
              ? "z-10 opacity-100"
              : "z-0 opacity-0"
          }`}
        >
          <Image
            src={image}
            alt={t("landing.heroHome.slideAlt", { n: index + 1 })}
            fill
            priority={index === 0}
            sizes="100vw"
            quality={90}
            className="object-cover object-center"
          />
        </div>
      ))}

      {/* Overlay */}

      <div className="absolute inset-0 z-10 bg-black/55" />

      {/* Content */}

      <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
        <div className="w-full max-w-4xl text-center text-white">

          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-green-400">
            Bumi Nusa
          </p>

          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            {t("landing.heroHome.titleLine1")}
            <br />
            <span className="text-green-500">
              {t("landing.heroHome.titleLine2")}
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/80 md:text-lg">
            {t("landing.heroHome.subtitle")}
          </p>

          {/* Search */}

          <form
            onSubmit={handleSearch}
            className="mx-auto mt-8 ocus:outline-none flex w-full max-w-2xl items-center rounded-2xl bg-white p-1.5 shadow-2xl"
          >
            <Search
              size={21}
              className="ml-3 shrink-0 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("common.searchPlaceholder")}
              className="h-12 min-w-0 flex-1 bg-transparent px-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 md:text-base"
            />

            <button
              type="submit"
              className="flex h-12 shrink-0 items-center gap-2 rounded-xl bg-green-600 px-5 text-sm font-semibold text-white transition hover:bg-green-700 md:px-6"
            >
              {t("common.search")}
              <ArrowRight size={17} />
            </button>
          </form>

          {/* Quick CTA */}

          <div className="mt-6 flex justify-center">
            <Link
              href="/komoditas"
              className="text-sm font-medium text-white/80 underline decoration-white/30 underline-offset-4 transition hover:text-white hover:decoration-white"
            >
              {t("landing.heroHome.viewAll")}
            </Link>
          </div>

        </div>
      </div>

      {/* Slider Indicator */}

      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            aria-label={t("landing.heroHome.slideIndicator", { n: index + 1 })}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex
                ? "w-8 bg-white"
                : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  )
}