import {
  LayoutGrid,
  Warehouse,
  Package,
  ShoppingCart,
  Tags,
  ShieldCheck,
  FileBarChart,
  Settings,
} from "lucide-react";
import type { MenuItemType, ProductStatus } from "./types/dashboard";

export const MENU_ITEMS: MenuItemType[] = [
  { icon: LayoutGrid, label: "Dashboard", active: true },
  { icon: Warehouse, label: "Supplier" },
  { icon: Package, label: "Produk" },
  { icon: ShoppingCart, label: "Pesanan" },
  { icon: Tags, label: "Kategori" },
  { icon: ShieldCheck, label: "Verifikasi" },
  { icon: FileBarChart, label: "Laporan" },
  { icon: Settings, label: "Pengaturan" },
];

// Harus sama persis dengan enum ProductStatus di prisma/schema.prisma
export const STATUS_LIST: readonly ProductStatus[] = ["Active", "Pending", "Rejected", "Draft"] as const;

export const STATUS_COLOR: Record<ProductStatus, string> = {
  Active: "#10B981",
  Pending: "#F59E0B",
  Rejected: "#EF4444",
  Draft: "#6B7280",
};