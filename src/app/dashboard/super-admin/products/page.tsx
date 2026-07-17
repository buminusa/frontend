"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Sidebar } from "@/components/dashboard-section/sidebar";
import { Topbar } from "@/components/dashboard-section/top-bar";
import { DataTable } from "@/components/dashboard-section/DataTable";
import { productService } from "@/lib/api/services/products";
import { categoryService } from "@/lib/api/services/categories";
import { UnauthorizedError } from "@/lib/api/api";
import type { Product, Category } from "@/lib/types/api";
import { formatIdNumber } from "@/lib/format";
import {
  Search,
  Trash2,
  Loader2,
  RefreshCw,
  Plus,
  X,
} from "lucide-react";

export default function SuperAdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [createForm, setCreateForm] = useState({ nama: "", categoryId: "", min_order: "", price_min: "", price_max: "", unit: "", description: "", hs_code: "" });
  const [images, setImages] = useState<File[]>([]);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await productService.getAll();
      setProducts(res.data || []);
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        window.location.href = "/login";
        return;
      }
      setError(err instanceof Error ? err.message : "Gagal memuat produk");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
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
    loadCategories();
  }, [loadCategories]);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const formData = new FormData();
      formData.append("nama", createForm.nama);
      formData.append("min_order", createForm.min_order);
      formData.append("price_min", createForm.price_min);
      formData.append("price_max", createForm.price_max);
      formData.append("unit", createForm.unit);
      if (createForm.categoryId) formData.append("categoryId", createForm.categoryId);
      if (createForm.description) formData.append("description", createForm.description);
      if (createForm.hs_code) formData.append("hs_code", createForm.hs_code);
      images.forEach((image) => formData.append("images", image));
      const res = await productService.create(formData);
      setProducts((prev) => [res.data, ...prev]);
      setShowCreateModal(false);
      setCreateForm({ nama: "", categoryId: "", min_order: "", price_min: "", price_max: "", unit: "", description: "", hs_code: "" });
      setImages([]);
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        window.location.href = "/login";
        return;
      }
      alert(err instanceof Error ? err.message : "Gagal menambahkan produk");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;
    setActionLoadingId(id);
    try {
      await productService.delete(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        window.location.href = "/login";
        return;
      }
      alert(err instanceof Error ? err.message : "Gagal menghapus produk");
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

  const columns = [
    {
      key: "nama",
      label: "Produk",
      render: (item: Product) => (
        <div>
          <div className="font-medium text-gray-900">{item.nama}</div>
          <div className="text-xs text-gray-500 mt-0.5">
            {item.category?.name_categories || "Tanpa kategori"}
          </div>
        </div>
      ),
    },
    {
      key: "supplier",
      label: "Supplier",
      render: (item: Product) => (
        <span className="text-gray-700">
          {item.supplier?.company_name || "-"}
        </span>
      ),
    },
    {
      key: "price",
      label: "Harga",
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
      label: "Views",
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
            onClick={() => handleDelete(item.id)}
            disabled={actionLoadingId === item.id}
            className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
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
      <Sidebar basePath="/dashboard/super-admin" roleLabel="Super Admin" />
      <div className="ml-[264px]">
        <Topbar />
        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Produk</h1>
              <p className="text-sm text-gray-500 mt-1">Kelola semua produk yang terdaftar</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={loadProducts}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <RefreshCw size={14} />
                Refresh
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Plus size={14} />
                Tambah Produk
              </button>
            </div>
          </div>

          <div className="mb-4">
            <div className="relative max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama produk, supplier, atau kategori..."
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
            onRetry={loadProducts}
            emptyMessage="Belum ada produk"
            keyExtractor={(item) => item.id}
          />
        </main>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Tambah Produk</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <X size={16} className="text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleCreateProduct} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Produk</label>
                  <input type="text" required value={createForm.nama} onChange={(e) => setCreateForm((prev) => ({ ...prev, nama: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                  <select value={createForm.categoryId} onChange={(e) => setCreateForm((prev) => ({ ...prev, categoryId: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10">
                    <option value="">Pilih kategori</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name_categories}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Order</label>
                  <input type="number" required min="1" value={createForm.min_order} onChange={(e) => setCreateForm((prev) => ({ ...prev, min_order: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Satuan</label>
                  <input type="text" required value={createForm.unit} onChange={(e) => setCreateForm((prev) => ({ ...prev, unit: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Harga Min</label>
                  <input type="number" required min="0" value={createForm.price_min} onChange={(e) => setCreateForm((prev) => ({ ...prev, price_min: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Harga Max</label>
                  <input type="number" required min="0" value={createForm.price_max} onChange={(e) => setCreateForm((prev) => ({ ...prev, price_max: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                <textarea value={createForm.description} onChange={(e) => setCreateForm((prev) => ({ ...prev, description: e.target.value }))} rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">HS Code</label>
                <input type="text" value={createForm.hs_code} onChange={(e) => setCreateForm((prev) => ({ ...prev, hs_code: e.target.value }))} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gambar (opsional)</label>
                <input type="file" accept="image/png,image/jpeg" multiple onChange={(e) => setImages(Array.from(e.target.files ?? []).slice(0, 5))} className="block w-full text-sm text-gray-500" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">Batal</button>
                <button type="submit" disabled={formLoading} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50">
                  {formLoading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
