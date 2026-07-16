"use client";

import React, { useState } from "react";
import type { CompanyProfile } from "@/lib/types/dashboard";
import { relativeTime } from "@/lib/format";
import {
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  ChevronDown,
  ChevronRight,
  Loader2,
  Building2,
  Globe,
  Calendar,
  MoreVertical,
  Filter,
} from "lucide-react";

interface PendingVerificationProps {
  items: CompanyProfile[];
  loading: boolean;
  actionLoadingId: number | null;
  onVerify: (id: number, status: "Verified" | "Rejected") => void;
}

export function PendingVerification({
  items,
  loading,
  actionLoadingId,
  onVerify,
}: PendingVerificationProps) {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    id: number;
    status: "Verified" | "Rejected";
  } | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"all" | "new" | "old">(
    "all"
  );

  const handleVerify = (id: number, status: "Verified" | "Rejected") => {
    if (confirmAction?.id === id && confirmAction?.status === status) {
      onVerify(id, status);
      setConfirmAction(null);
    } else {
      setConfirmAction({ id, status });
      setTimeout(() => setConfirmAction(null), 3000);
    }
  };

  const filteredItems = [...items].sort((a, b) => {
    if (filterStatus === "new") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (filterStatus === "old") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return 0;
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-lg hover:border-gray-300">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Verifikasi Tertunda
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Supplier baru menunggu persetujuan
          </p>
        </div>
        <div className="flex items-center gap-2">
          {items.length > 0 && (
            <span className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold border border-yellow-200">
              {items.length} pending
            </span>
          )}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-all text-gray-500"
          >
            <MoreVertical size={14} />
          </button>
          {showMenu && (
            <div className="absolute right-6 top-14 w-44 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-10">
              <button
                onClick={() => {
                  setFilterStatus("all");
                  setShowMenu(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2.5 text-xs transition-colors ${
                  filterStatus === "all"
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Filter size={14} />
                Semua
              </button>
              <button
                onClick={() => {
                  setFilterStatus("new");
                  setShowMenu(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2.5 text-xs transition-colors ${
                  filterStatus === "new"
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Clock size={14} />
                Terbaru
              </button>
              <button
                onClick={() => {
                  setFilterStatus("old");
                  setShowMenu(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2.5 text-xs transition-colors ${
                  filterStatus === "old"
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Calendar size={14} />
                Terlama
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Empty State */}
      {!loading && items.length === 0 && (
        <div className="py-12 text-center">
          <div className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle size={36} className="text-emerald-500" />
          </div>
          <h4 className="text-base font-semibold text-gray-900 mb-1">
            Semua Sudah Diverifikasi
          </h4>
          <p className="text-sm text-gray-500">
            Tidak ada supplier yang menunggu verifikasi
          </p>
          <button className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            Lihat Riwayat Verifikasi
          </button>
        </div>
      )}

      {/* Verification List */}
      <div className="space-y-3">
        {filteredItems.map((v) => {
          const isExpanded = expandedItem === v.id;
          const isLoading = actionLoadingId === v.id;
          const isConfirmingReject =
            confirmAction?.id === v.id &&
            confirmAction?.status === "Rejected";
          const isConfirmingApprove =
            confirmAction?.id === v.id &&
            confirmAction?.status === "Verified";

          return (
            <div
              key={v.id}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? "border-blue-200 shadow-md bg-blue-50/30"
                  : "border-gray-200 hover:border-blue-200 hover:shadow-sm"
              }`}
            >
              {/* Header */}
              <div
                onClick={() =>
                  setExpandedItem(isExpanded ? null : v.id)
                }
                className="flex items-center justify-between p-4 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <Building2 size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {v.company_name}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin size={10} />
                        <span>
                          {v.province}, {v.country}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock size={10} />
                        <span>{relativeTime(v.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-4 pb-4 animate-slideDown">
                  <div className="pt-4 border-t border-blue-100">
                    {/* Details Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="p-3 bg-white rounded-lg border border-gray-100">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                          <Building2 size={12} />
                          Perusahaan
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {v.company_name}
                        </div>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-100">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                          <MapPin size={12} />
                          Provinsi
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {v.province}
                        </div>
                      </div>
                      <div className="p-3 bg-white rounded-lg border border-gray-100">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                          <Globe size={12} />
                          Negara
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {v.country}
                        </div>
                      </div>
                    </div>

                    {/* Registration Date */}
                    <div className="p-3 bg-white rounded-lg border border-gray-100 mb-4">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <Calendar size={12} />
                        Tanggal Pendaftaran
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {v.createdAt ? new Date(v.createdAt).toLocaleDateString("id-ID", {
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
                    <div className="flex gap-3">
                      <button
                        disabled={isLoading}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVerify(v.id, "Rejected");
                        }}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                          isConfirmingReject
                            ? "bg-red-600 text-white shadow-lg shadow-red-500/30"
                            : "border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
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
                          handleVerify(v.id, "Verified");
                        }}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                          isConfirmingApprove
                            ? "bg-emerald-700 text-white shadow-lg shadow-emerald-500/30"
                            : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30"
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
                      <p className="text-xs text-center text-gray-500 mt-3 animate-fadeIn">
                        Klik sekali lagi untuk mengkonfirmasi
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button className="w-full py-3 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all flex items-center justify-center gap-2">
            Lihat Semua Verifikasi
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
