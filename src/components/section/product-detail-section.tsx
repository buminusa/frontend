"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAuthToken, getUserRoleFromToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { orderService } from "@/lib/api/services/orders";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080"
).replace(/\/$/, "");

type ApiProduct = {
  id: number;
  nama: string;
  slug: string;
  description: string | null;
  price_min: string | number;
  price_max: string | number;
  min_order: number;
  unit: string | null;
  hs_code: string | null;

  category: {
    id: number;
    name_categories: string;
  } | null;

  supplier: {
    id: number;
    company_name: string;
    slug: string;
    logo_url: string | null;
  } | null;

  images: {
    id: number;
    image_url: string;
  }[];
};

type ProductDetail = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;

  priceMin: number;
  priceMax: number;

  minOrder: number;
  unit: string;

  hsCode: string;

  image: string;

  supplier: {
    id: number;
    companyName: string;
    slug: string;
    logo: string;
  } | null;
};

export default function ProductDetailSection() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [isBuying, setIsBuying] = useState(false);
  const [purchaseMessage, setPurchaseMessage] = useState("");
  const [purchaseError, setPurchaseError] = useState("");
  const [isBuyer, setIsBuyer] = useState<boolean | null>(null);

  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();

    const token = getAuthToken();
    setIsBuyer(getUserRoleFromToken(token ?? "") === "Buyer");

    async function loadProduct() {
      const token = getAuthToken();

      if (!token) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/products/slug/${slug}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          },
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Gagal memuat produk.");
        }

        const apiProduct: ApiProduct = result.data;

        setProduct({
          id: String(apiProduct.id),
          name: apiProduct.nama,
          slug: apiProduct.slug,
          description: apiProduct.description ?? "",
          category: apiProduct.category?.name_categories ?? "Tanpa kategori",

          priceMin: Number(apiProduct.price_min),
          priceMax: Number(apiProduct.price_max),

          minOrder: apiProduct.min_order,
          unit: apiProduct.unit ?? "unit",

          hsCode: apiProduct.hs_code ?? "-",

          image: apiProduct.images[0]?.image_url ?? "",

          supplier: apiProduct.supplier
            ? {
                id: apiProduct.supplier.id,
                companyName: apiProduct.supplier.company_name,
                slug: apiProduct.supplier.slug,
                logo: apiProduct.supplier.logo_url ?? "",
              }
            : null,
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setError(
            error instanceof Error ? error.message : "Gagal memuat produk.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadProduct();

    return () => controller.abort();
  }, [slug]);

  const handleBuy = async () => {
    const token = getAuthToken();

    if (!token) {
      router.push("/login");
      return;
    }

    if (isBuyer === false) {
      setPurchaseError("Hanya buyer yang dapat melakukan pembelian.");
      return;
    }

    if (!product) {
      return;
    }

    if (!shippingAddress.trim()) {
      setPurchaseError("Alamat pengiriman wajib diisi.");
      return;
    }

    if (quantity < product.minOrder) {
      setPurchaseError(
        `Minimal pembelian adalah ${product.minOrder} ${product.unit}`,
      );
      return;
    }

    setIsBuying(true);
    setPurchaseError("");
    setPurchaseMessage("");

    try {
      const response = await orderService.create({
        items: [{ productId: Number(product.id), quantity }],
        shipping_address: shippingAddress.trim(),
        notes: notes.trim() || undefined,
      });

      setPurchaseMessage(
        `Pesanan berhasil dibuat dengan nomor ${response.data?.order_number ?? "-"}. Order ini akan muncul di dashboard admin untuk diverifikasi.`,
      );
      setQuantity(product.minOrder);
      setShippingAddress("");
      setNotes("");
    } catch (buyError) {
      setPurchaseError(
        buyError instanceof Error ? buyError.message : "Gagal membuat pesanan.",
      );
    } finally {
      setIsBuying(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm text-gray-500">Memuat produk...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm text-gray-500">Produk tidak ditemukan.</p>
        </div>
      </section>
    );
  }

  const canOrder = isBuyer === true;

  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </button>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Product Image */}
          <div>
            <img
              src={product.image || "/placeholder.png"}
              alt={product.name}
              className="aspect-square w-full rounded-2xl border object-cover"
            />
          </div>

          {/* Product Detail */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500">{product.category}</p>

              <h1 className="mt-2 text-4xl font-bold">{product.name}</h1>
            </div>

            <div>
              <p className="text-3xl font-bold text-green-600">
                Rp {product.priceMin.toLocaleString("id-ID")}
              </p>

              {product.priceMax > product.priceMin && (
                <p className="mt-1 text-gray-500">
                  hingga Rp {product.priceMax.toLocaleString("id-ID")}
                </p>
              )}
            </div>

            <div className="rounded-xl border bg-white p-5">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Minimum Order</p>
                  <p className="font-medium">
                    {product.minOrder} {product.unit}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Kode Produk</p>
                  <p className="font-medium">{product.hsCode}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Beli Produk
              </h2>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Jumlah
                  <input
                    type="number"
                    min={product.minOrder}
                    value={quantity}
                    onChange={(event) =>
                      setQuantity(Number(event.target.value))
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </label>

                <label className="block text-sm font-medium text-gray-700">
                  Alamat pengiriman
                  <textarea
                    rows={3}
                    required
                    value={shippingAddress}
                    onChange={(event) => setShippingAddress(event.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    placeholder="Masukkan alamat lengkap pengiriman"
                  />
                </label>

                <label className="block text-sm font-medium text-gray-700">
                  Catatan
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    placeholder="Opsional"
                  />
                </label>

                {purchaseMessage ? (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                    {purchaseMessage}
                  </div>
                ) : null}

                {purchaseError ? (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                    {purchaseError}
                  </div>
                ) : null}

                <button
                  onClick={handleBuy}
                  disabled={isBuying || !canOrder}
                  aria-disabled={!canOrder}
                  className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {isBuying ? "Memproses pesanan..." : "Order"}
                </button>

                {!canOrder ? (
                  <p className="text-xs text-gray-500">
                    Hanya akun Buyer yang dapat melakukan order.{" "}
                    <button
                      onClick={() => router.push("/login")}
                      className="font-medium text-green-600 underline"
                    >
                      Login sebagai Buyer
                    </button>
                  </p>
                ) : null}

                <p className="text-xs text-gray-500">
                  Setelah pesanan dibuat, data akan muncul di dashboard admin
                  untuk diverifikasi.
                </p>
              </div>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-semibold">Deskripsi Produk</h2>

              <p className="leading-7 text-gray-600">
                {product.description || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
