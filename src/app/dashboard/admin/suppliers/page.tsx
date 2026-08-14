"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-section/DashboardLayout";
import { DataTable } from "@/components/dashboard-section/DataTable";
import { companyProfileService } from "@/lib/api/services/company-profiles";
import { UnauthorizedError } from "@/lib/api/api";
import { getErrorMessage } from "@/lib/api/errors";
import type { CompanyProfile } from "@/lib/types/api";
import { relativeTime } from "@/lib/format";
import {
  Search,
  CheckCircle,
  XCircle,
  Eye,
  Loader2,
  RefreshCw,
  MapPin,
  Building2,
  X,
  Mail,
  Phone,
  FileText,
  ExternalLink,
} from "lucide-react";

const STATUS_COLORS = {
  Verified: "bg-emerald-100 text-emerald-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Rejected: "bg-red-100 text-red-700",
};

function isImageExtension(url: string): boolean {
  return /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url);
}

export default function SuppliersPage() {
  const router = useRouter();
  const [suppliers, setSuppliers] = useState<CompanyProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detail, setDetail] = useState<CompanyProfile | null>(null);

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
      setError(getErrorMessage(err, "Gagal memuat data supplier"));
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

  const openDetail = async (supplier: CompanyProfile) => {
    setExpandedId(supplier.id);
    setDetail(null);
    setDetailLoading(true);
    try {
      const userId = supplier.user?.id ?? supplier.userId;
      if (userId) {
        const res = await companyProfileService.getDetailByUserId(userId);
        setDetail(res.data);
      } else {
        setDetail(supplier);
      }
    } catch {
      setDetail(supplier);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleVerify = async (id: number, status: "Verified" | "Rejected") => {
    setActionLoadingId(id);
    try {
      await companyProfileService.verify(id, status);
      setSuppliers((prev) =>
        prev.map((s) => (s.id === id ? { ...s, verificationStatus: status } : s))
      );
      if (detail?.id === id) {
        setDetail((prev) => (prev ? { ...prev, verificationStatus: status } : prev));
      }
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        router.push("/login?session=expired");
        return;
      }
      setError(getErrorMessage(err, "Gagal memverifikasi supplier"));
    } finally {
      setActionLoadingId(null);
    }
  };

  const filteredSuppliers = suppliers.filter((s) => {
    const matchesSearch =
      s.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.province?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.user?.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || s.verificationStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      key: "company_name",
      label: "Perusahaan",
      render: (item: CompanyProfile) => (
        <div className="flex items-center gap-3">
          {item.logo_url ? (
            <Image
              src={item.logo_url}
              alt={item.company_name}
              width={40}
              height={40}
              unoptimized={item.logo_url.startsWith("http")}
              className="w-10 h-10 rounded-xl object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <Building2 size={18} className="text-blue-600" />
            </div>
          )}
          <div>
            <div className="font-medium text-gray-900">{item.company_name}</div>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
              <MapPin size={10} />
              {item.province}, {item.country}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (item: CompanyProfile) => (
        <span className="text-gray-700 text-sm">{item.user?.email || "-"}</span>
      ),
    },
    {
      key: "phone",
      label: "Telepon",
      render: (item: CompanyProfile) => (
        <span className="text-gray-700">{item.phone}</span>
      ),
    },
    {
      key: "verificationStatus",
      label: "Status",
      render: (item: CompanyProfile) => (
        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${STATUS_COLORS[item.verificationStatus]}`}>
          {item.verificationStatus === "Verified" && <CheckCircle size={12} className="mr-1" />}
          {item.verificationStatus === "Pending" && <Loader2 size={12} className="mr-1 animate-spin" />}
          {item.verificationStatus === "Rejected" && <XCircle size={12} className="mr-1" />}
          {item.verificationStatus}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Terdaftar",
      render: (item: CompanyProfile) => (
        <span className="text-gray-500 text-sm">{relativeTime(item.createdAt)}</span>
      ),
    },
    {
      key: "actions",
      label: "",
      className: "w-20",
      render: (item: CompanyProfile) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => openDetail(item)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            title="Lihat Detail"
          >
            <Eye size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout basePath="/dashboard/admin" roleLabel="Admin">
      <main className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Supplier</h1>
              <p className="text-sm text-gray-500 mt-1">
                Kelola semua supplier yang terdaftar
              </p>
            </div>
            <button
              onClick={() => {
                setLoading(true);
                loadSuppliers();
              }}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {["Verified", "Pending", "Rejected"].map((status) => {
              const count = suppliers.filter((s) => s.verificationStatus === status).length;
              return (
                <button
                  key={status}
                  onClick={() => setStatusFilter(statusFilter === status ? "all" : status)}
                  className={`p-4 rounded-xl border transition-all ${
                    statusFilter === status
                      ? "border-blue-300 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="text-xs text-gray-500 mb-1">{status}</div>
                  <div className="text-2xl font-bold text-gray-900">{count}</div>
                </button>
              );
            })}
            <button
              onClick={() => setStatusFilter("all")}
              className={`p-4 rounded-xl border transition-all ${
                statusFilter === "all"
                  ? "border-blue-300 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="text-xs text-gray-500 mb-1">Total</div>
              <div className="text-2xl font-bold text-gray-900">{suppliers.length}</div>
            </button>
          </div>

          {/* Search */}
          <div className="mb-4">
            <div className="relative max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama perusahaan, email, atau provinsi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          {/* Table */}
          <DataTable
            columns={columns}
            data={filteredSuppliers}
            loading={loading}
            error={error}
            onRetry={() => {
              setLoading(true);
              loadSuppliers();
            }}
            emptyMessage="Belum ada supplier"
            keyExtractor={(item) => item.id}
          />

          {/* Detail Modal */}
          {expandedId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                {detailLoading ? (
                  <div className="p-12 text-center">
                    <Loader2 size={32} className="animate-spin text-blue-500 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">Memuat detail supplier...</p>
                  </div>
                ) : detail ? (
                  <>
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                      <div className="flex items-center gap-4">
                        {detail.logo_url ? (
                          <Image
                            src={detail.logo_url}
                            alt={detail.company_name}
                            width={56}
                            height={56}
                            unoptimized={detail.logo_url.startsWith("http")}
                            className="w-14 h-14 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                            <Building2 size={24} className="text-blue-600" />
                          </div>
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {detail.company_name}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[detail.verificationStatus]}`}>
                            {detail.verificationStatus === "Verified" && <CheckCircle size={10} className="mr-1" />}
                            {detail.verificationStatus === "Pending" && <Loader2 size={10} className="mr-1 animate-spin" />}
                            {detail.verificationStatus === "Rejected" && <XCircle size={10} className="mr-1" />}
                            {detail.verificationStatus}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => { setExpandedId(null); setDetail(null); }}
                        className="p-2 rounded-lg hover:bg-gray-100"
                      >
                        <X size={16} className="text-gray-500" />
                      </button>
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-5">
                      {/* Email */}
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Mail size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Email</div>
                          <div className="text-sm font-medium text-gray-900">{detail.user?.email || "-"}</div>
                        </div>
                      </div>

                      {/* Phone & Province */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center">
                            <Phone size={16} className="text-emerald-600" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Telepon</div>
                            <div className="text-sm font-medium text-gray-900">{detail.phone}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center">
                            <MapPin size={16} className="text-violet-600" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Lokasi</div>
                            <div className="text-sm font-medium text-gray-900">{detail.province}, {detail.country}</div>
                          </div>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="p-3 bg-gray-50 rounded-xl">
                        <div className="text-xs text-gray-500 mb-1">Alamat</div>
                        <div className="text-sm font-medium text-gray-900">{detail.address}</div>
                      </div>

                      {/* Business Description */}
                      <div className="p-3 bg-gray-50 rounded-xl">
                        <div className="text-xs text-gray-500 mb-1">Deskripsi Bisnis</div>
                        <div className="text-sm text-gray-700">{detail.business_description}</div>
                      </div>

                      {/* NPWP Document */}
                      <div className="p-3 bg-gray-50 rounded-xl">
                        <div className="text-xs text-gray-500 mb-2">Dokumen NPWP</div>
                        {detail.npwp ? (
                          <div className="space-y-2">
                            {isImageExtension(detail.npwp) ? (
                              <div className="relative">
                                <Image
                                  src={detail.npwp}
                                  alt="NPWP"
                                  width={800}
                                  height={600}
                                  unoptimized={detail.npwp.startsWith("http")}
                                  className="w-full max-h-48 object-contain rounded-lg border border-gray-200"
                                />
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200">
                                <FileText size={20} className="text-gray-400" />
                                <span className="text-sm text-gray-700 flex-1">Dokumen NPWP</span>
                              </div>
                            )}
                            <a
                              href={detail.npwp}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                              <ExternalLink size={12} />
                              {isImageExtension(detail.npwp) ? "Buka Gambar di Tab Baru" : "Lihat Dokumen"}
                            </a>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <FileText size={16} className="text-yellow-600" />
                            <span className="text-xs font-medium text-yellow-700">Belum Mengunggah Dokumen NPWP</span>
                          </div>
                        )}
                      </div>

                      {/* Registration Date */}
                      <div className="p-3 bg-gray-50 rounded-xl">
                        <div className="text-xs text-gray-500 mb-1">Tanggal Registrasi</div>
                        <div className="text-sm font-medium text-gray-900">
                          {detail.createdAt ? new Date(detail.createdAt).toLocaleDateString("id-ID", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }) : "-"}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={() => { setExpandedId(null); setDetail(null); }}
                          className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                        >
                          Tutup
                        </button>
                        {detail.verificationStatus === "Pending" && (
                          <>
                            <button
                              onClick={() => handleVerify(detail.id, "Rejected")}
                              disabled={actionLoadingId === detail.id}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors disabled:opacity-50"
                            >
                              {actionLoadingId === detail.id ? (
                                <Loader2 size={14} className="animate-spin" />
                              ) : (
                                <XCircle size={14} />
                              )}
                              Tolak
                            </button>
                            <button
                              onClick={() => handleVerify(detail.id, "Verified")}
                              disabled={actionLoadingId === detail.id}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50"
                            >
                              {actionLoadingId === detail.id ? (
                                <Loader2 size={14} className="animate-spin" />
                              ) : (
                                <CheckCircle size={14} />
                              )}
                              Setujui
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-12 text-center">
                    <XCircle size={32} className="mx-auto text-red-400 mb-3" />
                    <p className="text-sm text-gray-500">Gagal memuat detail</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </DashboardLayout>
  );
}
