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

import { Warehouse, Package, Tags, ShieldCheck, Calendar } from "lucide-react";

export default function SuperAdminDashboardPage() {
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
      <Sidebar basePath="/dashboard/super-admin" roleLabel="Super Admin" />

      <div className="ml-[264px]">
        <Topbar />

        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {getGreeting()}, Super Admin! 👋
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
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
              Ringkasan platform terpusat
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {sessionExpired && <SessionExpiredBanner />}
            {!sessionExpired && errorMsg && (
              <ErrorBanner message={errorMsg} onRetry={loadDashboard} />
            )}
            {!sessionExpired && !errorMsg && (
              <PartialWarningsBanner warnings={partialWarnings} />
            )}
          </div>

          <div className="grid grid-cols-4 gap-5 mb-6">
            <StatCard
              icon={ShieldCheck}
              label="Total Supplier"
              value={totalSupplier}
              loading={loading}
              color="blue"
            />
            <StatCard
              icon={Package}
              label="Produk Aktif"
              value={totalProdukAktif}
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
            <StatCard
              icon={Warehouse}
              label="Produk Terdaftar"
              value={totalProdukSemua}
              loading={loading}
              color="orange"
            />
          </div>

          <div className="grid grid-cols-2 gap-5 mb-6">
            <CategoryChart data={kategoriChart} />
            <PopularProducts products={produkTerpopuler} loading={loading} />
          </div>

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

          <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  Aktivitas Platform
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Pemantauan operasional dan peninjauan data utama
                </p>
              </div>
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                Lihat Semua
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
