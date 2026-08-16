"use client";

import { useEffect, useState } from "react";
import { LayoutGrid, Tag } from "lucide-react";
import CategoryChip from "../category-chip";
import Pagination from "../pagination";
import ProductCard from "../product-card";
import { AUTH_EVENT_NAME, getAuthToken } from "@/lib/auth";
import { useLanguage } from "@/lib/langue/provider";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080").replace(/\/$/, "");
const PRODUCTS_PER_PAGE = 18;

type ApiProduct = {
  id: number;
  nama: string;
  slug: string | null;
  price_min: string | number;
  category: { id: number; name_categories: string } | null;
  supplier: { company_name: string; address?: string | null } | null;
  images: { image_url: string }[];
};

type Product = {
  id: number
  slug: string
  name: string
  image: string
  location: string
  category: string
}

type Category = {
  id: number;
  name: string;
};

export default function AllCommoditySection({
  initialKeyword = "",
  initialCategoryId = null,
}: {
  initialKeyword?: string;
  initialCategoryId?: number | null;
}) {
  const { t } = useLanguage();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(initialCategoryId);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const keyword = initialKeyword
  const [prevFilter, setPrevFilter] = useState<{ keyword: string; selectedCategoryId: number | null }>(() => ({
    keyword,
    selectedCategoryId,
  }));
  const [lastCategoryId, setLastCategoryId] = useState(initialCategoryId);

  if (lastCategoryId !== initialCategoryId) {
    setLastCategoryId(initialCategoryId);
    setSelectedCategoryId(initialCategoryId);
  }

  // reset back to page 1 whenever the search term or category changes
  if (prevFilter.keyword !== keyword || prevFilter.selectedCategoryId !== selectedCategoryId) {
    setPrevFilter({ keyword, selectedCategoryId });
    setCurrentPage(1);
  }

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      const token = getAuthToken();

      setIsLoading(true);
      setError("");

      const params = new URLSearchParams({
        page: String(currentPage),
        limit: String(PRODUCTS_PER_PAGE),
      });

      if (selectedCategoryId !== null) {
        params.set("categoryId", String(selectedCategoryId));
      }

      if (keyword.trim()) {
        params.set("search", keyword)
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/products?${params}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          signal: controller.signal,
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || t("komoditas.list.errorLoad"));
        }

        const apiProducts = result.data as ApiProduct[];

        setProducts(
          apiProducts.map((product) => ({
            id: product.id,
            slug: product.slug ?? String(product.id),
            name: product.nama,
            image: product.images[0]?.image_url ?? "/hasil_bumi.png",
            location: product.supplier?.address ?? t("komoditas.list.locationFallback"),
            category: product.category?.name_categories ?? t("komoditas.list.otherCategory"),
          }))
        )
        setTotalPages(result.meta?.totalPages ?? 1);
        setCategories((currentCategories) => {
          const nextCategories = new Map(currentCategories.map((category) => [category.id, category]));

          apiProducts.forEach((product) => {
            if (product.category) {
              nextCategories.set(product.category.id, {
                id: product.category.id,
                name: product.category.name_categories,
              });
            }
          });

          return Array.from(nextCategories.values());
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setError(error instanceof Error ? error.message : t("komoditas.list.errorLoad"));
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    loadProducts();
    window.addEventListener(AUTH_EVENT_NAME, loadProducts);

    return () => {
      controller.abort();
      window.removeEventListener(AUTH_EVENT_NAME, loadProducts);
    };
  }, [currentPage, selectedCategoryId, keyword, t]);

  function selectCategory(categoryId: number | null) {
    setSelectedCategoryId(categoryId);
  }

  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-8 text-3xl font-bold">{t("komoditas.list.title")}</h2>

        <div className="mb-10 flex gap-3 overflow-x-auto pb-2">
          <CategoryChip
            name={t("komoditas.list.all")}
            icon={LayoutGrid}
            active={selectedCategoryId === null}
            onClick={() => selectCategory(null)}
          />

          {categories.map((category) => (
            <CategoryChip
              key={category.id}
              name={category.name}
              icon={Tag}
              active={category.id === selectedCategoryId}
              onClick={() => selectCategory(category.id)}
            />
          ))}
        </div>

        <div className="mb-10 grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-6">
          {isLoading && <p className="col-span-full text-sm text-gray-500">{t("komoditas.list.loading")}</p>}
          {!isLoading && error && <p className="col-span-full text-sm text-red-600">{error}</p>}
          {!isLoading && !error && products.length === 0 && (
            <p className="col-span-full text-sm text-gray-500">{t("komoditas.list.empty")}</p>
          )}
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {!isLoading && !error && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </section>
  );
}
