"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  LayoutGrid,
  Warehouse,
  Package,
  ShoppingCart,
  Tags,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  LogOut,
  HelpCircle,
  Zap,
  Crown,
} from "lucide-react";

const BASE_MENU_ITEMS = [
  { icon: LayoutGrid, label: "Dashboard", href: "/dashboard/admin" },
  { icon: Warehouse, label: "Supplier", href: "/dashboard/admin/suppliers" },
  { icon: Package, label: "Produk", href: "/dashboard/admin/products" },
  { icon: ShoppingCart, label: "Pesanan", href: "/dashboard/admin/orders" },
  { icon: Tags, label: "Kategori", href: "/dashboard/admin/categories" },
  { icon: ShieldCheck, label: "Verifikasi", href: "/dashboard/admin/verification" },
];

const SUPER_ADMIN_MENU_ITEMS = [
  { icon: LayoutGrid, label: "Dashboard", href: "/dashboard/super-admin" },
  { icon: Crown, label: "Manajemen Role", href: "/dashboard/super-admin/roles" },
  { icon: Warehouse, label: "Supplier", href: "/dashboard/super-admin/suppliers" },
  { icon: Package, label: "Produk", href: "/dashboard/super-admin/products" },
  { icon: Tags, label: "Kategori", href: "/dashboard/super-admin/categories" },
  { icon: ShieldCheck, label: "Verifikasi", href: "/dashboard/super-admin/verification" },
];

export function Sidebar({
  basePath = "/dashboard/admin",
  roleLabel = "Admin",
}: {
  basePath?: string;
  roleLabel?: string;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isSuperAdminRoute = pathname?.startsWith("/dashboard/super-admin") || basePath.startsWith("/dashboard/super-admin");
  const MENU_ITEMS = isSuperAdminRoute ? SUPER_ADMIN_MENU_ITEMS : BASE_MENU_ITEMS;
  const displayRoleLabel = isSuperAdminRoute ? "Super Admin" : roleLabel;

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-[#0B1121] flex flex-col z-40 transition-all duration-300 ease-in-out border-r border-white/[0.06] ${
        collapsed ? "w-[72px]" : "w-[264px]"
      }`}
      role="navigation"
      aria-label="Sidebar navigasi"
    >
      {/* Brand */}
      <div className="flex items-center justify-between px-4 h-[68px] border-b border-white/[0.06]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center text-white shadow-lg shadow-blue-500/20 flex-shrink-0">
            <Zap size={18} strokeWidth={2.5} />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="font-semibold text-white text-[13px] tracking-wide leading-tight">
                BUMI NUSA
              </div>
              <div className="text-[10px] text-blue-400/80 font-medium leading-tight mt-0.5">
                {displayRoleLabel}
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-white/[0.08] transition-all duration-200 hidden lg:flex text-gray-500 hover:text-white flex-shrink-0"
          aria-label={collapsed ? "Perluas sidebar" : "Ciutkan sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Menu Sections */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-hide">
        {!collapsed && (
          <div className="px-3 mb-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-[0.12em]">
            Menu Utama
          </div>
        )}

        <div className="space-y-1">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <div key={item.label} className="relative">
                <Link
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`group flex items-center gap-3 relative rounded-xl text-[13px] font-medium transition-all duration-200 outline-none ${
                    collapsed ? "px-0 py-2.5 justify-center" : "px-3 py-2.5"
                  } ${
                    isActive
                      ? "bg-[#3B82F6]/10 text-white"
                      : "text-gray-400 hover:bg-white/[0.06] hover:text-gray-200"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={collapsed ? item.label : undefined}
                >
                  {/* Active indicator - left bar */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#3B82F6] rounded-r-full" />
                  )}

                  <item.icon
                    size={20}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    className={`flex-shrink-0 transition-colors duration-200 ${
                      isActive
                        ? "text-[#3B82F6]"
                        : "text-gray-500 group-hover:text-gray-300"
                    }`}
                  />

                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>

                {/* Tooltip for collapsed state */}
                {collapsed && hoveredItem === item.label && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none animate-fadeIn">
                    {item.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] border-r-gray-900" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="px-3 pb-3 border-t border-white/[0.06] pt-3">
        {/* Help Card */}
        {!collapsed ? (
          <div className="bg-gradient-to-br from-[#3B82F6]/10 to-[#2563EB]/10 rounded-xl p-3.5 mb-3 border border-blue-500/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/15 flex items-center justify-center flex-shrink-0">
                <HelpCircle size={16} className="text-[#3B82F6]" />
              </div>
              <div className="min-w-0">
                <div className="text-[12px] font-semibold text-white leading-tight">
                  Butuh Bantuan?
                </div>
                <div className="text-[10px] text-gray-400 leading-tight mt-0.5">
                  Hubungi support kami
                </div>
              </div>
            </div>
            <button className="w-full py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-[12px] font-medium rounded-lg transition-all duration-200 active:scale-[0.98]">
              Hubungi Support
            </button>
          </div>
        ) : (
          <div className="flex justify-center mb-3">
            <div className="w-9 h-9 rounded-xl bg-[#3B82F6]/15 flex items-center justify-center hover:bg-[#3B82F6]/25 cursor-pointer transition-all duration-200 group relative">
              <HelpCircle size={16} className="text-[#3B82F6] group-hover:text-[#60A5FA] transition-colors" />
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Bantuan
                <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] border-r-gray-900" />
              </div>
            </div>
          </div>
        )}

        {/* User Profile */}
        {!collapsed ? (
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.06] cursor-pointer transition-all duration-200 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-semibold text-[11px] flex-shrink-0 shadow-lg shadow-emerald-500/20">
              {user?.initials || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-white truncate leading-tight">
                {user?.email || "Memuat..."}
              </div>
              <div className="text-[11px] text-gray-500 leading-tight mt-0.5">
                {user?.role || displayRoleLabel}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
              className="p-1.5 rounded-lg hover:bg-white/[0.08] transition-all duration-200 flex-shrink-0 opacity-60 group-hover:opacity-100"
              title="Keluar"
              aria-label="Keluar dari akun"
            >
              <LogOut size={15} className="text-gray-400 group-hover:text-red-400 transition-colors duration-200" />
            </button>
          </div>
        ) : (
          <div className="flex justify-center relative group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-semibold text-[11px] cursor-pointer hover:scale-105 transition-all duration-200 shadow-lg shadow-emerald-500/20">
              {user?.initials || "U"}
            </div>
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {user?.email || "User"}
              <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] border-r-gray-900" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
