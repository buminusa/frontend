import { fetchCategories } from "@/lib/api/server-categories";
import KomoditasCards from "./v2/komoditas-cards";

export default async function HeroCategories() {
  const categories = await fetchCategories();

  if (categories.length === 0) return null;

  return (
    <div className="mt-8">
      <KomoditasCards categories={categories} />
    </div>
  );
}