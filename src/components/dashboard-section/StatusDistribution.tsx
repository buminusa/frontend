"use client";

import React from "react";
import { formatIdNumber } from "@/lib/format";
import { PieChart, ChevronRight, MoreVertical, Download, Info } from "lucide-react";

interface StatusDistributionProps {
  totalProdukSemua: number;
}

export function StatusDistribution({
  totalProdukSemua,
}: StatusDistributionProps) {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg hover:border-gray-300">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Distribusi Produk</h3>
          <p className="text-xs text-gray-500 mt-1">
            Total <span className="font-semibold text-gray-700">{formatIdNumber(totalProdukSemua)}</span> produk terdaftar
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

      <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-gray-600">Total Produk</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">{formatIdNumber(totalProdukSemua)}</div>
      </div>

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
