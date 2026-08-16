import Image from "next/image";
import Link from "next/link";
import { fetchCategories } from "@/lib/api/server-categories";
import CategoryName from "@/components/category-name";

export default async function HeroCategories() {
  const categories = await fetchCategories(12);

  if (categories.length === 0) return null;

  return (
    <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {categories.map((category) => {
        const href = "/login";

        return (
          <Link
            key={category.id}
            href={href}
            className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            {category.image_url ? (
              <Image
                src={category.image_url}
                alt={category.name_categories}
                width={70}
                height={70}
                className="h-16 w-16 object-contain lg:h-20 lg:w-20"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-xs font-semibold text-green-900 lg:h-20 lg:w-20">
                {category.name_categories.slice(0, 2).toUpperCase()}
              </div>
            )}

            <span className="mt-4 text-center text-sm font-medium lg:text-base">
              <CategoryName category={category} />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
