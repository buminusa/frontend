import Image from "next/image"
import { Button } from "@/components/ui/button"
import HeroCategories from "@/components/section/hero-categories"

export default function Hero() {
  const hero = {
    labels: ["Efisien", "Terpercaya"]
  }

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative h-[300px] w-full overflow-hidden sm:h-[380px] lg:h-[500px]">
        <Image
          src="/hero.png"
          alt="Hero"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
              Platform Aggregator
              <br />
              Komoditas Indonesia
            </h1>

            <p className="mt-4 text-sm font-semibold text-white/90 sm:text-base lg:text-lg">
              {hero.labels.join(" , ")}
            </p>

            <Button className="mt-6 h-11 w-full rounded-xl bg-yellow-400 text-base font-semibold text-[#1A3A1B] lg:h-14 lg:w-72 lg:text-lg cursor-pointer">
              Jelajahi Produk
            </Button>
          </div>
        </div>
      </section>

      {/* ================= CATEGORY ================= */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1A3A1B] lg:text-3xl">
            Sedia Komoditas
          </h2>

          <HeroCategories />
        </div>
      </section>
    </>
  )
}