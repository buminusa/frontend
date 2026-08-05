"use client";

import { useMemo, useState } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  Package,
  Search,
  Download,
} from "lucide-react";
import type { SupplierDashboardOrder } from "@/hooks/useSupplierDashboard";
import { downloadCSV } from "@/lib/utils/csv";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Processing: "bg-blue-100 text-blue-800",
  Shipped: "bg-purple-100 text-purple-800",
  Completed: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
  Paid: "bg-green-100 text-green-800",
};

const statusIcons = {
  Pending: Clock,
  Processing: Package,
  Shipped: CheckCircle,
  Completed: CheckCircle,
  Cancelled: XCircle,
  Paid: CheckCircle,
};

interface RecentOrdersProps {
  orders: SupplierDashboardOrder[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");

  const statuses = useMemo(
    () =>
      Array.from(new Set(orders.map((order) => order.status))).sort(),
    [orders],
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return orders.filter((order) => {
      if (statusFilter !== "Semua" && order.status !== statusFilter) {
        return false;
      }
      if (!query) return true;
      return (
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.product.toLowerCase().includes(query)
      );
    });
  }, [orders, search, statusFilter]);

  const handleExport = () => {
    downloadCSV(
      filtered.map((order) => ({
        "No. Pesanan": order.id,
        Pembeli: order.customer,
        Produk: order.product,
        Total: order.amountLabel,
        Status: order.status,
        Tanggal: new Date(order.date).toLocaleDateString("id-ID"),
      })),
      "pesanan-terbaru",
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Pesanan Terbaru
          </h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari pesanan..."
                className="pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-48"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
            >
              <option value="Semua">Semua Status</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleExport}
              disabled={filtered.length === 0}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              CSV
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No. Pesanan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pembeli
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produk
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-sm text-gray-500 text-center"
                >
                  {search || statusFilter !== "Semua"
                    ? "Tidak ada pesanan yang cocok."
                    : "Belum ada pesanan."}
                </td>
              </tr>
            ) : (
              filtered.map((order) => {
                const StatusIcon =
                  statusIcons[order.status as keyof typeof statusIcons] ??
                  Clock;
                return (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {order.product}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {order.amountLabel}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status as keyof typeof statusColors] ?? "bg-gray-100 text-gray-800"}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString("id-ID")}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}