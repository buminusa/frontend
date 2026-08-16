"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DashboardLayout } from "@/components/dashboard-section/DashboardLayout";
import { DataTable } from "@/components/dashboard-section/DataTable";
import { categoryService } from "@/lib/api/services/categories";
import { UnauthorizedError } from "@/lib/api/api";
import { getErrorMessage } from "@/lib/api/errors";
import { useLanguage } from "@/lib/langue/provider";
import type { Category } from "@/lib/types/api";
import {
  Search,
  Pencil,
  Trash2,
  Plus,
  RefreshCw,
  Loader2,
  X,
  ImageIcon,
} from "lucide-react";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
const IMAGE_TYPES = ["image/jpeg", "image/png"];

export default function CategoriesPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formName, setFormName] = useState("");
  const [formImage, setFormImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const loadCategories = useCallback(async () => {
    try {
      const res = await categoryService.getAll();
      setCategories(res.data || []);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        router.push("/login?session=expired");
        return;
      }
      setError(getErrorMessage(err, t("dashboard.categories.loadFailed")));
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const init = async () => {
      await loadCategories();
    };
    void init();
  }, [loadCategories]);

  const validateImage = (file: File | null, isCreate: boolean): string | null => {
    if (isCreate && !file) return t("dashboard.categories.imageRequired");
    if (file && !IMAGE_TYPES.includes(file.type)) return t("dashboard.categories.imageFormat");
    if (file && file.size > MAX_IMAGE_SIZE) return t("dashboard.categories.imageSize");
    return null;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else if (!editingCategory) {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const imageError = validateImage(formImage, !editingCategory);
    if (imageError) {
      setError(imageError);
      return;
    }

    setFormLoading(true);
    try {
      const formData = new FormData();
      formData.append("name_categories", formName);
      if (formImage) formData.append("image", formImage);

      if (editingCategory) {
        const res = await categoryService.update(editingCategory.id, formData);
        setCategories((prev) =>
          prev.map((c) => (c.id === editingCategory.id ? { ...c, ...res.data } : c))
        );
      } else {
        const res = await categoryService.create(formData);
        setCategories((prev) => [...prev, res.data]);
      }
      setShowModal(false);
      setEditingCategory(null);
      setFormName("");
      setFormImage(null);
      setImagePreview(null);
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        router.push("/login?session=expired");
        return;
      }
      setError(getErrorMessage(err, t("dashboard.categories.saveFailed")));
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(t("dashboard.categories.deleteConfirm"))) return;
    try {
      await categoryService.delete(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        router.push("/login?session=expired");
        return;
      }
      setError(getErrorMessage(err, t("dashboard.categories.deleteFailed")));
    }
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormName(category.name_categories);
    setFormImage(null);
    setImagePreview(category.image_url || null);
    setShowModal(true);
  };

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormName("");
    setFormImage(null);
    setImagePreview(null);
    setShowModal(true);
  };

  const filteredCategories = categories.filter((c) =>
    c.name_categories.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: "image",
      label: t("dashboard.categories.image"),
      className: "w-16",
      render: (item: Category) => (
        <div className="flex items-center justify-center">
          {item.image_url ? (
            <Image
              src={item.image_url}
              alt={item.name_categories}
              width={40}
              height={40}
              className="rounded-lg object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <ImageIcon size={16} className="text-gray-400" />
            </div>
          )}
        </div>
      ),
    },
    {
      key: "name_categories",
      label: t("dashboard.categories.name"),
      render: (item: Category) => (
        <span className="font-medium text-gray-900">{item.name_categories}</span>
      ),
    },
    {
      key: "slug",
      label: t("dashboard.categories.slug"),
      render: (item: Category) => (
        <span className="text-gray-500 font-mono text-xs">{item.slug || "-"}</span>
      ),
    },
    {
      key: "createdAt",
      label: t("dashboard.common.created"),
      render: (item: Category) => (
        <span className="text-gray-500">
          {item.createdAt ? new Date(item.createdAt).toLocaleDateString("id-ID") : "-"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "",
      className: "w-24",
      render: (item: Category) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => openEditModal(item)}
            className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
            title={t("dashboard.common.edit")}
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
            title={t("dashboard.common.delete")}
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout basePath="/dashboard/admin" roleLabel="Admin" mainClassName="p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t("dashboard.categories.title")}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {t("dashboard.categories.description")}
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              setLoading(true);
              loadCategories();
            }}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={14} />
            <span className="hidden sm:inline">{t("dashboard.common.refresh")}</span>
          </button>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Plus size={14} />
            <span className="hidden sm:inline">{t("dashboard.categories.add")}</span>
            <span className="sm:hidden">{t("dashboard.common.add")}</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative w-full max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t("dashboard.categories.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredCategories}
        loading={loading}
        error={error}
        onRetry={() => {
          setLoading(true);
          loadCategories();
        }}
        emptyMessage={t("dashboard.categories.empty")}
        keyExtractor={(item) => item.id}
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingCategory ? t("dashboard.categories.edit") : t("dashboard.categories.add")}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={16} className="text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 lg:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("dashboard.categories.name")}
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder={t("dashboard.categories.namePlaceholder")}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("dashboard.categories.image")} {!editingCategory && <span className="text-red-500">*</span>}
                </label>
                {imagePreview && (
                  <div className="mb-3 relative w-32 h-32 rounded-xl overflow-hidden border border-gray-200">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-400 mt-1">{t("dashboard.categories.imageHint")}</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  {t("dashboard.common.cancel")}
                </button>
                <button
                  type="submit"
                  disabled={formLoading || !formName.trim() || (!editingCategory && !formImage)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {formLoading && <Loader2 size={14} className="animate-spin" />}
                  {editingCategory ? t("dashboard.common.save") : t("dashboard.common.add")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
