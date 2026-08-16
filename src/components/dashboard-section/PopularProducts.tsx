"use client";

import React, { useState } from "react";
import {
  MoreVertical,
  Eye,
  ExternalLink,
  TrendingUp,
  Star,
  ArrowUpDown,
} from "lucide-react";
import type { Product } from "@/lib/types/dashboard";
import { useLanguage } from "@/lib/langue/provider";
import { getLocalizedCategoryName } from "@/lib/categories";

export function PopularProducts({
  products,
  loading,
}: {
  products: Product[];
  loading: boolean;
}) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [sortBy, setSortBy] = useState<"views" | "name">("views");
  const { lang, t } = useLanguage();

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const getRankBadge = (index: number) => {
    const badges = [
      {
        bg: "bg-gradient-to-br from-yellow-400 to-yellow-600",
        text: "text-white",
        shadow: "shadow-yellow-500/20",
      },
      {
        bg: "bg-gradient-to-br from-gray-300 to-gray-500",
        text: "text-white",
        shadow: "shadow-gray-400/20",
      },
      {
        bg: "bg-gradient-to-br from-orange-400 to-orange-600",
        text: "text-white",
        shadow: "shadow-orange-500/20",
      },
    ];
    return index < 3
      ? badges[index]
      : { bg: "bg-gray-100", text: "text-gray-600", shadow: "" };
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg hover:border-gray-300">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            {t("dashboard.stats.popularProducts")}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {t("dashboard.stats.popularProductsDesc")}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSortBy(sortBy === "views" ? "name" : "views")}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowUpDown size={12} />
            {sortBy === "views" ? t("dashboard.stats.sortViews") : t("dashboard.stats.sortName")}
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
                  <Eye size={14} />
                  Lihat Semua
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-gray-600 hover:bg-gray-50 transition-colors">
                  <ExternalLink size={14} />
                  Export Data
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="p-3 bg-blue-50 rounded-xl">
          <div className="text-xs text-blue-600 font-medium">Total Views</div>
          <div className="text-lg font-bold text-blue-700 mt-0.5">
            {formatViews(products.reduce((sum, p) => sum + p.views, 0))}
          </div>
        </div>
        <div className="p-3 bg-emerald-50 rounded-xl">
          <div className="text-xs text-emerald-600 font-medium">
            Rata-rata Views
          </div>
          <div className="text-lg font-bold text-emerald-700 mt-0.5">
            {formatViews(
              Math.round(
                products.reduce((sum, p) => sum + p.views, 0) /
                  (products.length || 1)
              )
            )}
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="space-y-1">
        {!loading && products.length === 0 && (
          <div className="py-12 text-center">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <Star size={24} className="text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 font-medium">
              Belum ada produk aktif
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Produk akan muncul setelah diaktifkan
            </p>
          </div>
        )}

        {products.map((p, i) => {
          const isHovered = hoveredProduct === i;
          const rankBadge = getRankBadge(i);

          return (
            <div
              key={p.id}
              onMouseEnter={() => setHoveredProduct(i)}
              onMouseLeave={() => setHoveredProduct(null)}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                isHovered
                  ? "bg-gray-50 shadow-sm"
                  : "hover:bg-gray-50/50"
              }`}
            >
              {/* Rank */}
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                  rankBadge.bg
                } ${rankBadge.text} ${rankBadge.shadow} ${
                  isHovered ? "scale-110" : ""
                }`}
              >
                {i + 1}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div
                    className={`text-sm font-semibold text-gray-900 truncate transition-colors ${
                      isHovered ? "text-blue-600" : ""
                    }`}
                  >
                    {p.nama}
                  </div>
                  {i === 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-yellow-100 text-yellow-700 rounded-full border border-yellow-200">
                      HOT
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                  <span>{p.category ? getLocalizedCategoryName(p.category, lang) : t("dashboard.products.noCategory")}</span>
                  <span className="text-gray-300">•</span>
                  <span>{p.supplier?.company_name ?? "-"}</span>
                </div>
              </div>

              {/* Views */}
              <div className="text-right">
                <div
                  className={`text-sm font-bold tabular-nums transition-colors ${
                    isHovered ? "text-blue-600" : "text-gray-900"
                  }`}
                >
                  {formatViews(p.views)}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400 justify-end">
                  <Eye size={10} />
                  <span>views</span>
                </div>
              </div>

              {/* Action */}
              <div
                className={`transition-all duration-200 ${
                  isHovered
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2"
                }`}
              >
                <button className="p-2 rounded-lg hover:bg-blue-100 transition-colors">
                  <ExternalLink size={14} className="text-blue-600" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {products.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button className="w-full py-2.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all flex items-center justify-center gap-2">
            <TrendingUp size={14} />
            Lihat Semua Produk
          </button>
        </div>
      )}
    </div>
  );
}
