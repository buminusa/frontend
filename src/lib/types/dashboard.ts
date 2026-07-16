import type { LucideIcon } from "lucide-react";

export type { CompanyProfile, Product, Category, ProductStatus, DashboardStats } from "./api";

export interface MenuItemType {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  href?: string;
}

export interface CategoryCount {
  nama: string;
  jumlah: number;
}
