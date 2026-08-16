import type { Lang } from "@/lib/langue";

type CategoryLike = {
  name_categories: string;
  name_categories_en?: string | null;
  slug?: string | null;
};

// Categories created before bilingual names were added still get a useful
// English label. New categories should provide name_categories_en from the CMS.
const LEGACY_ENGLISH_NAMES: Record<string, string> = {
  "padi": "Rice",
  "hasil-bumi": "Agricultural Products",
  "padi-beras": "Rice & Paddy",
  "padi-dan-beras": "Rice & Paddy",
  "perkebunan": "Plantations",
  "hortikultura": "Horticulture",
  "rempah": "Spices",
  "rempah-rempah": "Spices",
  "perikanan": "Fisheries",
  "peternakan": "Livestock",
  "kopi": "Coffee",
  "kakao": "Cocoa",
  "jagung": "Corn",
};

function normalizeCategoryName(name: string) {
  return name
    .toLocaleLowerCase("id-ID")
    .replace(/&/g, " dan ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getLocalizedCategoryName(category: CategoryLike, lang: Lang) {
  if (lang === "id") return category.name_categories;

  return (
    category.name_categories_en?.trim() ||
    LEGACY_ENGLISH_NAMES[category.slug ?? ""] ||
    LEGACY_ENGLISH_NAMES[normalizeCategoryName(category.name_categories)] ||
    category.name_categories
  );
}
