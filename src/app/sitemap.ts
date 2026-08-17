import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { productService } from "@/lib/api/services";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/komoditas`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await productService.getAll();
    const products = res.data ?? [];
    productRoutes = products
      .filter((product) => product.slug)
      .map((product) => ({
        url: `${SITE_URL}/komoditas/${product.slug}`,
        lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
  } catch {
    // Jangan gagalkan build bila API tidak tersedia saat sitemap di-generate
  }

  return [...staticRoutes, ...productRoutes];
}
