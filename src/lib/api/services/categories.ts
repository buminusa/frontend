import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api/api";
import type { ApiResponse, Category } from "@/lib/types/api";

export const categoryService = {
  async getAll(limit = 10): Promise<ApiResponse<Category[]>> {
    return apiGet<Category[]>(`/api/v1/categories?limit=${limit}`);
  },

  async getById(id: number): Promise<ApiResponse<Category>> {
    return apiGet<Category>(`/api/v1/categories/${id}`);
  },

  async getBySlug(slug: string): Promise<ApiResponse<Category>> {
    return apiGet<Category>(`/api/v1/categories/slug/${slug}`);
  },

  async create(data: { name_categories: string }): Promise<ApiResponse<Category>> {
    return apiPost<Category>("/api/v1/categories", data);
  },

  async update(id: number, data: { name_categories: string }): Promise<ApiResponse<Category>> {
    return apiPut<Category>(`/api/v1/categories/${id}`, data);
  },

  async delete(id: number): Promise<void> {
    await apiDelete(`/api/v1/categories/${id}`);
  },
};
