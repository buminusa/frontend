"use client";

import React, { useState } from "react";
import {
  Loader2,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { formatIdNumber } from "@/lib/format";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number | null;
  loading: boolean;
  trend?: number | null;
  trendLabel?: string;
  color?: "blue" | "emerald" | "violet" | "orange" | "rose";
  period?: string;
}

const colorConfig = {
  blue: {
    bg: "bg-[#EFF6FF]",
    icon: "text-[#3B82F6]",
    trend: {
      up: "text-[#10B981] bg-[#ECFDF5]",
      down: "text-[#EF4444] bg-[#FEF2F2]",
    },
    accent: "from-[#3B82F6] to-[#2563EB]",
  },
  emerald: {
    bg: "bg-[#ECFDF5]",
    icon: "text-[#10B981]",
    trend: {
      up: "text-[#10B981] bg-[#ECFDF5]",
      down: "text-[#EF4444] bg-[#FEF2F2]",
    },
    accent: "from-[#10B981] to-[#059669]",
  },
  violet: {
    bg: "bg-[#F5F3FF]",
    icon: "text-[#8B5CF6]",
    trend: {
      up: "text-[#10B981] bg-[#ECFDF5]",
      down: "text-[#EF4444] bg-[#FEF2F2]",
    },
    accent: "from-[#8B5CF6] to-[#7C3AED]",
  },
  orange: {
    bg: "bg-[#FFF7ED]",
    icon: "text-[#F97316]",
    trend: {
      up: "text-[#10B981] bg-[#ECFDF5]",
      down: "text-[#EF4444] bg-[#FEF2F2]",
    },
    accent: "from-[#F97316] to-[#EA580C]",
  },
  rose: {
    bg: "bg-[#FFF1F2]",
    icon: "text-[#F43F5E]",
    trend: {
      up: "text-[#10B981] bg-[#ECFDF5]",
      down: "text-[#EF4444] bg-[#FEF2F2]",
    },
    accent: "from-[#F43F5E] to-[#E11D48]",
  },
};

export function StatCard({
  icon: Icon,
  label,
  value,
  loading,
  trend = null,
  color = "blue",
  period = "Bulan Ini",
}: StatCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const config = colorConfig[color];
  const isPositiveTrend = (trend ?? 0) >= 0;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-300 cursor-pointer group ${
        isHovered
          ? "shadow-lg shadow-gray-200/50 border-gray-300 -translate-y-0.5"
          : "hover:border-gray-300"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center transition-all duration-300 ${
            isHovered ? "scale-110" : ""
          }`}
        >
          <Icon
            size={22}
            strokeWidth={2}
            className={`${config.icon} transition-transform ${
              isHovered ? "rotate-6" : ""
            }`}
          />
        </div>
        {trend !== null && trend !== undefined && (
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
              isPositiveTrend ? config.trend.up : config.trend.down
            }`}
          >
            {isPositiveTrend ? (
              <TrendingUp size={12} />
            ) : (
              <TrendingDown size={12} />
            )}
            <span>
              {isPositiveTrend ? "+" : ""}
              {trend}%
            </span>
          </div>
        )}
      </div>

      <div>
        <div className="text-sm font-medium text-gray-500 mb-1">{label}</div>
        <div className="text-3xl font-bold text-gray-900 tracking-tight">
          {loading ? (
            <Loader2 size={28} className="animate-spin text-gray-400" />
          ) : (
            <span className="tabular-nums">{formatIdNumber(value)}</span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-400">{period}</span>
        <div
          className={`flex items-center gap-1 text-xs font-medium text-gray-400 group-hover:text-blue-600 transition-all ${
            isHovered ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
          }`}
        >
          Detail
          <ArrowUpRight size={12} />
        </div>
      </div>
    </div>
  );
}
