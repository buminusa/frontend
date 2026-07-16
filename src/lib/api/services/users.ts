import { apiGet, apiPut, apiDelete, apiPatch } from "@/lib/api/api";
import type { ApiResponse, User } from "@/lib/types/api";

export const userService = {
  async getAll(): Promise<ApiResponse<User[]>> {
    return apiGet<User[]>("/api/v1/users");
  },

  async getById(id: number): Promise<ApiResponse<User>> {
    return apiGet<User>(`/api/v1/users/${id}`);
  },

  async update(id: number, data: { email?: string }): Promise<ApiResponse<User>> {
    return apiPut<User>(`/api/v1/users/${id}`, data);
  },

  async delete(id: number): Promise<void> {
    await apiDelete(`/api/v1/users/${id}`);
  },

  async assignRole(id: number, roleId: number): Promise<void> {
    await apiPatch(`/api/v1/users/${id}/role`, { roleId });
  },
};
