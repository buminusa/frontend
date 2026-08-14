import { apiGet } from "@/lib/api/api";
import type { DashboardStats, Product, CompanyProfile } from "@/lib/types/api";

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const [suppliersRes, productsRes, categoriesRes] = await Promise.all([
      apiGet<CompanyProfile[]>("/api/v1/company-profiles?limit=100000"),
      apiGet<Product[]>("/api/v1/products?limit=100000"),
      apiGet<{ id: number; name_categories: string }[]>("/api/v1/categories?limit=100000"),
    ]);

    const suppliers = suppliersRes.data || [];
    const products = productsRes.data || [];
    const categories = categoriesRes.data || [];

    const categoryCountMap = new Map<string, number>();
    products.forEach((p) => {
      if (p.category?.name_categories) {
        const count = categoryCountMap.get(p.category.name_categories) || 0;
        categoryCountMap.set(p.category.name_categories, count + 1);
      }
    });

    return {
      suppliers: {
        total: suppliers.length,
        verified: suppliers.filter((s) => s.verificationStatus === "Verified").length,
        pending: suppliers.filter((s) => s.verificationStatus === "Pending").length,
        rejected: suppliers.filter((s) => s.verificationStatus === "Rejected").length,
      },
      products: {
        total: products.length,
      },
      categories: {
        total: categories.length,
        categories: Array.from(categoryCountMap.entries())
          .map(([nama, jumlah]) => ({ nama, jumlah }))
          .sort((a, b) => b.jumlah - a.jumlah)
          .slice(0, 8),
      },
    };
  },

  async getPendingVerifications(): Promise<CompanyProfile[]> {
    const res = await apiGet<CompanyProfile[]>("/api/v1/company-profiles?status=Pending");
    return res.data || [];
  },

  async getPopularProducts(limit: number = 5): Promise<Product[]> {
    const res = await apiGet<Product[]>(`/api/v1/products/popular?limit=${limit}`);
    return res.data || [];
  },
};
