"use client";

import React, { useState, useEffect } from "react";

import { DashboardLayout } from "@/components/dashboard-section/DashboardLayout";
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
import { useAuthGuard } from "@/hooks/use-auth-guard"
import { Package, Tags, ShieldCheck, Calendar } from "lucide-react";
import { useLanguage } from "@/lib/langue/provider";

export default function SuperAdminDashboardPage() {
  useAuthGuard({ allowedRoles: ["Super_Admin"] });
  const { t } = useLanguage();
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

  const getGreetingKey = () => {
    const hour = currentTime.getHours();
    if (hour < 11) return "dashboard.common.greetingMorning";
    if (hour < 15) return "dashboard.common.greetingAfternoon";
    if (hour < 18) return "dashboard.common.greetingEvening";
    return "dashboard.common.greetingNight";
  };

  return (
    <DashboardLayout basePath="/dashboard/super-admin" roleLabel="Super Admin">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {t(getGreetingKey())}, {t("dashboard.common.roleSuperAdmin")}! 👋
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
              {t("dashboard.common.centralPlatformSummary")}
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

          <div className="grid grid-cols-3 gap-5 mb-6">
            <StatCard
              icon={ShieldCheck}
              label={t("dashboard.stats.totalSupplier")}
              value={totalSupplier}
              loading={loading}
              color="blue"
            />
            <StatCard
              icon={Package}
              label={t("dashboard.stats.totalProducts")}
              value={totalProdukSemua}
              loading={loading}
              color="emerald"
            />
            <StatCard
              icon={Tags}
              label={t("dashboard.stats.totalCategories")}
              value={totalKategori}
              loading={loading}
              color="violet"
            />
          </div>

          <div className="grid grid-cols-2 gap-5 mb-6">
            <CategoryChart data={kategoriChart} />
            <PopularProducts products={produkTerpopuler} loading={loading} />
          </div>

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

          <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  {t("dashboard.common.platformActivity")}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {t("dashboard.common.platformActivityDesc")}
                </p>
              </div>
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                {t("dashboard.common.viewAll")}
              </button>
            </div>
          </div>
        </DashboardLayout>
  );
}
