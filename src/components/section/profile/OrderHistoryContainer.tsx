"use client";

import { useEffect, useState } from "react";
import { OrderHistory } from "./OrderHistory";
import { AUTH_EVENT_NAME, getAuthToken } from "@/lib/auth";
import { useLanguage } from "@/lib/langue/provider";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080").replace(/\/$/, "");
// Matches the confirmed route in ordersRoutes.js
const ORDERS_ENDPOINT = `${API_BASE_URL}/api/v1/orders/buyer/my-orders`;

type ApiOrder = {
  id: number;
  createdAt: string;
  total_amount: string | number;
  status: string;
};

type MappedOrder = {
  id: number;
  created_at: Date;
  total_amount: number;
  status: string;
};

export function OrderHistoryContainer() {
  const { t } = useLanguage();
  const [orders, setOrders] = useState<MappedOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadOrders() {
      const token = getAuthToken();

      if (!token) {
        setOrders([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({ page: "1", limit: "3" });
        const response = await fetch(`${ORDERS_ENDPOINT}?${params}`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || t("orders.loadError"));
        }

        const apiOrders = result.data as ApiOrder[];

        setOrders(
          apiOrders.map((order) => ({
            id: order.id,
            created_at: new Date(order.createdAt),
            total_amount: Number(order.total_amount),
            status: order.status,
          }))
        );
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError(err instanceof Error ? err.message : t("orders.loadError"));
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    loadOrders();
    window.addEventListener(AUTH_EVENT_NAME, loadOrders);

    return () => {
      controller.abort();
      window.removeEventListener(AUTH_EVENT_NAME, loadOrders);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {t("orders.title")}
        </h2>
        <p className="text-sm text-gray-500">{t("orders.loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {t("orders.title")}
        </h2>
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return <OrderHistory orders={orders} />;
}