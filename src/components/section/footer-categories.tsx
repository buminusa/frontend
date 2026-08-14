import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { fetchCategories } from "@/lib/api/server-categories";

export default async function FooterCategories() {
  const categories = await fetchCategories(6);

  if (categories.length === 0) return null;

  return (
    <ul className="space-y-2">
      {categories.map((category) => (
        <li key={category.id}>
          <Link
            href={`/komoditas/${category.slug}`}
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <ChevronRight className="w-3 h-3" />
            {category.name_categories}
          </Link>
        </li>
      ))}
    </ul>
  );
}