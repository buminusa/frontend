"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Eye } from "lucide-react";
import type {
  SupplierDashboardOrder,
  SupplierDashboardProduct,
} from "@/hooks/useSupplierDashboard";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid #E5E7EB",
  fontSize: 12.5,
  boxShadow:
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  padding: "12px 16px",
} as const;

export function RevenueTrendChart({
  orders,
}: {
  orders: SupplierDashboardOrder[];
}) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (6 - i));
    return date;
  });

  const dayKeys = new Set(days.map((day) => day.toDateString()));
  const totals = new Map<string, number>();

  for (const order of orders) {
    const key = new Date(order.date).toDateString();
    if (dayKeys.has(key)) {
      totals.set(key, (totals.get(key) ?? 0) + order.amount);
    }
  }

  const data = days.map((day) => ({
    tanggal: day.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    }),
    pendapatan: totals.get(day.toDateString()) ?? 0,
  }));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg hover:border-gray-300">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Tren Pendapatan
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Total pendapatan 7 hari terakhir
          </p>
        </div>
        <div className="p-2.5 bg-blue-50 rounded-full">
          <TrendingUp className="w-5 h-5 text-blue-600" />
        </div>
      </div>
      <div className="w-full h-[260px]">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid
              vertical={false}
              stroke="#E5E7EB"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="tanggal"
              tick={{ fontSize: 11, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) =>
                v >= 1_000_000 ? `${Math.round(v / 1_000_000)}jt` : String(v)
              }
              width={60}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(v) => [formatCurrency(Number(v)), "Pendapatan"]}
            />
            <Line
              type="monotone"
              dataKey="pendapatan"
              stroke="#2563EB"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#2563EB", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ProductViewsChart({
  products,
}: {
  products: SupplierDashboardProduct[];
}) {
  const data = [...products]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)
    .map((product) => ({
      nama: product.name.length > 18 ? `${product.name.slice(0, 18)}...` : product.name,
      views: product.views,
    }));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg hover:border-gray-300">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Produk Terpopuler
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            5 produk dengan view terbanyak
          </p>
        </div>
        <div className="p-2.5 bg-purple-50 rounded-full">
          <Eye className="w-5 h-5 text-purple-600" />
        </div>
      </div>
      <div className="w-full h-[260px]">
        <ResponsiveContainer>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 8, right: 16 }}
          >
            <CartesianGrid
              horizontal={false}
              stroke="#E5E7EB"
              strokeDasharray="3 3"
            />
            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <YAxis
              type="category"
              dataKey="nama"
              tick={{ fontSize: 11, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
              width={130}
            />
            <Tooltip
              cursor={{ fill: "rgba(59, 130, 246, 0.05)" }}
              contentStyle={tooltipStyle}
              formatter={(v) => [`${v} view`, "Total"]}
            />
            <Bar
              dataKey="views"
              fill="#3B82F6"
              radius={[0, 6, 6, 0]}
              maxBarSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
