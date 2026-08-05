"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { StatsCards } from "./StatsCards";
import { RecentOrders } from "./RecentOrders";
import { ProductOverview } from "./ProductOverview";
import { ActivityFeed } from "./ActivityFeed";
import { RevenueTrendChart, ProductViewsChart } from "./Charts";
import { DateRangeFilter, type DateRange } from "./DateRangeFilter";
import {
  useSupplierDashboard,
  type SupplierDashboardOrder,
} from "@/hooks/useSupplierDashboard";

function filterOrdersByRange(orders: SupplierDashboardOrder[], range: DateRange) {
  if (range === "all") return orders;
  const days = range === "7" ? 7 : 30;
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return orders.filter((order) => new Date(order.date).getTime() >= cutoff);
}

export default function SupplierDashboard() {
  const { stats, orders, products, activities, loading, error, reload } =
    useSupplierDashboard();
  const [range, setRange] = useState<DateRange>("7");

  const filteredOrders = useMemo(
    () => filterOrdersByRange(orders, range),
    [orders, range],
  );

  const filteredStats = useMemo(() => {
    const revenue = filteredOrders.reduce((sum, o) => sum + o.amount, 0);
    return {
      totalProducts: stats.totalProducts,
      totalViews: stats.totalViews,
      totalOrders: filteredOrders.length,
      totalRevenue: revenue,
    };
  }, [filteredOrders, stats]);

  const rangeLabel = range === "all" ? "semua periode" : `${range} hari terakhir`;

  const handleRefresh = () => {
    reload();
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Dashboard Supplier
          </h1>
          <p className="text-sm text-gray-500">
            Ringkasan produk, pesanan, dan aktivitas terbaru.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
            aria-label="Muat ulang"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Muat ulang
          </button>
          <Link
            href="/dashboard/supplier"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            ← Kembali ke Supplier
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <DateRangeFilter value={range} onChange={setRange} />
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
        totalProducts={filteredStats.totalProducts}
        totalOrders={filteredStats.totalOrders}
        totalRevenue={filteredStats.totalRevenue}
        totalViews={filteredStats.totalViews}
        productsTrend={`${products.length} produk terdaftar`}
        ordersTrend={`${filteredOrders.length} pesanan (${rangeLabel})`}
        revenueTrend={`dalam ${rangeLabel}`}
        viewsTrend={`${products.length} produk`}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueTrendChart orders={filteredOrders} />
        <ProductViewsChart products={products} />
      </div>

      <RecentOrders orders={filteredOrders} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProductOverview products={products} />
        <ActivityFeed activities={activities} />
      </div>
    </div>
  );
}
