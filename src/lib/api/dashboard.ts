import { apiGet, apiPatch, UnauthorizedError } from "./api";
import type { CompanyProfile, Product, CategoryCount, ProductStatus } from "@/lib/types/dashboard";

// Types for API responses
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

interface SupplierStats {
  total: number;
  verified: number;
  pending: number;
  rejected: number;
}

interface ProductStats {
  total: number;
  active: number;
  pending: number;
  rejected: number;
  draft: number;
}

interface CategoryStats {
  total: number;
  categories: CategoryCount[];
}

interface DashboardStats {
  suppliers: SupplierStats;
  products: ProductStats;
  categories: CategoryStats;
}

// Dashboard API functions
export const dashboardApi = {
  // Get dashboard statistics
  async getStats(): Promise<DashboardStats> {
    try {
      // Fetch supplier stats
      const suppliersRes = await apiGet<CompanyProfile[]>("/api/v1/company-profiles");
      const suppliers = suppliersRes.data || [];
      
      // Fetch product stats
      const productsRes = await apiGet<Product[]>("/api/v1/products");
      const products = productsRes.data || [];
      
      // Fetch categories
      const categoriesRes = await apiGet<any[]>("/api/v1/categories");
      const categories = categoriesRes.data || [];
      
      // Calculate supplier stats
      const supplierStats: SupplierStats = {
        total: suppliers.length,
        verified: suppliers.filter(s => s.verificationStatus === "Verified").length,
        pending: suppliers.filter(s => s.verificationStatus === "Pending").length,
        rejected: suppliers.filter(s => s.verificationStatus === "Rejected").length,
      };
      
      // Calculate product stats
      const productStats: ProductStats = {
        total: products.length,
        active: products.filter(p => p.status === "Active").length,
        pending: products.filter(p => p.status === "Pending").length,
        rejected: products.filter(p => p.status === "Rejected").length,
        draft: products.filter(p => p.status === "Draft").length,
      };
      
      // Calculate category stats with product counts
      const categoryCountMap = new Map<string, number>();
      products.forEach(p => {
        if (p.category?.name_categories) {
          const count = categoryCountMap.get(p.category.name_categories) || 0;
          categoryCountMap.set(p.category.name_categories, count + 1);
        }
      });
      
      const categoryStats: CategoryStats = {
        total: categories.length,
        categories: Array.from(categoryCountMap.entries())
          .map(([nama, jumlah]) => ({ nama, jumlah }))
          .sort((a, b) => b.jumlah - a.jumlah)
          .slice(0, 8),
      };
      
      return {
        suppliers: supplierStats,
        products: productStats,
        categories: categoryStats,
      };
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw error;
      }
      throw new Error("Gagal memuat statistik dashboard");
    }
  },

  // Get pending verifications
  async getPendingVerifications(): Promise<CompanyProfile[]> {
    try {
      const res = await apiGet<CompanyProfile[]>("/api/v1/company-profiles?status=Pending");
      return res.data || [];
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw error;
      }
      throw new Error("Gagal memuat data verifikasi");
    }
  },

  // Get popular products
  async getPopularProducts(limit: number = 5): Promise<Product[]> {
    try {
      const res = await apiGet<Product[]>(`/api/v1/products?sort=views&order=desc&limit=${limit}`);
      return res.data || [];
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw error;
      }
      throw new Error("Gagal memuat produk terpopuler");
    }
  },

  // Verify supplier
  async verifySupplier(id: number, status: "Verified" | "Rejected"): Promise<void> {
    try {
      await apiPatch(`/api/v1/company-profiles/${id}/verify`, { status });
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw error;
      }
      throw new Error(`Gagal ${status === "Verified" ? "menyetujui" : "menolak"} supplier`);
    }
  },
};
