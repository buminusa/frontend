import { apiGet, apiPost, apiPut, apiDelete, apiPatch } from "@/lib/api/api";
import type { ApiResponse, Product } from "@/lib/types/api";

export const productService = {
  async getAll(): Promise<ApiResponse<Product[]>> {
    return apiGet<Product[]>("/api/v1/products");
  },

  async getMy(): Promise<ApiResponse<Product[]>> {
    return apiGet<Product[]>("/api/v1/products/me");
  },

  async getById(id: number): Promise<ApiResponse<Product>> {
    return apiGet<Product>(`/api/v1/products/${id}`);
  },

  async getBySlug(slug: string): Promise<ApiResponse<Product>> {
    return apiGet<Product>(`/api/v1/products/slug/${slug}`);
  },

  async getPopular(limit: number = 5): Promise<Product[]> {
    const res = await apiGet<Product[]>(`/api/v1/products/popular?limit=${limit}`);
    return res.data || [];
  },

  async create(formData: FormData): Promise<ApiResponse<Product>> {
    return apiPost<Product>("/api/v1/products", formData);
  },

  async update(id: number, formData: FormData): Promise<ApiResponse<Product>> {
    return apiPut<Product>(`/api/v1/products/${id}`, formData);
  },

  async updateStatus(id: number, status: string): Promise<void> {
    await apiPatch(`/api/v1/products/${id}/status`, { status });
  },

  async delete(id: number): Promise<void> {
    await apiDelete(`/api/v1/products/${id}`);
  },

  async deleteImage(imageId: number): Promise<void> {
    await apiDelete(`/api/v1/products/images/${imageId}`);
  },
};
