"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-section/DashboardLayout";
import { DataTable } from "@/components/dashboard-section/DataTable";
import { companyProfileService } from "@/lib/api/services/company-profiles";
import { UnauthorizedError } from "@/lib/api/api";
import { getErrorMessage } from "@/lib/api/errors";
import { useLanguage } from "@/lib/langue/provider";
import {
  VERIFICATION_STATUS_COLORS,
  VERIFICATION_STATUS_KEYS,
  type VerificationStatus,
} from "@/lib/dashboard-constants";
import type { CompanyProfile } from "@/lib/types/api";
import { Search, RefreshCw, CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";

export default function SuperAdminVerificationPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [suppliers, setSuppliers] = useState<CompanyProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [showStatusModal, setShowStatusModal] = useState<number | null>(null);

  const loadSuppliers = useCallback(async () => {
    try {
      const res = await companyProfileService.getAll();
      setSuppliers(res.data || []);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        router.push("/login?session=expired");
        return;
      }
      setError(getErrorMessage(err, t("dashboard.verification.loadFailed")));
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const init = async () => {
      await loadSuppliers();
    };
    void init();
  }, [loadSuppliers]);

  const handleVerify = async (id: number, status: "Pending" | "Verified" | "Rejected") => {
    setActionLoadingId(id);
    try {
      await companyProfileService.verify(id, status);
      setSuppliers((prev) => prev.map((s) => (s.id === id ? { ...s, verificationStatus: status } : s)));
      setShowStatusModal(null);
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        router.push("/login?session=expired");
        return;
      }
      setError(getErrorMessage(err, t("dashboard.verification.verifyFailedSupplier")));
    } finally {
      setActionLoadingId(null);
    }
  };

  const filteredSuppliers = suppliers.filter((s) =>
    [s.company_name, s.user?.email, s.verificationStatus]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: "company_name",
      label: t("dashboard.suppliers.company"),
      render: (item: CompanyProfile) => <span className="font-medium text-gray-900">{item.company_name}</span>,
    },
    {
      key: "email",
      label: t("dashboard.suppliers.email"),
      render: (item: CompanyProfile) => <span className="text-gray-700 text-sm">{item.user?.email || "-"}</span>,
    },
    {
      key: "verificationStatus",
      label: t("dashboard.common.status"),
      render: (item: CompanyProfile) => {
        const status = item.verificationStatus as VerificationStatus;
        return (
          <div className="relative">
            <button onClick={() => setShowStatusModal(showStatusModal === item.id ? null : item.id)} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${VERIFICATION_STATUS_COLORS[status]}`}>
              {status === "Verified" && <CheckCircle size={12} />}
              {status === "Pending" && <Clock size={12} />}
              {status === "Rejected" && <XCircle size={12} />}
              {t(VERIFICATION_STATUS_KEYS[status])}
            </button>
            {showStatusModal === item.id && (
              <div className="absolute right-0 top-10 w-40 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-20">
                {(["Pending", "Verified", "Rejected"] as const).map((s) => (
                  <button key={s} onClick={() => handleVerify(item.id, s)} disabled={actionLoadingId === item.id} className={`w-full px-3 py-2.5 text-xs text-left hover:bg-gray-50 transition-colors flex items-center gap-2 ${item.verificationStatus === s ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600"}`}>
                    {actionLoadingId === item.id ? <Loader2 size={12} className="animate-spin" /> : <>{s === "Verified" && <CheckCircle size={12} className="text-emerald-500" />}{s === "Pending" && <Clock size={12} className="text-yellow-500" />}{s === "Rejected" && <XCircle size={12} className="text-red-500" />}</>}
                    {t(VERIFICATION_STATUS_KEYS[s])}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <DashboardLayout basePath="/dashboard/super-admin" roleLabel="Super Admin">
      <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t("dashboard.verification.superTitle")}</h1>
              <p className="text-sm text-gray-500 mt-1">{t("dashboard.verification.superDescription")}</p>
            </div>
            <button
              onClick={() => {
                setLoading(true);
                loadSuppliers();
              }}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <RefreshCw size={14} />
              {t("dashboard.common.refresh")}
            </button>
          </div>

          <div className="mb-4">
            <div className="relative max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t("dashboard.verification.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredSuppliers}
            loading={loading}
            error={error}
            onRetry={() => {
              setLoading(true);
              loadSuppliers();
            }}
            emptyMessage={t("dashboard.verification.empty")}
            keyExtractor={(item) => item.id}
          />
        </main>
      </DashboardLayout>
  );
}
