"use client";

import React, { useState, useEffect } from "react";

import { Sidebar } from "@/components/dashboard-section/sidebar";
import { Topbar } from "@/components/dashboard-section/top-bar";
import { StatCard } from "@/components/dashboard-section/StatCard";
import { CategoryChart } from "@/components/dashboard-section/CategoryChart";
import { PopularProducts } from "@/components/dashboard-section/PopularProducts";
import { StatusDistribution } from "@/components/dashboard-section/StatusDistribution";
import { PendingVerification } from "@/components/dashboard-section/PendingVerification";
import {
  SessionExpiredBanner,
  ErrorBanner,
  PartialWarningsBanner,
} from "@/components/dashboard-section/DashboardBanners";
import { useDashboardData } from "@/lib/hooks/useDashboardData";

import {
  Warehouse,
  Package,
  Tags,
  RefreshCw,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  BarChart3,
  Clock,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
} from "lucide-react";

export default function AdminDashboardPage() {
  const {
    loading,
    errorMsg,
    sessionExpired,
    partialWarnings,
    totalSupplier,
    totalProdukAktif,
    totalKategori,
    statusCounts,
    produkTerpopuler,
    verifikasiPending,
    kategoriChart,
    actionLoadingId,
    totalProdukSemua,
    loadDashboard,
    handleVerify,
  } = useDashboardData();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState("Bulan Ini");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadDashboard();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 11) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 18) return "Selamat Sore";
    return "Selamat Malam";
  };


  const getActivityColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-emerald-500";
      case "warning":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <div className="ml-[260px]">
        <Topbar />

        <main className="p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {getGreeting()}, Admin! 👋
              </h1>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                <Calendar size={14} />
                {currentTime.toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center gap-3">
            </div>
          </div>

          {/* Banners */}
          <div className="space-y-3 mb-6">
            {sessionExpired && <SessionExpiredBanner />}
            {!sessionExpired && errorMsg && (
              <ErrorBanner message={errorMsg} onRetry={loadDashboard} />
            )}
            {!sessionExpired && !errorMsg && (
              <PartialWarningsBanner warnings={partialWarnings} />
            )}
          </div>


          {/* Main Stat Cards */}
          <div className="grid grid-cols-3 gap-5 mb-6">
            <StatCard
              icon={Warehouse}
              label="Total Supplier"
              value={totalSupplier}
              loading={loading}
              trend={12}
              trendLabel="vs bulan lalu"
              color="blue"
            />
            <StatCard
              icon={Package}
              label="Produk Aktif"
              value={totalProdukAktif}
              loading={loading}
              trend={8}
              trendLabel="vs bulan lalu"
              color="emerald"
            />
            <StatCard
              icon={Tags}
              label="Total Kategori"
              value={totalKategori}
              loading={loading}
              trend={5}
              trendLabel="vs bulan lalu"
              color="violet"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-5 mb-6">
            <CategoryChart data={kategoriChart} />
            <PopularProducts products={produkTerpopuler} loading={loading} />
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2">
              <StatusDistribution
                statusCounts={statusCounts}
                totalProdukSemua={totalProdukSemua}
              />
            </div>
            <div>
              <PendingVerification
                items={verifikasiPending}
                loading={loading}
                actionLoadingId={actionLoadingId}
                onVerify={handleVerify}
              />
            </div>
          </div>

          {/* Activity Feed */}
          <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Aktivitas Terkini
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Log aktivitas sistem
                </p>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Lihat Semua
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
