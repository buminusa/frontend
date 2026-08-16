"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { getAuthToken, getUserRoleFromToken } from "@/lib/auth";
import { ArrowLeft } from "lucide-react";
import { orderService } from "@/lib/api/services/orders";
import { useLanguage } from "@/lib/langue/provider";
import { getLocalizedCategoryName } from "@/lib/categories";

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
    name_categories_en?: string | null;
    slug?: string | null;
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

  const { lang, t } = useLanguage();

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [isBuying, setIsBuying] = useState(false);
  const [purchaseMessage, setPurchaseMessage] = useState("");
  const [purchaseError, setPurchaseError] = useState("");
  const [isBuyer] = useState<boolean | null>(
    () => getUserRoleFromToken(getAuthToken() ?? "") === "Buyer"
  );

  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();

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
          throw new Error(result.message || t("komoditas.detail.errorLoad"));
        }

        const apiProduct: ApiProduct = result.data;

        setProduct({
          id: String(apiProduct.id),
          name: apiProduct.nama,
          slug: apiProduct.slug,
          description: apiProduct.description ?? "",
          category: apiProduct.category ? getLocalizedCategoryName(apiProduct.category, lang) : t("komoditas.detail.noCategory"),

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
            error instanceof Error ? error.message : t("komoditas.detail.errorLoad"),
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
  }, [slug, t]);

  const handleBuy = async () => {
    const token = getAuthToken();

    if (!token) {
      router.push("/login");
      return;
    }

    if (isBuyer === false) {
      setPurchaseError(t("komoditas.detail.buyerOnlyError"));
      return;
    }

    if (!product) {
      return;
    }

    if (!shippingAddress.trim()) {
      setPurchaseError(t("komoditas.detail.shippingRequired"));
      return;
    }

    if (quantity < product.minOrder) {
      setPurchaseError(
        t("komoditas.detail.minOrderError", {
          minOrder: product.minOrder,
          unit: product.unit,
        }),
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
        t("komoditas.detail.orderSuccess", {
          orderNumber: response.data?.order_number ?? "-",
        }),
      );
      setQuantity(product.minOrder);
      setShippingAddress("");
      setNotes("");
    } catch (buyError) {
      setPurchaseError(
        buyError instanceof Error ? buyError.message : t("komoditas.detail.orderError"),
      );
    } finally {
      setIsBuying(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm text-gray-500">{t("komoditas.detail.loading")}</p>
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
          <p className="text-sm text-gray-500">{t("komoditas.detail.notFound")}</p>
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
          {t("komoditas.detail.back")}
        </button>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Product Image */}
          <div>
            <Image
              src={product.image || "/placeholder.png"}
              alt={product.name}
              width={720}
              height={720}
              unoptimized={product.image.startsWith("http")}
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
                  {t("komoditas.detail.priceUpTo", {
                    price: product.priceMax.toLocaleString("id-ID"),
                  })}
                </p>
              )}
            </div>

            <div className="rounded-xl border bg-white p-5">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">{t("komoditas.detail.minOrder")}</p>
                  <p className="font-medium">
                    {product.minOrder} {product.unit}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">{t("komoditas.detail.productCode")}</p>
                  <p className="font-medium">{product.hsCode}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                {t("komoditas.detail.buyProduct")}
              </h2>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  {t("komoditas.detail.quantity")}
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
                  {t("komoditas.detail.shippingAddress")}
                  <textarea
                    rows={3}
                    required
                    value={shippingAddress}
                    onChange={(event) => setShippingAddress(event.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    placeholder={t("komoditas.detail.shippingAddressPlaceholder")}
                  />
                </label>

                <label className="block text-sm font-medium text-gray-700">
                  {t("komoditas.detail.notes")}
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    placeholder={t("komoditas.detail.notesPlaceholder")}
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
                  {isBuying ? t("komoditas.detail.processingOrder") : t("komoditas.detail.orderButton")}
                </button>

                {!canOrder ? (
                  <p className="text-xs text-gray-500">
                    {t("komoditas.detail.buyerOnlyNotice")}{" "}
                    <button
                      onClick={() => router.push("/login")}
                      className="font-medium text-green-600 underline"
                    >
                      {t("komoditas.detail.loginAsBuyer")}
                    </button>
                  </p>
                ) : null}

                <p className="text-xs text-gray-500">
                  {t("komoditas.detail.orderHint")}
                </p>
              </div>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-semibold">{t("komoditas.detail.descriptionTitle")}</h2>

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
