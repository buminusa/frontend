import type { ProductStatus } from "./types/api";

// Harus sama persis dengan enum ProductStatus di prisma/schema.prisma
export const STATUS_LIST: readonly ProductStatus[] = ["Active", "Pending", "Rejected", "Draft"] as const;

export const STATUS_COLOR: Record<ProductStatus, string> = {
  Active: "#10B981",
  Pending: "#F59E0B",
  Rejected: "#EF4444",
  Draft: "#6B7280",
};
