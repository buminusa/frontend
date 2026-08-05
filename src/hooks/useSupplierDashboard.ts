"use client";

import { useEffect, useRef, useState } from "react";
import { clearAuthToken, AUTH_EVENT_NAME } from "@/lib/auth";
import { productService } from "@/lib/api/services/products";
import { orderService } from "@/lib/api/services/orders";
import { UnauthorizedError } from "@/lib/api/api";

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
  minOrder: number;
}

export interface SupplierDashboardActivity {
  title: string;
  time: string;
  icon: "shopping" | "package" | "user" | "star";
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

export function useSupplierDashboard(): {
  stats: SupplierDashboardStats;
  orders: SupplierDashboardOrder[];
  products: SupplierDashboardProduct[];
  activities: SupplierDashboardActivity[];
  loading: boolean;
  error: string;
  reload: () => void;
} {
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
  const mountedRef = useRef(true);

  const loadDashboardData = async (showLoading = true) => {
    if (showLoading && mountedRef.current) {
      setLoading(true);
    }

    try {
      const [productsResponse, ordersResponse] = await Promise.all([
        productService.getMy(),
        orderService.getMyOrdersAsSupplier(100),
      ]);

      if (!mountedRef.current) return;

      const productList = Array.isArray(productsResponse.data)
        ? productsResponse.data
        : [];
      const orderList = Array.isArray(ordersResponse.data)
        ? ordersResponse.data
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
          minOrder: Number(product.min_order ?? 0),
        }),
      );

      const mappedOrders: SupplierDashboardOrder[] = orderList.map((order) => ({
        id: order.order_number ?? `ORD-${order.id}`,
        customer: order.buyer?.full_name ?? "Pembeli tidak tersedia",
        product:
          order.orderItems?.[0]?.product?.nama ?? "Produk tidak tersedia",
        amount: Number(order.total_amount ?? 0),
        amountLabel: formatCurrency(Number(order.total_amount ?? 0)),
        status: order.status ?? "Pending",
        date: order.createdAt ?? new Date().toISOString(),
      }));

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
      if (!mountedRef.current) return;

      if (loadError instanceof UnauthorizedError) {
        clearAuthToken();
        window.dispatchEvent(new Event(AUTH_EVENT_NAME));
        setError("Sesi berakhir. Silakan login kembali.");
      } else if ((loadError as Error).name !== "AbortError") {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Gagal memuat data dashboard",
        );
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    mountedRef.current = true;

    const initial = async () => {
      try {
        const [productsResponse, ordersResponse] = await Promise.all([
          productService.getMy(),
          orderService.getMyOrdersAsSupplier(100),
        ]);

        if (!mountedRef.current) return;

        const productList = Array.isArray(productsResponse.data)
          ? productsResponse.data
          : [];
        const orderList = Array.isArray(ordersResponse.data)
          ? ordersResponse.data
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
            minOrder: Number(product.min_order ?? 0),
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
        setError("");
      } catch (loadError) {
        if (!mountedRef.current) return;

        if (loadError instanceof UnauthorizedError) {
          clearAuthToken();
          window.dispatchEvent(new Event(AUTH_EVENT_NAME));
          setError("Sesi berakhir. Silakan login kembali.");
        } else if ((loadError as Error).name !== "AbortError") {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Gagal memuat data dashboard",
          );
        }
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    };

    void initial();

    const handler = () => void loadDashboardData();
    window.addEventListener(AUTH_EVENT_NAME, handler);

    return () => {
      mountedRef.current = false;
      window.removeEventListener(AUTH_EVENT_NAME, handler);
    };
  }, []);

  return {
    stats,
    orders,
    products,
    activities,
    loading,
    error,
    reload: () => void loadDashboardData(),
  };
}