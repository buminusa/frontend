"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Sidebar } from "@/components/dashboard-section/sidebar";
import { Topbar } from "@/components/dashboard-section/top-bar";
import { DataTable } from "@/components/dashboard-section/DataTable";
import { categoryService } from "@/lib/api/services/categories";
import { UnauthorizedError } from "@/lib/api/api";
import type { Category } from "@/lib/types/api";
import {
  Search,
  Pencil,
  Trash2,
  Plus,
  RefreshCw,
  Loader2,
  X,
} from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formName, setFormName] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await categoryService.getAll();
      setCategories(res.data || []);
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        window.location.href = "/login";
        return;
      }
      setError(err instanceof Error ? err.message : "Gagal memuat kategori");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;
    setFormLoading(true);
    try {
      if (editingCategory) {
        const res = await categoryService.update(editingCategory.id, { name_categories: formName });
        setCategories((prev) =>
          prev.map((c) => (c.id === editingCategory.id ? { ...c, name_categories: res.data.name_categories } : c))
        );
      } else {
        const res = await categoryService.create({ name_categories: formName });
        setCategories((prev) => [...prev, res.data]);
      }
      setShowModal(false);
      setEditingCategory(null);
      setFormName("");
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        window.location.href = "/login";
        return;
      }
      alert(err instanceof Error ? err.message : "Gagal menyimpan kategori");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus kategori ini?")) return;
    try {
      await categoryService.delete(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        window.location.href = "/login";
        return;
      }
      alert(err instanceof Error ? err.message : "Gagal menghapus kategori");
    }
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormName(category.name_categories);
    setShowModal(true);
  };

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormName("");
    setShowModal(true);
  };

  const filteredCategories = categories.filter((c) =>
    c.name_categories.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: "name_categories",
      label: "Nama Kategori",
      render: (item: Category) => (
        <span className="font-medium text-gray-900">{item.name_categories}</span>
      ),
    },
    {
      key: "slug",
      label: "Slug",
      render: (item: Category) => (
        <span className="text-gray-500 font-mono text-xs">{item.slug || "-"}</span>
      ),
    },
    {
      key: "createdAt",
      label: "Dibuat",
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
            title="Edit"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
            title="Hapus"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="ml-[264px]">
        <Topbar />
        <main className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Kategori</h1>
              <p className="text-sm text-gray-500 mt-1">
                Kelola kategori produk
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadCategories}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <RefreshCw size={14} />
                Refresh
              </button>
              <button
                onClick={openCreateModal}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Plus size={14} />
                Tambah Kategori
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="mb-4">
            <div className="relative max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari kategori..."
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
            onRetry={loadCategories}
            emptyMessage="Belum ada kategori"
            keyExtractor={(item) => item.id}
          />
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingCategory ? "Edit Kategori" : "Tambah Kategori"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={16} className="text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Kategori
              </label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Masukkan nama kategori"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                autoFocus
              />
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={formLoading || !formName.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {formLoading && <Loader2 size={14} className="animate-spin" />}
                  {editingCategory ? "Simpan" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
