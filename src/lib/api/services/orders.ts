import { apiGet, apiPatch, apiDelete } from "@/lib/api/api";
import type { ApiResponse, Order } from "@/lib/types/api";

export const orderService = {
  async getAll(): Promise<ApiResponse<Order[]>> {
    return apiGet<Order[]>("/api/v1/orders");
  },

  async getById(id: number): Promise<ApiResponse<Order>> {
    return apiGet<Order>(`/api/v1/orders/${id}`);
  },

  async getMyOrdersAsBuyer(): Promise<ApiResponse<Order[]>> {
    return apiGet<Order[]>("/api/v1/orders/buyer/my-orders");
  },

  async getMyOrdersAsSupplier(): Promise<ApiResponse<Order[]>> {
    return apiGet<Order[]>("/api/v1/orders/supplier/my-orders");
  },

  async updateStatus(id: number, status: string): Promise<void> {
    await apiPatch(`/api/v1/orders/${id}/status`, { status });
  },

  async cancel(id: number): Promise<void> {
    await apiPatch(`/api/v1/orders/${id}/cancel`, {});
  },

  async delete(id: number): Promise<void> {
    await apiDelete(`/api/v1/orders/${id}`);
  },
};
