"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPin, Search, RefreshCw } from "lucide-react";
import { orderService } from "@/lib/api/services/orders";
import { StatusActions } from "./StatusActions";
import type { Order, OrderStatus } from "@/lib/types/api";

const statusColors: Record<OrderStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-blue-100 text-blue-800",
  Processing: "bg-purple-100 text-purple-800",
  Shipped: "bg-indigo-100 text-indigo-800",
  Completed: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

const ALL_STATUSES: Array<"Semua" | OrderStatus> = [
  "Semua",
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Completed",
  "Cancelled",
];

const statusFilterValue = (status: string): OrderStatus =>
  ["Pending", "Confirmed", "Processing", "Shipped", "Completed", "Cancelled"].includes(status) ? (status as OrderStatus) : "Pending";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function SupplierOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("Semua");
  const [busyId, setBusyId] = useState<number | null>(null);

  const loadOrders = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const response = await orderService.getMyOrdersAsSupplier(100);
      setOrders(response.data ?? []);
      setError("");
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : "Gagal memuat pesanan",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const initial = async () => {
      try {
        const response = await orderService.getMyOrdersAsSupplier(100);
        if (!active) return;
        setOrders(response.data ?? []);
        setError("");
      } catch (loadError) {
        if (!active) return;
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Gagal memuat pesanan",
        );
      } finally {
        if (active) setLoading(false);
      }
    };

    void initial();

    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return orders.filter((order) => {
      if (status !== "Semua" && order.status !== status) return false;
      if (!query) return true;
      return (
        order.order_number.toLowerCase().includes(query) ||
        order.buyer?.full_name?.toLowerCase().includes(query) ||
        order.shipping_address.toLowerCase().includes(query)
      );
    });
  }, [orders, search, status]);

  const itemsSummary = (order: Order) =>
    (order.orderItems ?? [])
      .map((item) => item.product?.nama ?? "Produk")
      .join(", ");

  const handleStatusChange = async (id: number, next: OrderStatus) => {
    setBusyId(id);
    setError("");
    try {
      await orderService.updateStatus(id, next);
      await loadOrders();
    } catch (updateError) {
      setError(
        updateError instanceof Error
          ? updateError.message
          : "Gagal mengubah status pesanan",
      );
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-4 p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Pesanan Masuk</h1>
          <p className="text-sm text-gray-500">
            Kelola status pesanan dari pembeli.
          </p>
        </div>
        <button
          onClick={() => void loadOrders()}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Muat ulang
        </button>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nomor pesanan, pembeli..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none"
        >
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s === "Semua" ? "Semua Status" : s}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500">
          Memuat pesanan...
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
          {search || status !== "Semua"
            ? "Tidak ada pesanan yang cocok."
            : "Belum ada pesanan masuk."}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    No. Pesanan
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Pembeli
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Produk
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Alamat Pengiriman
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Tanggal
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {order.order_number}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {order.buyer?.full_name ?? "Pembeli tidak tersedia"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {itemsSummary(order)}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {formatCurrency(Number(order.total_amount ?? 0))}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span className="max-w-[180px] truncate">
                          {order.shipping_address}
                        </span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[statusFilterValue(order.status)]}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusActions
                        orderId={order.id}
                        status={statusFilterValue(order.status)}
                        onStatusChange={handleStatusChange}
                        busy={busyId === order.id}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}