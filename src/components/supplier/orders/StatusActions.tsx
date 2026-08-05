"use client";

import { Check, X, Package } from "lucide-react";
import { orderService } from "@/lib/api/services/orders";
import type { OrderStatus } from "@/lib/types/api";

export const STATUS_FLOW: Record<OrderStatus, OrderStatus[]> = {
  Pending: ["Confirmed", "Cancelled"],
  Confirmed: ["Processing", "Cancelled"],
  Processing: ["Shipped"],
  Shipped: [],
  Completed: [],
  Cancelled: [],
};

const nextActions: Record<OrderStatus, { to: OrderStatus; label: string }[]> = {
  Pending: [
    { to: "Confirmed", label: "Konfirmasi" },
    { to: "Cancelled", label: "Batalkan" },
  ],
  Confirmed: [
    { to: "Processing", label: "Proses" },
    { to: "Cancelled", label: "Batalkan" },
  ],
  Processing: [{ to: "Shipped", label: "Kirim" }],
  Shipped: [],
  Completed: [],
  Cancelled: [],
};

export function canAdvanceOrder(status: OrderStatus): boolean {
  return nextActions[status]?.length > 0;
}

export function StatusActions({
  orderId,
  status,
  onStatusChange,
  busy,
}: {
  orderId: number;
  status: OrderStatus;
  onStatusChange: (id: number, next: OrderStatus) => Promise<void>;
  busy: boolean;
}) {
  const actions = nextActions[status] ?? [];

  if (actions.length === 0) {
    return <span className="text-xs text-gray-400">Selesai</span>;
  }

  return (
    <div className="flex items-center gap-1.5">
      {actions.map((action) => {
        const isCancel = action.to === "Cancelled";
        const Icon = isCancel ? X : action.to === "Confirmed" ? Check : Package;
        return (
          <button
            key={action.to}
            type="button"
            disabled={busy}
            onClick={() => void onStatusChange(orderId, action.to)}
            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${
              isCancel
                ? "border border-red-200 text-red-600 hover:bg-red-50"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {action.label}
          </button>
        );
      })}
    </div>
  );
}

export const SUPPLIER_TRANSITIONS = STATUS_FLOW;

export function canTransition(from: OrderStatus, to: OrderStatus): boolean {
  return (STATUS_FLOW[from] ?? []).includes(to);
}

export async function updateOrderStatus(
  id: number,
  status: OrderStatus,
): Promise<void> {
  await orderService.updateStatus(id, status);
}
