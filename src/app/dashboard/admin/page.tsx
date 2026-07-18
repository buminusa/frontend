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
  Calendar,
} from "lucide-react";

export default function AdminDashboardPage() {
  const {
    loading,
    errorMsg,
    sessionExpired,
    partialWarnings,
    totalSupplier,
    totalKategori,
    produkTerpopuler,
    verifikasiPending,
    kategoriChart,
    actionLoadingId,
    totalProdukSemua,
    loadDashboard,
    handleVerify,
  } = useDashboardData();

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 11) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 18) return "Selamat Sore";
    return "Selamat Malam";
  };


  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <div className="ml-[264px]">
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
              color="blue"
            />
            <StatCard
              icon={Package}
              label="Total Produk"
              value={totalProdukSemua}
              loading={loading}
              color="emerald"
            />
            <StatCard
              icon={Tags}
              label="Total Kategori"
              value={totalKategori}
              loading={loading}
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
