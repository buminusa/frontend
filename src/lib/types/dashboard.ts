import type { LucideIcon } from "lucide-react";

export interface CompanyProfile {
  id: number;
  company_name: string;
  province: string;
  country: string;
  verificationStatus: "Pending" | "Verified" | "Rejected";
  createdAt: string;
}

export interface Product {
  id: number;
  nama: string;
  views: number;
  status?: ProductStatus;
  category: { name_categories: string } | null;
  supplier: { company_name: string } | null;
}

export interface Category {
  id: number;
  name_categories: string;
}

export interface MenuItemType {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

export interface CategoryCount {
  nama: string;
  jumlah: number;
}

export type ProductStatus = "Active" | "Pending" | "Rejected" | "Draft";