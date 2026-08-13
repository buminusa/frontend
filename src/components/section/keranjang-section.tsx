"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PackageSearch, Store, ListFilter, Tag, ArrowLeft} from "lucide-react";
import CategoryChip from "../category-chip";
import Pagination from "../pagination";
import OrderStatusBadge from "../order-status-badge";
import { AUTH_EVENT_NAME, getAuthToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080").replace(/\/$/, "");
// TODO: confirm this matches the route mounted for getMyOrdersBuyer in your routes file.
const ORDERS_ENDPOINT = `${API_BASE_URL}/api/v1/orders/buyer/my-orders`;
const ORDERS_PER_PAGE = 10;

type ApiOrder = {
  id: number;
  order_number: string;
  status: string;
  total_amount: string | number;
  shipping_address: string;
  notes: string | null;
  createdAt: string;
  supplier: {
    id: number;
    company_name: string;
    slug: string | null;
    logo_url: string | null;
  } | null;
  orderItems: {
    id?: number;
    quantity: number;
    product: {
      id: number;
      nama: string;
      slug: string | null;
      unit: string;
      images: { image_url: string }[];
    };
  }[];
};

export default function KeranjangSection() {
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();

    async function loadOrders() {
      const token = getAuthToken();

      if (!token) {
        setOrders([]);
        setTotalPages(1);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      const params = new URLSearchParams({
        page: String(currentPage),
        limit: String(ORDERS_PER_PAGE),
      });

      if (selectedStatus) {
        params.set("status", selectedStatus);
      }

      try {
        const response = await fetch(`${ORDERS_ENDPOINT}?${params}`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Gagal memuat pesanan.");
        }

        const apiOrders = result.data as ApiOrder[];

        setOrders(apiOrders);
        setTotalPages(result.meta?.totalPages ?? 1);
        setStatuses((current) => {
          const next = new Set(current);
          apiOrders.forEach((order) => next.add(order.status));
          return Array.from(next);
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError(err instanceof Error ? err.message : "Gagal memuat pesanan.");
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
  }, [currentPage, selectedStatus]);

  function formatCurrency(value: string | number) {
    const amount = typeof value === "string" ? Number(value) : value;
    return `Rp ${amount.toLocaleString("id-ID")}`;
  }

  function formatDate(value: string) {
    return new Date(value).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <section className="py-14">
      <div className="mx-auto max-w-5xl px-4">
        <button
        onClick={() => router.back()}
        className="flex items-center gap-2 rounded-lg border px-4 py-2 mb-4 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </button>
        <h2 className="mb-8 text-3xl font-bold">Keranjang</h2>

        {statuses.length > 0 && (
  <div className="mb-10 flex gap-3 overflow-x-auto pb-2">
    <CategoryChip
      name="Semua"
      icon={ListFilter}
      active={selectedStatus === null}
      onClick={() => {
        setSelectedStatus(null);
        setCurrentPage(1);
      }}
    />
    {statuses.map((status) => (
      <CategoryChip
        key={status}
        name={status}
        icon={Tag}
        active={selectedStatus === status}
        onClick={() => {
          setSelectedStatus(status);
          setCurrentPage(1);
        }}
      />
    ))}
  </div>
)}

        {isLoading && (
          <p className="text-sm text-gray-500">Memuat pesanan...</p>
        )}

        {!isLoading && error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {!isLoading && !error && orders.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 py-20 text-center">
            <PackageSearch size={40} className="mb-4 text-gray-300" />
            <p className="font-semibold text-gray-700">Belum ada pesanan</p>
            <p className="mt-1 text-sm text-gray-500">
              Pesanan yang kamu kirim ke supplier akan muncul di sini.
            </p>
            <Link
              href="/komoditas"
              className="mt-6 rounded-full bg-green-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Jelajahi Komoditas
            </Link>
          </div>
        )}

        {!isLoading && !error && orders.length > 0 && (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="overflow-hidden rounded-2xl border border-gray-200"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-gray-50 px-5 py-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      #{order.order_number}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>

                {order.supplier && (
                  <div className="flex items-center gap-2 px-5 pt-4 text-sm text-gray-600">
                    <Store size={16} className="text-gray-400" />
                    {order.supplier.company_name}
                  </div>
                )}

                <div className="divide-y divide-gray-100 px-5">
                  {order.orderItems.map((item, idx) => (
                    <div
                      key={item.id ?? idx}
                      className="flex items-center gap-4 py-4"
                    >
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-200">
                        <Image
                          src={item.product.images[0]?.image_url ?? "/hasil_bumi.png"}
                          alt={item.product.nama}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-800">
                          {item.product.nama}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.quantity} {item.product.unit}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4">
                  <span className="text-sm text-gray-500">Total</span>
                  <span className="text-lg font-bold text-green-600">
                    {Number(order.total_amount) > 0
                      ? formatCurrency(order.total_amount)
                      : "Menunggu konfirmasi harga"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && !error && totalPages > 1 && (
          <div className="mt-10">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </section>
  );
}