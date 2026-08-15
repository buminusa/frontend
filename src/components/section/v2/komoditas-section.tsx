import Image from 'next/image';
import Link from 'next/link';
import { fetchCategories } from "@/lib/api/server-categories";

export default async function KomoditasSection() {
  const categories = await fetchCategories(6);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 py-20 sm:py-24 md:py-50 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 sm:w-14 h-px bg-amber-400/50" />
            <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c1.5 3 1.5 6 0 9-1.5-3-1.5-6 0-9zM12 22c-1.5-3-1.5-6 0-9 1.5 3 1.5 6 0 9zM2 12c3-1.5 6-1.5 9 0-3 1.5-6 1.5-9 0zM22 12c-3 1.5-6 1.5-9 0 3-1.5 6-1.5 9 0z" />
            </svg>
            <span className="w-10 sm:w-14 h-px bg-amber-400/50" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-3 sm:mb-4">
            <span className="text-neutral-800">Sedia </span>
            <span className="bg-gradient-to-r from-green-500 via-green-400 to-green-600 bg-clip-text text-transparent">
              Komoditas
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-500 max-w-xl leading-relaxed">
            Menyediakan berbagai macam kategori komoditas pilihan untuk memenuhi kebutuhan
            pasar lokal dan global.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {categories.map((item) => (
            <Link
              key={item.id}
              href="/login"
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[5/4] cursor-pointer"
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
          ))}
        </div>
      </div>
    </section>
  );
}