"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-section/DashboardLayout";
import { DataTable } from "@/components/dashboard-section/DataTable";
import { productService } from "@/lib/api/services/products";
import { categoryService } from "@/lib/api/services/categories";
import { UnauthorizedError } from "@/lib/api/api";
import { getErrorMessage } from "@/lib/api/errors";
import { useLanguage } from "@/lib/langue/provider";
import type { Category, Product } from "@/lib/types/api";
import { formatIdNumber } from "@/lib/format";
import { getLocalizedCategoryName } from "@/lib/categories";
import {
  Search,
  Pencil,
  Trash2,
  RefreshCw,
  Loader2,
  X,
} from "lucide-react";

type ProductFormState = {
  nama: string;
  categoryId: string;
  min_order: string;
  price_min: string;
  price_max: string;
  unit: string;
  description: string;
  spectification: string;
  hs_code: string;
};

const emptyProductForm = (): ProductFormState => ({
  nama: "",
  categoryId: "",
  min_order: "",
  price_min: "",
  price_max: "",
  unit: "",
  description: "",
  spectification: "",
  hs_code: "",
});

const MAX_PRODUCT_IMAGES = 5;

export default function ProductsPage() {
  const router = useRouter();
  const { lang, t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [productForm, setProductForm] = useState<ProductFormState>(emptyProductForm);
  const [images, setImages] = useState<File[]>([]);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      const res = await productService.getAll();
      setProducts(res.data || []);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        router.push("/login?session=expired");
        return;
      }
      setError(getErrorMessage(err, t("dashboard.products.loadFailed")));
    } finally {
      setLoading(false);
    }
  }, [router, t]);

  useEffect(() => {
    const init = async () => {
      await loadProducts();
    };
    void init();
  }, [loadProducts]);

  const loadCategories = useCallback(async () => {
    try {
      const res = await categoryService.getAll();
      setCategories(res.data || []);
    } catch {
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await loadCategories();
    };
    void init();
  }, [loadCategories]);

  const handleOpenEdit = (product: Product) => {
    setEditingId(product.id);
    setProductForm({
      nama: product.nama,
      categoryId: product.categoryId ? String(product.categoryId) : "",
      min_order: String(product.min_order),
      price_min: String(product.price_min),
      price_max: String(product.price_max),
      unit: product.unit ?? "",
      description: product.description ?? "",
      spectification: product.spectification ?? "",
      hs_code: product.hs_code ?? "",
    });
    setImages([]);
    setFormError(null);
    setShowProductModal(true);
  };

  const closeProductModal = () => {
    setShowProductModal(false);
    setEditingId(null);
    setProductForm(emptyProductForm());
    setImages([]);
    setFormError(null);
  };

  const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingId === null) return;

    const minOrder = Number(productForm.min_order);
    const priceMin = Number(productForm.price_min);
    const priceMax = Number(productForm.price_max);

    if (!Number.isInteger(minOrder) || minOrder < 100) {
      setFormError(t("dashboard.products.minOrderError"));
      return;
    }

    if (!Number.isFinite(priceMin) || !Number.isFinite(priceMax) || priceMin > priceMax) {
      setFormError(t("dashboard.products.priceRangeError"));
      return;
    }

    const editingProduct = products.find((product) => product.id === editingId);
    const existingImageCount = editingProduct?.images?.length ?? 0;
    const remainingImageSlots = MAX_PRODUCT_IMAGES - existingImageCount;

    if (images.length > remainingImageSlots) {
      setFormError(t("dashboard.products.maxImagesError", { max: MAX_PRODUCT_IMAGES }));
      return;
    }

    setFormLoading(true);
    setFormError(null);

    try {
      const formData = new FormData();
      formData.append("nama", productForm.nama);
      formData.append("categoryId", productForm.categoryId);
      formData.append("min_order", productForm.min_order);
      formData.append("price_min", productForm.price_min);
      formData.append("price_max", productForm.price_max);
      formData.append("unit", productForm.unit);
      formData.append("description", productForm.description);
      formData.append("spectification", productForm.spectification);
      formData.append("hs_code", productForm.hs_code);
      images.forEach((image) => formData.append("images", image));

      const res = await productService.update(editingId, formData);
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingId ? { ...product, ...res.data } : product
        )
      );
      closeProductModal();
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        router.push("/login?session=expired");
        return;
      }
      setFormError(getErrorMessage(err, t("dashboard.products.updateFailed")));
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(t("dashboard.products.deleteConfirm"))) return;
    setActionLoadingId(id);
    try {
      await productService.delete(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        router.push("/login?session=expired");
        return;
      }
      setError(getErrorMessage(err, t("dashboard.products.deleteFailed")));
    } finally {
      setActionLoadingId(null);
    }
  };

  const filteredProducts = products.filter((p) =>
    [p.nama, p.supplier?.company_name, p.category?.name_categories]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  const editingProduct = editingId === null
    ? null
    : products.find((product) => product.id === editingId) ?? null;
  const remainingImageSlots = MAX_PRODUCT_IMAGES - (editingProduct?.images?.length ?? 0);

  const columns = [
    {
      key: "nama",
      label: t("dashboard.products.name"),
      render: (item: Product) => (
        <div>
          <div className="font-medium text-gray-900">{item.nama}</div>
          <div className="text-xs text-gray-500 mt-0.5">
            {item.category ? getLocalizedCategoryName(item.category, lang) : t("dashboard.products.noCategory")}
          </div>
        </div>
      ),
    },
    {
      key: "supplier",
      label: t("dashboard.products.supplier"),
      render: (item: Product) => (
        <span className="text-gray-700">
          {item.supplier?.company_name || "-"}
        </span>
      ),
    },
    {
      key: "price",
      label: t("dashboard.products.price"),
      render: (item: Product) => (
        <span className="font-medium text-gray-900">
          Rp {formatIdNumber(item.price_min)}
          {item.price_min !== item.price_max && (
            <> - {formatIdNumber(item.price_max)}</>
          )}
        </span>
      ),
    },
    {
      key: "views",
      label: t("dashboard.products.views"),
      render: (item: Product) => (
        <span className="tabular-nums">{formatIdNumber(item.views)}</span>
      ),
    },
    {
      key: "actions",
      label: "",
      className: "w-24",
      render: (item: Product) => (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleOpenEdit(item)}
            disabled={actionLoadingId === item.id}
            className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors disabled:opacity-50"
            title={t("dashboard.common.edit")}
            aria-label={t("dashboard.common.edit")}
          >
            <Pencil size={14} />
          </button>
          <button
            type="button"
            onClick={() => handleDelete(item.id)}
            disabled={actionLoadingId === item.id}
            className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
            title={t("dashboard.common.delete")}
            aria-label={t("dashboard.common.delete")}
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout basePath="/dashboard/admin" roleLabel="Admin">
      <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t("dashboard.products.title")}</h1>
              <p className="text-sm text-gray-500 mt-1">
                {t("dashboard.products.description")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setLoading(true);
                  loadProducts();
                }}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <RefreshCw size={14} />
                {t("dashboard.common.refresh")}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <div className="relative max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t("dashboard.products.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredProducts}
            loading={loading}
            error={error}
            onRetry={() => {
              setLoading(true);
              loadProducts();
            }}
            emptyMessage={t("dashboard.products.empty")}
            keyExtractor={(item) => item.id}
          />
        </main>

      {showProductModal && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                {t("dashboard.products.edit")}
              </h3>
              <button
                type="button"
                onClick={closeProductModal}
                disabled={formLoading}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                aria-label={t("dashboard.common.close")}
              >
                <X size={16} className="text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleUpdateProduct} className="p-6 space-y-4">
              {formError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {formError}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("dashboard.products.nameLabel")}
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    value={productForm.nama}
                    onChange={(e) => setProductForm((prev) => ({ ...prev, nama: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("dashboard.products.category")}
                  </label>
                  <select
                    value={productForm.categoryId}
                    onChange={(e) => setProductForm((prev) => ({ ...prev, categoryId: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="">{t("dashboard.products.selectCategory")}</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {getLocalizedCategoryName(category, lang)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("dashboard.products.minOrder")}
                  </label>
                  <input
                    type="number"
                    required
                    min="100"
                    step="1"
                    value={productForm.min_order}
                    onChange={(e) => setProductForm((prev) => ({ ...prev, min_order: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("dashboard.products.unit")}
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.unit}
                    onChange={(e) => setProductForm((prev) => ({ ...prev, unit: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("dashboard.products.priceMin")}
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="any"
                    value={productForm.price_min}
                    onChange={(e) => setProductForm((prev) => ({ ...prev, price_min: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("dashboard.products.priceMax")}
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="any"
                    value={productForm.price_max}
                    onChange={(e) => setProductForm((prev) => ({ ...prev, price_max: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("dashboard.products.descriptionLabel")}
                </label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("dashboard.products.specification")}
                </label>
                <textarea
                  value={productForm.spectification}
                  onChange={(e) => setProductForm((prev) => ({ ...prev, spectification: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("dashboard.products.images")}
                </label>
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  multiple
                  disabled={remainingImageSlots === 0 || formLoading}
                  onChange={(e) => {
                    const selectedImages = Array.from(e.target.files ?? []);
                    setImages(selectedImages.slice(0, remainingImageSlots));
                    setFormError(
                      selectedImages.length > remainingImageSlots
                        ? t("dashboard.products.maxImagesError", { max: MAX_PRODUCT_IMAGES })
                        : null
                    );
                  }}
                  className="block w-full text-sm text-gray-500 disabled:opacity-50"
                />
                <p className="mt-1 text-xs text-gray-400">
                  {t("dashboard.products.imageLimit", { max: MAX_PRODUCT_IMAGES })}
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeProductModal}
                  disabled={formLoading}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  {t("dashboard.common.cancel")}
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {formLoading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Pencil size={14} />
                  )}
                  {t("dashboard.common.save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </DashboardLayout>
  );
}
