"use client";

import { useLanguage } from "@/lib/langue/provider";

type StatusStyle = {
  label: string;
  className: string;
};

// Extend this map if your STATUS_FLOW has statuses beyond what's listed here —
// unknown statuses still render fine via the fallback below.
const STATUS_STYLES: Record<string, StatusStyle> = {
  Pending: {
    label: "orders.statusPending",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  Confirmed: {
    label: "orders.statusConfirmed",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  Processing: {
    label: "orders.statusProcessing",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  Shipped: {
    label: "orders.statusShipped",
    className: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  Completed: {
    label: "orders.statusCompleted",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  Cancelled: {
    label: "orders.statusCancelled",
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

export default function OrderStatusBadge({ status }: { status: string }) {
  const { t } = useLanguage();

  const style = STATUS_STYLES[status] ?? {
    label: status,
    className: "bg-gray-50 text-gray-600 border-gray-200",
  };

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold ${style.className}`}
    >
      {t(style.label)}
    </span>
  );
}