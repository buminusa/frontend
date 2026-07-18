"use client";

import { useState, useEffect, useCallback } from "react";
import { dashboardService } from "@/lib/api/services/dashboard";
import { companyProfileService } from "@/lib/api/services/company-profiles";
import { UnauthorizedError } from "@/lib/api/api";
import type { CompanyProfile, Product, CategoryCount } from "@/lib/types/dashboard";

interface DashboardData {
  loading: boolean;
  errorMsg: string | null;
  sessionExpired: boolean;
  partialWarnings: string[];
  totalSupplier: number | null;
  totalKategori: number | null;
  produkTerpopuler: Product[];
  verifikasiPending: CompanyProfile[];
  kategoriChart: CategoryCount[];
  actionLoadingId: number | null;
  totalProdukSemua: number;
  loadDashboard: () => Promise<void>;
  handleVerify: (id: number, status: "Verified" | "Rejected") => Promise<void>;
}

export function useDashboardData(): DashboardData {
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [partialWarnings, setPartialWarnings] = useState<string[]>([]);
  const [totalSupplier, setTotalSupplier] = useState<number | null>(null);
  const [totalKategori, setTotalKategori] = useState<number | null>(null);
  const [produkTerpopuler, setProdukTerpopuler] = useState<Product[]>([]);
  const [verifikasiPending, setVerifikasiPending] = useState<CompanyProfile[]>([]);
  const [kategoriChart, setKategoriChart] = useState<CategoryCount[]>([]);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [totalProdukSemua, setTotalProdukSemua] = useState(0);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    setSessionExpired(false);
    setPartialWarnings([]);

    const warnings: string[] = [];

    try {
      // Fetch all data in parallel
      const [stats, pendingVerifications, popularProducts] = await Promise.allSettled([
        dashboardService.getStats(),
        dashboardService.getPendingVerifications(),
        dashboardService.getPopularProducts(5),
      ]);

      // Process stats
      if (stats.status === "fulfilled") {
        const data = stats.value;
        setTotalSupplier(data.suppliers.total);
        setTotalKategori(data.categories.total);
        setTotalProdukSemua(data.products.total);
        setKategoriChart(data.categories.categories);
      } else {
        if (stats.reason instanceof UnauthorizedError) {
          setSessionExpired(true);
          return;
        }
        warnings.push("Gagal memuat statistik");
      }

      // Process pending verifications
      if (pendingVerifications.status === "fulfilled") {
        setVerifikasiPending(pendingVerifications.value);
      } else {
        if (pendingVerifications.reason instanceof UnauthorizedError) {
          setSessionExpired(true);
          return;
        }
        warnings.push("Gagal memuat data verifikasi");
      }

      // Process popular products
      if (popularProducts.status === "fulfilled") {
        setProdukTerpopuler(popularProducts.value);
      } else {
        if (popularProducts.reason instanceof UnauthorizedError) {
          setSessionExpired(true);
          return;
        }
        warnings.push("Gagal memuat produk terpopuler");
      }

      setPartialWarnings(warnings);
    } catch (err: any) {
      if (err instanceof UnauthorizedError) {
        setSessionExpired(true);
      } else {
        setErrorMsg(err?.message || "Gagal memuat data dashboard");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleVerify = useCallback(
    async (id: number, status: "Verified" | "Rejected") => {
      setActionLoadingId(id);
      try {
        await companyProfileService.verify(id, status);
        // Remove from pending list
        setVerifikasiPending((prev) => prev.filter((item) => item.id !== id));
      } catch (err: any) {
        if (err instanceof UnauthorizedError) {
          setSessionExpired(true);
        } else {
          setErrorMsg(err?.message || "Gagal memverifikasi supplier");
        }
      } finally {
        setActionLoadingId(null);
      }
    },
    []
  );

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return {
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
  };
}
