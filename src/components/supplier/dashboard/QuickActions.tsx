import {
  Plus,
  Package,
  Users,
  Settings,
  FileText,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const actions = [
  {
    icon: Plus,
    label: "Tambah Produk",
    href: "/suplier/products",
    color: "bg-green-500",
  },
  {
    icon: Package,
    label: "Kelola Produk",
    href: "/suplier/products",
    color: "bg-blue-500",
  },
  {
    icon: FileText,
    label: "Lihat Pesanan",
    href: "/suplier/dashboard",
    color: "bg-purple-500",
  },
  {
    icon: Users,
    label: "Profil Supplier",
    href: "/suplier/profile",
    color: "bg-yellow-500",
  },
  {
    icon: TrendingUp,
    label: "Analitik",
    href: "/suplier/dashboard",
    color: "bg-indigo-500",
  },
  {
    icon: Settings,
    label: "Pengaturan",
    href: "/suplier/profile",
    color: "bg-gray-500",
  },
];

export function QuickActions() {
  return <></>;
}
