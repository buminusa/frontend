"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-section/DashboardLayout";
import { DataTable } from "@/components/dashboard-section/DataTable";
import { orderService } from "@/lib/api/services/orders";
import { UnauthorizedError } from "@/lib/api/api";
import { getErrorMessage } from "@/lib/api/errors";
import { useLanguage } from "@/lib/langue/provider";
import { ORDER_STATUS_CONFIG } from "@/lib/dashboard-constants";
import type { Order, OrderStatus } from "@/lib/types/api";
import { formatIdNumber } from "@/lib/format";
import {
  Search,
  RefreshCw,
  Eye,
  Trash2,
  X,
} from "lucide-react";

const STATUS_FLOW: Record<OrderStatus, OrderStatus[]> = {
  Pending: ["Confirmed", "Cancelled"],
  Confirmed: ["Processing", "Cancelled"],
  Processing: ["Shipped"],
  Shipped: ["Completed"],
  Completed: [],
  Cancelled: [],
};

export default function OrdersPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showStatusModal, setShowStatusModal] = useState<number | null>(null);

  const loadOrders = useCallback(async () => {
    try {
      const res = await orderService.getAll();
      setOrders(res.data || []);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        router.push("/login?session=expired");
        return;
      }
      setError(getErrorMessage(err, t("dashboard.orders.loadFailed")));
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const init = async () => {
      await loadOrders();
    };
    void init();
  }, [loadOrders]);

  const handleStatusUpdate = async (id: number, status: OrderStatus) => {
    setActionLoadingId(id);
    try {
      await orderService.updateStatus(id, status);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      );
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        router.push("/login?session=expired");
        return;
      }
      setError(getErrorMessage(err, t("dashboard.orders.statusUpdateFailed")));
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(t("dashboard.orders.deleteConfirm"))) return;
    setActionLoadingId(id);
    try {
      await orderService.delete(id);
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        router.push("/login?session=expired");
        return;
      }
      setError(getErrorMessage(err, t("dashboard.orders.deleteFailed")));
    } finally {
      setActionLoadingId(null);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.buyer?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.supplier?.company_name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      key: "order_number",
      label: t("dashboard.orders.number"),
      render: (item: Order) => (
        <span className="font-mono font-medium text-gray-900">{item.order_number}</span>
      ),
    },
    {
      key: "buyer",
      label: t("dashboard.orders.buyer"),
      render: (item: Order) => (
        <span className="text-gray-700">{item.buyer?.full_name || "-"}</span>
      ),
    },
    {
      key: "supplier",
      label: t("dashboard.orders.supplier"),
      render: (item: Order) => (
        <span className="text-gray-700">{item.supplier?.company_name || "-"}</span>
      ),
    },
    {
      key: "total_amount",
      label: t("dashboard.orders.total"),
      render: (item: Order) => (
        <span className="font-medium text-gray-900">
          Rp {formatIdNumber(item.total_amount)}
        </span>
      ),
    },
    {
      key: "status",
      label: t("dashboard.common.status"),
      render: (item: Order) => {
        const config = ORDER_STATUS_CONFIG[item.status];
        const nextStatuses = STATUS_FLOW[item.status] || [];
        const isOpen = showStatusModal === item.id;
        return (
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (nextStatuses.length > 0 && item.status !== "Completed" && item.status !== "Cancelled") {
                  setShowStatusModal(isOpen ? null : item.id);
                }
              }}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                nextStatuses.length > 0 && item.status !== "Completed" && item.status !== "Cancelled"
                  ? "cursor-pointer hover:shadow-sm"
                  : ""
              } ${config.color}`}
            >
              {config.icon && <config.icon size={12} />}
              {t(config.labelKey)}
            </button>
            {isOpen && (
              <div className="absolute left-0 top-full mt-1 z-50 bg-white border border-gray-200 rounded-xl shadow-lg py-1 min-w-[160px]">
                    {nextStatuses.map((nextStatus) => {
                      const nextConfig = ORDER_STATUS_CONFIG[nextStatus];
                      return (
                        <button
                          key={nextStatus}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusUpdate(item.id, nextStatus);
                            setShowStatusModal(null);
                          }}
                          disabled={actionLoadingId === item.id}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                          {nextConfig.icon && <nextConfig.icon size={12} />}
                          {t(nextConfig.labelKey)}
                        </button>
                      );
                    })}
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: "createdAt",
      label: t("dashboard.orders.date"),
      render: (item: Order) => (
        <span className="text-gray-500 text-sm">
          {item.createdAt ? new Date(item.createdAt).toLocaleDateString("id-ID") : "-"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "",
      className: "w-24",
      render: (item: Order) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            title={t("dashboard.common.detail")}
          >
            <Eye size={14} />
          </button>
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
      <main className="p-6" onClick={() => setShowStatusModal(null)}>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t("dashboard.orders.title")}</h1>
              <p className="text-sm text-gray-500 mt-1">
                {t("dashboard.orders.description")}
              </p>
            </div>
            <button
              onClick={() => {
                setLoading(true);
                loadOrders();
              }}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <RefreshCw size={14} />
              {t("dashboard.common.refresh")}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-6 gap-3 mb-6">
            {(Object.keys(ORDER_STATUS_CONFIG) as OrderStatus[]).map((status) => {
              const config = ORDER_STATUS_CONFIG[status];
              const count = orders.filter((o) => o.status === status).length;
              return (
                <button
                  key={status}
                  onClick={() => setStatusFilter(statusFilter === status ? "all" : status)}
                  className={`p-3 rounded-xl border transition-all ${
                    statusFilter === status
                      ? "border-blue-300 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="text-xs text-gray-500 mb-1">{t(config.labelKey)}</div>
                  <div className="text-xl font-bold text-gray-900">{count}</div>
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="mb-4">
            <div className="relative max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t("dashboard.orders.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          {/* Table */}
          <DataTable
            columns={columns}
            data={filteredOrders}
            loading={loading}
            error={error}
            onRetry={() => {
              setLoading(true);
              loadOrders();
            }}
            emptyMessage={t("dashboard.orders.empty")}
            keyExtractor={(item) => item.id}
          />

          {/* Detail Modal */}
          {expandedId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4">
                {(() => {
                  const order = orders.find((o) => o.id === expandedId);
                  if (!order) return null;
                  return (
                    <>
                      <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {t("dashboard.orders.detailTitle")} {order.order_number}
                        </h3>
                        <button
                          onClick={() => setExpandedId(null)}
                          className="p-2 rounded-lg hover:bg-gray-100"
                        >
                          <X size={16} className="text-gray-500" />
                        </button>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-gray-500">{t("dashboard.orders.buyer")}</label>
                            <p className="font-medium text-gray-900">{order.buyer?.full_name || "-"}</p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">{t("dashboard.orders.supplier")}</label>
                            <p className="font-medium text-gray-900">{order.supplier?.company_name || "-"}</p>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500">{t("dashboard.orders.shippingAddress")}</label>
                          <p className="text-sm text-gray-700">{order.shipping_address}</p>
                        </div>
                        {order.notes && (
                          <div>
                            <label className="text-xs text-gray-500">{t("dashboard.orders.notes")}</label>
                            <p className="text-sm text-gray-700">{order.notes}</p>
                          </div>
                        )}
                        <div>
                          <label className="text-xs text-gray-500">{t("dashboard.orders.orderItems")}</label>
                          <div className="mt-2 space-y-2">
                            {order.orderItems?.map((item) => (
                              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-700">
                                  {item.product?.nama || t("dashboard.orders.product")}
                                </span>
                                <span className="text-sm font-medium text-gray-900">
                                  x{item.quantity}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <span className="text-sm text-gray-500">{t("dashboard.orders.total")}</span>
                          <span className="text-lg font-bold text-gray-900">
                            Rp {formatIdNumber(order.total_amount)}
                          </span>
                        </div>

                        {/* Status Update */}
                        {order.status !== "Completed" && order.status !== "Cancelled" && (
                          <div className="flex gap-2 pt-4">
                            {order.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => {
                                    handleStatusUpdate(order.id, "Cancelled");
                                    setExpandedId(null);
                                  }}
                                  className="flex-1 px-4 py-2.5 text-sm font-medium text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
                                >
                                  {t("dashboard.orders.cancelOrder")}
                                </button>
                                <button
                                  onClick={() => {
                                    handleStatusUpdate(order.id, "Confirmed");
                                    setExpandedId(null);
                                  }}
                                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
                                >
                                  {t("dashboard.orders.confirm")}
                                </button>
                              </>
                            )}
                            {order.status === "Confirmed" && (
                              <button
                                onClick={() => {
                                  handleStatusUpdate(order.id, "Processing");
                                  setExpandedId(null);
                                }}
                                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors"
                              >
                                {t("dashboard.orders.process")}
                              </button>
                            )}
                            {order.status === "Processing" && (
                              <button
                                onClick={() => {
                                  handleStatusUpdate(order.id, "Shipped");
                                  setExpandedId(null);
                                }}
                                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-xl hover:bg-purple-700 transition-colors"
                              >
                                {t("dashboard.orders.ship")}
                              </button>
                            )}
                            {order.status === "Shipped" && (
                              <button
                                onClick={() => {
                                  handleStatusUpdate(order.id, "Completed");
                                  setExpandedId(null);
                                }}
                                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors"
                              >
                                {t("dashboard.orders.complete")}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          )}
        </main>
      </DashboardLayout>
  );
}
