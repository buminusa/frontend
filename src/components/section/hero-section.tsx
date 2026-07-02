import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const hero = {
    labels: ["Transparan", "Efisien", "Terpercaya"]
  }

  const categories = [
    { name: "Rempah-rempah", image: "/rempah.png" },
    { name: "Hasil Bumi", image: "/hasil_bumi.png" },
    { name: "Perkebunan", image: "/perkebunan.png" },
    { name: "Hortikultura", image: "/Hortikultura.png" }
  ]

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
              {hero.labels.join(" • ")}
            </p>

            <Button className="mt-6 h-11 w-full rounded-xl bg-yellow-400 text-base font-semibold text-[#1A3A1B] hover:bg-yellow-500 sm:w-56 lg:h-14 lg:w-72 lg:text-lg">
              Jelajahi Produk
            </Button>
          </div>
        </div>
      </section>

      {/* ================= CATEGORY ================= */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1A3A1B] lg:text-3xl">
            Kategori Komoditas
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <div
                key={category.name}
                className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={70}
                  height={70}
                  className="h-16 w-16 object-contain lg:h-20 lg:w-20"
                />

                <span className="mt-4 text-center text-sm font-medium lg:text-base">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}