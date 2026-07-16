"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  MoreVertical,
  Maximize2,
  Download,
  RefreshCw,
  ChevronDown,
} from "lucide-react";
import type { CategoryCount } from "@/lib/types/dashboard";

export function CategoryChart({ data }: { data: CategoryCount[] }) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState("Minggu Ini");
  const [showTimeRange, setShowTimeRange] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const timeRanges = [
    "Hari Ini",
    "Minggu Ini",
    "Bulan Ini",
    "Kuartal Ini",
    "Tahun Ini",
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg hover:border-gray-300">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Produk Aktif per Kategori
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Distribusi produk berdasarkan kategori
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Time Range Selector */}
          <div className="relative">
            <button
              onClick={() => setShowTimeRange(!showTimeRange)}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {timeRange}
              <ChevronDown
                size={12}
                className={`transition-transform ${
                  showTimeRange ? "rotate-180" : ""
                }`}
              />
            </button>
            {showTimeRange && (
              <div className="absolute right-0 top-10 w-40 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-10">
                {timeRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setTimeRange(range);
                      setShowTimeRange(false);
                    }}
                    className={`w-full px-3 py-2 text-xs text-left hover:bg-gray-50 transition-colors ${
                      timeRange === range
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleRefresh}
            className="p-2 rounded-lg hover:bg-gray-100 transition-all text-gray-500"
          >
            <RefreshCw
              size={14}
              className={isRefreshing ? "animate-spin" : ""}
            />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-all text-gray-500"
            >
              <MoreVertical size={14} />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-10 w-44 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-10">
                <button className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-gray-600 hover:bg-gray-50 transition-colors">
                  <Download size={14} />
                  Export PNG
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-gray-600 hover:bg-gray-50 transition-colors">
                  <Download size={14} />
                  Export CSV
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-gray-600 hover:bg-gray-50 transition-colors">
                  <Maximize2 size={14} />
                  Perbesar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-3 bg-gray-50 rounded-xl">
          <div className="text-xs text-gray-500">Total Kategori</div>
          <div className="text-lg font-bold text-gray-900 mt-0.5">{data.length}</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl">
          <div className="text-xs text-gray-500">Total Produk</div>
          <div className="text-lg font-bold text-gray-900 mt-0.5">
            {data.reduce((sum, item) => sum + item.jumlah, 0)}
          </div>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl">
          <div className="text-xs text-gray-500">Rata-rata</div>
          <div className="text-lg font-bold text-gray-900 mt-0.5">
            {data.length > 0 ? Math.round(data.reduce((sum, item) => sum + item.jumlah, 0) / data.length) : 0}
          </div>
        </div>
      </div>

      <div className="w-full h-[280px]">
        <ResponsiveContainer>
          <BarChart
            data={data}
            barCategoryGap="25%"
            onMouseMove={(state) => {
              if (state?.activeTooltipIndex !== undefined) {
                setHoveredBar(Number(state.activeTooltipIndex));
              }
            }}
            onMouseLeave={() => setHoveredBar(null)}
          >
            <CartesianGrid
              vertical={false}
              stroke="#E5E7EB"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="nama"
              tick={{ fontSize: 11, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
              interval={0}
              angle={-15}
              textAnchor="end"
              height={50}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(59, 130, 246, 0.05)" }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #E5E7EB",
                fontSize: 12.5,
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                padding: "12px 16px",
              }}
              formatter={(v) => [`${v} produk`, "Jumlah"]}
            />
            <Bar dataKey="jumlah" radius={[6, 6, 0, 0]} maxBarSize={32}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={hoveredBar === index ? "#2563EB" : "#3B82F6"}
                  style={{
                    filter:
                      hoveredBar === index
                        ? "drop-shadow(0 4px 6px rgba(59, 130, 246, 0.3))"
                        : "none",
                    transition: "all 0.2s ease",
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
