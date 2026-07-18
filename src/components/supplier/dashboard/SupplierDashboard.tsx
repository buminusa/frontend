"use client";

import Link from "next/link";
import { StatsCards } from "./StatsCards";
import { RecentOrders } from "./RecentOrders";
import { ProductOverview } from "./ProductOverview";
import { ActivityFeed } from "./ActivityFeed";
import { useSupplierDashboard } from "@/hooks/useSupplierDashboard";

export default function SupplierDashboard() {
  const { stats, orders, products, activities, loading, error } =
    useSupplierDashboard();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Dashboard Supplier
          </h1>
          <p className="text-sm text-gray-500">
            Ringkasan produk, pesanan, dan aktivitas terbaru.
          </p>
        </div>
        <Link
          href="/suplier"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          ← Kembali ke Supplier
        </Link>
      </div>

      {loading ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500">
          Memuat data dashboard...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      <StatsCards
        totalProducts={stats.totalProducts}
        totalOrders={stats.totalOrders}
        totalRevenue={stats.totalRevenue}
        totalViews={stats.totalViews}
      />

      <div className="gap-6 lg:grid-cols-2">
        <div className="lg:col-span-2">
          <RecentOrders orders={orders} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProductOverview products={products} />
        <ActivityFeed activities={activities} />
      </div>
    </div>
  );
}
