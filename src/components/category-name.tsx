"use client";

import { getLocalizedCategoryName } from "@/lib/categories";
import { useLanguage } from "@/lib/langue/provider";

export default function CategoryName({
  category,
}: {
  category: {
    name_categories: string;
    name_categories_en?: string | null;
    slug?: string | null;
  };
}) {
  const { lang } = useLanguage();
  return getLocalizedCategoryName(category, lang);
}
