import {
  LayoutGrid,
  Warehouse,
  Package,
  ShoppingCart,
  Tags,
  ShieldCheck,
  Crown,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  type LucideIcon,
} from "lucide-react";
import type { OrderStatus } from "@/lib/types/api";

export interface MenuItem {
  icon: LucideIcon;
  labelKey: string;
  href: string;
}

export const BASE_MENU_ITEMS: MenuItem[] = [
  { icon: LayoutGrid, labelKey: "dashboard.sidebar.dashboard", href: "/dashboard/admin" },
  { icon: Warehouse, labelKey: "dashboard.sidebar.suppliers", href: "/dashboard/admin/suppliers" },
  { icon: Package, labelKey: "dashboard.sidebar.products", href: "/dashboard/admin/products" },
  { icon: ShoppingCart, labelKey: "dashboard.sidebar.orders", href: "/dashboard/admin/orders" },
  { icon: Tags, labelKey: "dashboard.sidebar.categories", href: "/dashboard/admin/categories" },
  { icon: ShieldCheck, labelKey: "dashboard.sidebar.verification", href: "/dashboard/admin/verification" },
];

export const SUPER_ADMIN_MENU_ITEMS: MenuItem[] = [
  { icon: LayoutGrid, labelKey: "dashboard.sidebar.dashboard", href: "/dashboard/super-admin" },
  { icon: Crown, labelKey: "dashboard.sidebar.roles", href: "/dashboard/super-admin/roles" },
  { icon: Warehouse, labelKey: "dashboard.sidebar.suppliers", href: "/dashboard/super-admin/suppliers" },
  { icon: Package, labelKey: "dashboard.sidebar.products", href: "/dashboard/super-admin/products" },
  { icon: ShoppingCart, labelKey: "dashboard.sidebar.orders", href: "/dashboard/super-admin/orders" },
  { icon: Tags, labelKey: "dashboard.sidebar.categories", href: "/dashboard/super-admin/categories" },
  { icon: ShieldCheck, labelKey: "dashboard.sidebar.verification", href: "/dashboard/super-admin/verification" },
];

export interface OrderStatusConfig {
  color: string;
  icon: LucideIcon;
  labelKey: string;
}

export const ORDER_STATUS_CONFIG: Record<OrderStatus, OrderStatusConfig> = {
  Pending: { color: "bg-yellow-100 text-yellow-700", icon: Clock, labelKey: "dashboard.status.pending" },
  Confirmed: { color: "bg-blue-100 text-blue-700", icon: CheckCircle, labelKey: "dashboard.status.confirmed" },
  Processing: { color: "bg-indigo-100 text-indigo-700", icon: Package, labelKey: "dashboard.status.processing" },
  Shipped: { color: "bg-purple-100 text-purple-700", icon: Truck, labelKey: "dashboard.status.shipped" },
  Completed: { color: "bg-emerald-100 text-emerald-700", icon: CheckCircle, labelKey: "dashboard.status.completed" },
  Cancelled: { color: "bg-red-100 text-red-700", icon: XCircle, labelKey: "dashboard.status.cancelled" },
};

export type VerificationStatus = "Verified" | "Pending" | "Rejected";

export const VERIFICATION_STATUS_COLORS: Record<VerificationStatus, string> = {
  Verified: "bg-emerald-100 text-emerald-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Rejected: "bg-red-100 text-red-700",
};

export const VERIFICATION_STATUS_KEYS: Record<VerificationStatus, string> = {
  Verified: "dashboard.status.verified",
  Pending: "dashboard.status.pendingVerification",
  Rejected: "dashboard.status.rejected",
};
