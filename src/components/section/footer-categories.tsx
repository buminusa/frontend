"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CategoryName from "@/components/category-name";
import { useCategoryGuard } from "@/lib/hooks/use-category-guard";
import type { Category } from "@/lib/types/api";

export default function FooterCategories({ categories }: { categories: Category[] }) {
  const navigate = useCategoryGuard();

  if (categories.length === 0) return null;

  return (
    <ul className="space-y-2">
      {categories.map((category) => {
        if (!category.slug) return null;
        const href = `/komoditas?categorySlug=${category.slug}`;
        return (
          <li key={category.id}>
            <Link
              href={href}
              onClick={(e) => {
                e.preventDefault();
                navigate(href);
              }}
              className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition-colors"
            >
              <ChevronRight className="w-3 h-3" />
              <CategoryName category={category} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}