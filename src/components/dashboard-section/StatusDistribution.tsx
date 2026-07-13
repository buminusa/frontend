"use client";

import React, { useState } from "react";
import { STATUS_LIST, STATUS_COLOR } from "@/lib/dashboard-constants";
import { formatIdNumber } from "@/lib/format";
import {
  PieChart,
  ChevronRight,
  MoreVertical,
  Download,
  Info,
} from "lucide-react";

interface StatusDistributionProps {
  statusCounts: Record<string, number>;
  totalProdukSemua: number;
}

export function StatusDistribution({
  statusCounts,
  totalProdukSemua,
}: StatusDistributionProps) {
  const [hoveredStatus, setHoveredStatus] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  const statusInfo: Record<
    string,
    { desc: string; icon: string; action: string }
  > = {
    Active: {
      desc: "Produk aktif dan dapat dilihat oleh pembeli",
      icon: "✓",
      action: "Kelola Produk",
    },
    Pending: {
      desc: "Produk menunggu persetujuan admin",
      icon: "⏳",
      action: "Review Produk",
    },
    Rejected: {
      desc: "Produk ditolak oleh admin",
      icon: "✕",
      action: "Lihat Alasan",
    },
    Draft: {
      desc: "Produk masih dalam tahap draft",
      icon: "✎",
      action: "Edit Produk",
    },
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg hover:border-gray-300">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Distribusi Status Produk
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Total{" "}
            <span className="font-semibold text-gray-700">
              {formatIdNumber(totalProdukSemua)}
            </span>{" "}
            produk terdaftar
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-all text-gray-500">
            <Info size={14} />
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
                  Export Laporan
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-gray-600 hover:bg-gray-50 transition-colors">
                  <PieChart size={14} />
                  Lihat Detail
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {STATUS_LIST.map((status) => {
          const count = statusCounts[status] ?? 0;
          const pct = totalProdukSemua
            ? ((count / totalProdukSemua) * 100).toFixed(1)
            : "0";
          const isHovered = hoveredStatus === status;

          return (
            <div
              key={status}
              onMouseEnter={() => setHoveredStatus(status)}
              onMouseLeave={() => setHoveredStatus(null)}
              className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                isHovered
                  ? "border-gray-300 shadow-sm bg-gray-50"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: STATUS_COLOR[status] }}
                />
                <span className="text-xs font-medium text-gray-600">
                  {status}
                </span>
              </div>
              <div className="text-xl font-bold text-gray-900">{count}</div>
              <div className="text-xs text-gray-400 mt-0.5">{pct}%</div>
            </div>
          );
        })}
      </div>

      {/* Progress Bars */}
      <div className="space-y-4">
        {STATUS_LIST.map((status) => {
          const count = statusCounts[status] ?? 0;
          const pct = totalProdukSemua
            ? (count / totalProdukSemua) * 100
            : 0;
          const isHovered = hoveredStatus === status;

          return (
            <div
              key={status}
              onMouseEnter={() => setHoveredStatus(status)}
              onMouseLeave={() => setHoveredStatus(null)}
              className={`p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                isHovered ? "bg-gray-50" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                      isHovered ? "scale-110" : ""
                    }`}
                    style={{
                      backgroundColor: `${STATUS_COLOR[status]}20`,
                      color: STATUS_COLOR[status],
                    }}
                  >
                    {statusInfo[status]?.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {status}
                    </div>
                    {isHovered && (
                      <div className="text-xs text-gray-500 mt-0.5 animate-fadeIn">
                        {statusInfo[status]?.desc}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900 tabular-nums">
                      {count}
                    </div>
                    <div className="text-xs text-gray-400">
                      {pct.toFixed(1)}%
                    </div>
                  </div>
                  {isHovered && (
                    <button className="px-2.5 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors animate-fadeIn">
                      {statusInfo[status]?.action}
                    </button>
                  )}
                </div>
              </div>

              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: STATUS_COLOR[status],
                    minWidth: pct > 0 ? "8px" : "0px",
                    boxShadow: isHovered
                      ? `0 2px 8px ${STATUS_COLOR[status]}40`
                      : "none",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Data diperbarui secara real-time
          </div>
          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            Detail
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
