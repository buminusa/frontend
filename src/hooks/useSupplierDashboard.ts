"use client";

import { useEffect, useState } from "react";
import { AUTH_EVENT_NAME, getAuthToken } from "@/lib/auth";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080"
).replace(/\/$/, "");

type ApiProduct = {
  id: number;
  nama: string;
  price_min?: string | number;
  min_order?: number;
  status?: string;
  views?: number;
  category?: { name_categories?: string } | null;
  images?: { image_url?: string }[];
};

type ApiOrder = {
  id: number;
  order_number?: string;
  status?: string;
  total_amount?: string | number;
  createdAt?: string;
  buyer?: { full_name?: string | null } | null;
  orderItems?: Array<{ product?: { nama?: string } | null }>;
};

export interface SupplierDashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalViews: number;
}

export interface SupplierDashboardOrder {
  id: string;
  customer: string;
  product: string;
  amount: number;
  amountLabel: string;
  status: string;
  date: string;
}

export interface SupplierDashboardProduct {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: string;
  views: number;
}

export interface SupplierDashboardActivity {
  title: string;
  time: string;
  icon: "shopping" | "package" | "user" | "star";
}

export interface SupplierDashboardData {
  stats: SupplierDashboardStats;
  orders: SupplierDashboardOrder[];
  products: SupplierDashboardProduct[];
  activities: SupplierDashboardActivity[];
  loading: boolean;
  error: string;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatRelativeTime(dateString: string) {
  const value = new Date(dateString);
  if (Number.isNaN(value.getTime())) {
    return "Baru saja";
  }

  const diffInMinutes = Math.floor((Date.now() - value.getTime()) / 60000);
  if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} jam yang lalu`;

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} hari yang lalu`;
}

export function useSupplierDashboard(): SupplierDashboardData {
  const [stats, setStats] = useState<SupplierDashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalViews: 0,
  });
  const [orders, setOrders] = useState<SupplierDashboardOrder[]>([]);
  const [products, setProducts] = useState<SupplierDashboardProduct[]>([]);
  const [activities, setActivities] = useState<SupplierDashboardActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadDashboardData() {
      const token = getAuthToken();

      if (!token) {
        setError("Silakan login terlebih dahulu");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const [productsResponse, ordersResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/v1/products/me`, {
            headers: { Authorization: `Bearer ${token}` },
            signal: controller.signal,
          }),
          fetch(`${API_BASE_URL}/api/v1/orders/supplier/my-orders?limit=5`, {
            headers: { Authorization: `Bearer ${token}` },
            signal: controller.signal,
          }),
        ]);

        const productsJson = await productsResponse.json().catch(() => ({}));
        const ordersJson = await ordersResponse.json().catch(() => ({}));

        if (!productsResponse.ok) {
          throw new Error(productsJson.message || "Gagal memuat data produk");
        }

        if (!ordersResponse.ok) {
          throw new Error(ordersJson.message || "Gagal memuat data pesanan");
        }

        const productList = Array.isArray(productsJson.data)
          ? (productsJson.data as ApiProduct[])
          : [];
        const orderList = Array.isArray(ordersJson.data)
          ? (ordersJson.data as ApiOrder[])
          : [];

        const mappedProducts: SupplierDashboardProduct[] = productList.map(
          (product) => ({
            id: product.id,
            name: product.nama,
            category: product.category?.name_categories ?? "Tanpa kategori",
            price: formatCurrency(Number(product.price_min ?? 0)),
            stock: Number(product.min_order ?? 0),
            status: product.status ?? "Pending",
            views: Number(product.views ?? 0),
          }),
        );

        const mappedOrders: SupplierDashboardOrder[] = orderList.map(
          (order) => ({
            id: order.order_number ?? `ORD-${order.id}`,
            customer: order.buyer?.full_name ?? "Pembeli tidak tersedia",
            product:
              order.orderItems?.[0]?.product?.nama ?? "Produk tidak tersedia",
            amount: Number(order.total_amount ?? 0),
            amountLabel: formatCurrency(Number(order.total_amount ?? 0)),
            status: order.status ?? "Pending",
            date: order.createdAt ?? new Date().toISOString(),
          }),
        );

        const totalRevenue = mappedOrders.reduce(
          (sum, order) => sum + order.amount,
          0,
        );
        const totalViews = mappedProducts.reduce(
          (sum, product) => sum + product.views,
          0,
        );

        setProducts(mappedProducts);
        setOrders(mappedOrders);
        setStats({
          totalProducts: mappedProducts.length,
          totalOrders: mappedOrders.length,
          totalRevenue,
          totalViews,
        });

        const nextActivities: SupplierDashboardActivity[] = [
          ...mappedOrders.slice(0, 3).map((order) => ({
            title: `Pesanan ${order.id} dari ${order.customer}`,
            time: formatRelativeTime(order.date),
            icon: "shopping" as const,
          })),
          ...mappedProducts.slice(0, 2).map((product) => ({
            title: `Produk ${product.name} sedang ${product.status}`,
            time: formatRelativeTime(new Date().toISOString()),
            icon: "package" as const,
          })),
        ].slice(0, 5);

        setActivities(nextActivities);
      } catch (loadError) {
        if ((loadError as Error).name !== "AbortError") {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Gagal memuat data dashboard",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadDashboardData();
    window.addEventListener(AUTH_EVENT_NAME, loadDashboardData);

    return () => {
      controller.abort();
      window.removeEventListener(AUTH_EVENT_NAME, loadDashboardData);
    };
  }, []);

  return {
    stats,
    orders,
    products,
    activities,
    loading,
    error,
  };
}
