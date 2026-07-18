import { apiGet, apiPatch, apiDelete, apiPost } from "@/lib/api/api";
import type { ApiResponse, Order } from "@/lib/types/api";

export const orderService = {
  async create(payload: {
    items: Array<{ productId: number; quantity: number }>;
    shipping_address: string;
    notes?: string;
  }) {
    return apiPost<Order>("/api/v1/orders", payload);
  },

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
