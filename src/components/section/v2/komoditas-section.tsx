import { fetchCategories } from "@/lib/api/server-categories";
import { getServerT } from "@/lib/langue/server";
import KomoditasCards from "./komoditas-cards";

export default async function KomoditasSection() {
  const categories = await fetchCategories();
  const t = await getServerT();

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
            <span className="text-neutral-800">{t("landing.komoditas.titlePrefix")} </span>
            <span className="bg-gradient-to-r from-green-500 via-green-400 to-green-600 bg-clip-text text-transparent">
              {t("landing.komoditas.titleAccent")}
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-500 max-w-xl leading-relaxed">
            {t("landing.komoditas.description")}
          </p>
        </div>

        <KomoditasCards categories={categories} />
      </div>
    </section>
  );
}
