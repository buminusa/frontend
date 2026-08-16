"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-section/DashboardLayout";
import { DataTable } from "@/components/dashboard-section/DataTable";
import { productService } from "@/lib/api/services/products";
import { UnauthorizedError } from "@/lib/api/api";
import { getErrorMessage } from "@/lib/api/errors";
import { useLanguage } from "@/lib/langue/provider";
import type { Product } from "@/lib/types/api";
import { formatIdNumber } from "@/lib/format";
import {
  Search,
  Trash2,
  RefreshCw,
} from "lucide-react";

export default function ProductsPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      const res = await productService.getAll();
      setProducts(res.data || []);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        router.push("/login?session=expired");
        return;
      }
      setError(getErrorMessage(err, t("dashboard.products.loadFailed")));
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const init = async () => {
      await loadProducts();
    };
    void init();
  }, [loadProducts]);

  const handleDelete = async (id: number) => {
    if (!confirm(t("dashboard.products.deleteConfirm"))) return;
    setActionLoadingId(id);
    try {
      await productService.delete(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        router.push("/login?session=expired");
        return;
      }
      setError(getErrorMessage(err, t("dashboard.products.deleteFailed")));
    } finally {
      setActionLoadingId(null);
    }
  };

  const filteredProducts = products.filter((p) =>
    [p.nama, p.supplier?.company_name, p.category?.name_categories]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: "nama",
      label: t("dashboard.products.name"),
      render: (item: Product) => (
        <div>
          <div className="font-medium text-gray-900">{item.nama}</div>
          <div className="text-xs text-gray-500 mt-0.5">
            {item.category?.name_categories || t("dashboard.products.noCategory")}
          </div>
        </div>
      ),
    },
    {
      key: "supplier",
      label: t("dashboard.products.supplier"),
      render: (item: Product) => (
        <span className="text-gray-700">
          {item.supplier?.company_name || "-"}
        </span>
      ),
    },
    {
      key: "price",
      label: t("dashboard.products.price"),
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
      label: t("dashboard.products.views"),
      render: (item: Product) => (
        <span className="tabular-nums">{formatIdNumber(item.views)}</span>
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
            title={t("dashboard.common.delete")}
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout basePath="/dashboard/admin" roleLabel="Admin">
      <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t("dashboard.products.title")}</h1>
              <p className="text-sm text-gray-500 mt-1">
                {t("dashboard.products.description")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setLoading(true);
                  loadProducts();
                }}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <RefreshCw size={14} />
                {t("dashboard.common.refresh")}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <div className="relative max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t("dashboard.products.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredProducts}
            loading={loading}
            error={error}
            onRetry={() => {
              setLoading(true);
              loadProducts();
            }}
            emptyMessage={t("dashboard.products.empty")}
            keyExtractor={(item) => item.id}
          />
        </main>
      </DashboardLayout>
  );
}
