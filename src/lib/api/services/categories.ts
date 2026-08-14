import { apiGet, apiPost, apiPut, apiDelete } from "@/lib/api/api";
import type { ApiResponse, Category } from "@/lib/types/api";

export const categoryService = {
  async getAll(limit = 1000): Promise<ApiResponse<Category[]>> {
    return apiGet<Category[]>(`/api/v1/categories?limit=${limit}`);
  },

  async getById(id: number): Promise<ApiResponse<Category>> {
    return apiGet<Category>(`/api/v1/categories/${id}`);
  },

  async getBySlug(slug: string): Promise<ApiResponse<Category>> {
    return apiGet<Category>(`/api/v1/categories/slug/${slug}`);
  },

  async create(formData: FormData): Promise<ApiResponse<Category>> {
    return apiPost<Category>("/api/v1/categories", formData);
  },

  async update(id: number, formData: FormData): Promise<ApiResponse<Category>> {
    return apiPut<Category>(`/api/v1/categories/${id}`, formData);
  },

  async delete(id: number): Promise<void> {
    await apiDelete(`/api/v1/categories/${id}`);
  },
};
