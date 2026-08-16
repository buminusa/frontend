"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, LogOut } from "lucide-react";
import { clearAuthToken } from "@/lib/auth";
import { redirectByRole } from "@/lib/redirect";
import { useLanguage } from "@/lib/langue/provider";

const menuItems = [
  { icon: LayoutDashboard, labelKey: "supplier.sidebar.dashboard", href: "/dashboard/supplier" },
  { icon: Package, labelKey: "supplier.sidebar.products", href: "/dashboard/supplier/products" },
  { icon: ShoppingCart, labelKey: "supplier.sidebar.orders", href: "/dashboard/supplier/orders" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();

  const handleLogout = () => {
    clearAuthToken();
    redirectByRole(null, router);
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-[#33A853]">{t("supplier.sidebar.panel")}</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-blue-50 text-[#33A853]"
                    : "text-gray-700 hover:bg-gray-50 hover:text-[#33A853]"
                }
              `}
            >
              <item.icon
                className={`w-5 h-5 ${isActive ? "text-[#33A853]" : "text-gray-400"}`}
              />
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-5 h-5" />
          {t("supplier.sidebar.logout")}
        </button>
      </div>
    </aside>
  );
}
