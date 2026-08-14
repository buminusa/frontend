"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-section/DashboardLayout";
import { companyProfileService } from "@/lib/api/services/company-profiles";
import { UnauthorizedError } from "@/lib/api/api";
import { getErrorMessage } from "@/lib/api/errors";
import type { CompanyProfile } from "@/lib/types/api";
import { relativeTime } from "@/lib/format";
import {
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  RefreshCw,
  Building2,
  MapPin,
  Globe,
  Calendar,
  ChevronDown,
  Mail,
  Phone,
  FileText,
  ExternalLink,
} from "lucide-react";

function isImageExtension(url: string): boolean {
  return /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url);
}

export default function VerificationPage() {
  const router = useRouter();
  const [suppliers, setSuppliers] = useState<CompanyProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detail, setDetail] = useState<CompanyProfile | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    id: number;
    status: "Verified" | "Rejected";
  } | null>(null);
  const confirmTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadPending = useCallback(async () => {
    try {
      const res = await companyProfileService.getPending();
      setSuppliers(res);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        router.push("/login?session=expired");
        return;
      }
      setError(getErrorMessage(err, "Gagal memuat data verifikasi"));
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const init = async () => {
      await loadPending();
    };
    void init();
    return () => {
      if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
    };
  }, [loadPending]);

  const expandSupplier = async (supplier: CompanyProfile) => {
    const next = expandedId === supplier.id ? null : supplier.id;
    setExpandedId(next);
    setDetail(null);
    if (next) {
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
    }
  };

  const handleVerify = async (id: number, status: "Verified" | "Rejected") => {
    if (confirmAction?.id === id && confirmAction?.status === status) {
      if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
      setActionLoadingId(id);
      try {
        await companyProfileService.verify(id, status);
        setSuppliers((prev) => prev.filter((s) => s.id !== id));
        setConfirmAction(null);
        setExpandedId(null);
        setDetail(null);
      } catch (err: unknown) {
        if (err instanceof UnauthorizedError) {
          router.push("/login?session=expired");
          return;
        }
        setError(getErrorMessage(err, "Gagal memverifikasi"));
      } finally {
        setActionLoadingId(null);
      }
    } else {
      setConfirmAction({ id, status });
      if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
      confirmTimerRef.current = setTimeout(() => setConfirmAction(null), 3000);
    }
  };

  return (
    <DashboardLayout basePath="/dashboard/admin" roleLabel="Admin">
      <main className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Verifikasi Supplier</h1>
              <p className="text-sm text-gray-500 mt-1">
                Setujui atau tolak pendaftaran supplier baru
              </p>
            </div>
            <button
              onClick={() => {
                setLoading(true);
                loadPending();
              }}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-1/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <XCircle size={32} className="mx-auto text-red-400 mb-3" />
              <p className="text-sm text-gray-500">{error}</p>
              <button
                onClick={() => {
                  setLoading(true);
                  loadPending();
                }}
                className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && suppliers.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={36} className="text-emerald-500" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Semua Sudah Diverifikasi
              </h3>
              <p className="text-sm text-gray-500">
                Tidak ada supplier yang menunggu verifikasi
              </p>
            </div>
          )}

          {/* List */}
          <div className="space-y-4">
            {suppliers.map((supplier) => {
              const isExpanded = expandedId === supplier.id;
              const isLoading = actionLoadingId === supplier.id;
              const isConfirmingReject =
                confirmAction?.id === supplier.id && confirmAction?.status === "Rejected";
              const isConfirmingApprove =
                confirmAction?.id === supplier.id && confirmAction?.status === "Verified";

              return (
                <div
                  key={supplier.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 ${
                    isExpanded
                      ? "border-blue-200 shadow-md"
                      : "border-gray-200 hover:border-blue-200 hover:shadow-sm"
                  }`}
                >
                  {/* Header */}
                  <div
                    onClick={() => expandSupplier(supplier)}
                    className="flex items-center justify-between p-6 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      {supplier.logo_url ? (
                        <Image
                          src={supplier.logo_url}
                          alt={supplier.company_name}
                          width={48}
                          height={48}
                          unoptimized={supplier.logo_url.startsWith("http")}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <Building2 size={20} className="text-blue-600" />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          {supplier.company_name}
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <MapPin size={10} />
                            {supplier.province}, {supplier.country}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock size={10} />
                            {relativeTime(supplier.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                        Pending
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>

                  {/* Expanded */}
                  {isExpanded && (
                    <div className="px-6 pb-6 animate-slideDown">
                      <div className="pt-4 border-t border-gray-100">
                        {detailLoading ? (
                          <div className="py-8 text-center">
                            <Loader2 size={24} className="animate-spin text-blue-500 mx-auto mb-2" />
                            <p className="text-xs text-gray-500">Memuat detail...</p>
                          </div>
                        ) : detail ? (
                          <div className="space-y-4">
                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-3">
                              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <Mail size={14} className="text-gray-400" />
                                <div>
                                  <div className="text-[11px] text-gray-500">Email</div>
                                  <div className="text-sm font-medium text-gray-900">{detail.user?.email || "-"}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <Phone size={14} className="text-gray-400" />
                                <div>
                                  <div className="text-[11px] text-gray-500">Telepon</div>
                                  <div className="text-sm font-medium text-gray-900">{detail.phone}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <MapPin size={14} className="text-gray-400" />
                                <div>
                                  <div className="text-[11px] text-gray-500">Provinsi</div>
                                  <div className="text-sm font-medium text-gray-900">{detail.province}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <Globe size={14} className="text-gray-400" />
                                <div>
                                  <div className="text-[11px] text-gray-500">Negara</div>
                                  <div className="text-sm font-medium text-gray-900">{detail.country}</div>
                                </div>
                              </div>
                            </div>

                            {/* Address */}
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <div className="text-[11px] text-gray-500 mb-1">Alamat</div>
                              <div className="text-sm font-medium text-gray-900">{detail.address}</div>
                            </div>

                            {/* Business Description */}
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <div className="text-[11px] text-gray-500 mb-1">Deskripsi Bisnis</div>
                              <div className="text-sm text-gray-700">{detail.business_description}</div>
                            </div>

                            {/* NPWP Document */}
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <div className="text-[11px] text-gray-500 mb-2">Dokumen NPWP</div>
                              {detail.npwp ? (
                                <div className="space-y-2">
                                  {isImageExtension(detail.npwp) ? (
                                    <Image
                                      src={detail.npwp}
                                      alt="NPWP"
                                      width={800}
                                      height={600}
                                      unoptimized={detail.npwp.startsWith("http")}
                                      className="w-full max-h-48 object-contain rounded-lg border border-gray-200"
                                    />
                                  ) : (
                                    <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200">
                                      <FileText size={18} className="text-gray-400" />
                                      <span className="text-sm text-gray-700">Dokumen NPWP</span>
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
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-1">
                                <Calendar size={12} />
                                Tanggal Pendaftaran
                              </div>
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

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2">
                              <button
                                disabled={isLoading}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleVerify(detail.id, "Rejected");
                                }}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl transition-all disabled:opacity-50 ${
                                  isConfirmingReject
                                    ? "bg-red-600 text-white"
                                    : "border-2 border-red-200 text-red-600 hover:bg-red-50"
                                }`}
                              >
                                {isLoading ? (
                                  <Loader2 size={16} className="animate-spin" />
                                ) : isConfirmingReject ? (
                                  <>
                                    <CheckCircle size={16} />
                                    Konfirmasi Tolak
                                  </>
                                ) : (
                                  <>
                                    <XCircle size={16} />
                                    Tolak Verifikasi
                                  </>
                                )}
                              </button>

                              <button
                                disabled={isLoading}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleVerify(detail.id, "Verified");
                                }}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl transition-all disabled:opacity-50 ${
                                  isConfirmingApprove
                                    ? "bg-emerald-700 text-white"
                                    : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/20"
                                }`}
                              >
                                {isLoading ? (
                                  <Loader2 size={16} className="animate-spin" />
                                ) : isConfirmingApprove ? (
                                  <>
                                    <CheckCircle size={16} />
                                    Konfirmasi Setujui
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle size={16} />
                                    Setujui Verifikasi
                                  </>
                                )}
                              </button>
                            </div>

                            {(isConfirmingReject || isConfirmingApprove) && (
                              <p className="text-xs text-center text-gray-500 mt-1 animate-fadeIn">
                                Klik sekali lagi untuk mengkonfirmasi
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="py-8 text-center">
                            <XCircle size={24} className="mx-auto text-red-400 mb-2" />
                            <p className="text-xs text-gray-500">Gagal memuat detail</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </main>
      </DashboardLayout>
  );
}
