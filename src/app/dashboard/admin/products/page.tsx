"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Sidebar } from "@/components/dashboard-section/sidebar";
import { Topbar } from "@/components/dashboard-section/top-bar";
import { DataTable } from "@/components/dashboard-section/DataTable";
import { productService } from "@/lib/api/services/products";
import { UnauthorizedError } from "@/lib/api/api";
import type { Product, ProductStatus } from "@/lib/types/api";
import { formatIdNumber } from "@/lib/format";
import {
  Search,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  RefreshCw,
} from "lucide-react";

const STATUS_COLORS: Record<ProductStatus, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Rejected: "bg-red-100 text-red-700",
  Draft: "bg-gray-100 text-gray-600",
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProductStatus | "all">("all");
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [showStatusModal, setShowStatusModal] = useState<number | null>(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await productService.getAll();
      setProducts(res.data || []);
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        window.location.href = "/login";
        return;
      }
      setError(err instanceof Error ? err.message : "Gagal memuat produk");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleStatusUpdate = async (id: number, status: ProductStatus) => {
    setActionLoadingId(id);
    try {
      await productService.updateStatus(id, status);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status } : p))
      );
      setShowStatusModal(null);
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        window.location.href = "/login";
        return;
      }
      alert(err instanceof Error ? err.message : "Gagal mengubah status");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;
    setActionLoadingId(id);
    try {
      await productService.delete(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        window.location.href = "/login";
        return;
      }
      alert(err instanceof Error ? err.message : "Gagal menghapus produk");
    } finally {
      setActionLoadingId(null);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.supplier?.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.name_categories?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      key: "nama",
      label: "Produk",
      render: (item: Product) => (
        <div>
          <div className="font-medium text-gray-900">{item.nama}</div>
          <div className="text-xs text-gray-500 mt-0.5">
            {item.category?.name_categories || "Tanpa kategori"}
          </div>
        </div>
      ),
    },
    {
      key: "supplier",
      label: "Supplier",
      render: (item: Product) => (
        <span className="text-gray-700">
          {item.supplier?.company_name || "-"}
        </span>
      ),
    },
    {
      key: "price",
      label: "Harga",
      render: (item: Product) => (
        <span className="font-medium text-gray-900">
          Rp {formatIdNumber(item.price_min)}
          {item.price_min !== item.price_max && (
            <> - {formatIdNumber(item.price_max)}</>
          )}
        </span>
      ),
    },
    {
      key: "views",
      label: "Views",
      render: (item: Product) => (
        <span className="tabular-nums">{formatIdNumber(item.views)}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item: Product) => (
        <div className="relative">
          <button
            onClick={() => setShowStatusModal(showStatusModal === item.id ? null : item.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${STATUS_COLORS[item.status]}`}
          >
            {item.status === "Active" && <CheckCircle size={12} />}
            {item.status === "Pending" && <Clock size={12} />}
            {item.status === "Rejected" && <XCircle size={12} />}
            {item.status}
          </button>
          {showStatusModal === item.id && (
            <div className="absolute right-0 top-10 w-40 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-20">
              {(["Active", "Pending", "Rejected", "Draft"] as ProductStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => handleStatusUpdate(item.id, s)}
                  disabled={actionLoadingId === item.id}
                  className={`w-full px-3 py-2.5 text-xs text-left hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                    item.status === s ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600"
                  }`}
                >
                  {actionLoadingId === item.id ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <>
                      {s === "Active" && <CheckCircle size={12} className="text-emerald-500" />}
                      {s === "Pending" && <Clock size={12} className="text-yellow-500" />}
                      {s === "Rejected" && <XCircle size={12} className="text-red-500" />}
                      {s === "Draft" && <span className="w-3 h-3 rounded-full bg-gray-400" />}
                    </>
                  )}
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "actions",
      label: "",
      className: "w-24",
      render: (item: Product) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleDelete(item.id)}
            disabled={actionLoadingId === item.id}
            className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
            title="Hapus"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="ml-[264px]">
        <Topbar />
        <main className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Produk</h1>
              <p className="text-sm text-gray-500 mt-1">
                Kelola semua produk yang terdaftar
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadProducts}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <RefreshCw size={14} />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            {(["Active", "Pending", "Rejected", "Draft"] as ProductStatus[]).map((status) => {
              const count = products.filter((p) => p.status === status).length;
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
              <div className="text-2xl font-bold text-gray-900">{products.length}</div>
            </button>
          </div>

          {/* Search */}
          <div className="mb-4">
            <div className="relative max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama produk, supplier, atau kategori..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          {/* Table */}
          <DataTable
            columns={columns}
            data={filteredProducts}
            loading={loading}
            error={error}
            onRetry={loadProducts}
            emptyMessage="Belum ada produk"
            keyExtractor={(item) => item.id}
          />
        </main>
      </div>
    </div>
  );
}
