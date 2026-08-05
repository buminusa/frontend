"use client";

import { useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { productService } from "@/lib/api/services/products";
import { categoryService } from "@/lib/api/services/categories";
import type { ApiResponse, Category, Product } from "@/lib/types/api";

type ProductRow = {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  description: string;
  images: { id: number; image_url: string }[];
};

type ProductFormState = {
  nama: string;
  description: string;
  spectification: string;
  min_order: string;
  price_min: string;
  price_max: string;
  unit: string;
  hs_code: string;
  categoryId: string;
  images: FileList | null;
};

const emptyForm = (): ProductFormState => ({
  nama: "",
  description: "",
  spectification: "",
  min_order: "",
  price_min: "",
  price_max: "",
  unit: "",
  hs_code: "",
  categoryId: "",
  images: null,
});

const MAX_IMAGES = 5;

export default function SupplierProducts() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<ProductFormState>(emptyForm());
  const [submitting, setSubmitting] = useState(false);
  const [existingImages, setExistingImages] = useState<
    { id: number; image_url: string }[]
  >([]);

  const loadProducts = async () => {
    try {
      const response: ApiResponse<Product[]> = await productService.getMy();
      const list = Array.isArray(response.data) ? response.data : [];

      setProducts(
        list.map((product) => ({
          id: product.id,
          name: product.nama,
          category: product.category?.name_categories ?? "Tanpa kategori",
          price: Number(product.price_min ?? 0).toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          }),
          stock: Number(product.min_order ?? 0),
          description: product.description ?? "-",
          images: (product.images ?? []).map((img) => ({
            id: img.id,
            image_url: img.image_url,
          })),
        })),
      );
      setError("");
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : "Gagal memuat produk",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const initial = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          productService.getMy(),
          categoryService.getAll(),
        ]);
        if (!active) return;

        const list = Array.isArray(productsResponse.data)
          ? productsResponse.data
          : [];
        setProducts(
          list.map((product) => ({
            id: product.id,
            name: product.nama,
            category: product.category?.name_categories ?? "Tanpa kategori",
            price: Number(product.price_min ?? 0).toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }),
            stock: Number(product.min_order ?? 0),
            description: product.description ?? "-",
            images: (product.images ?? []).map((img) => ({
              id: img.id,
              image_url: img.image_url,
            })),
          })),
        );
        setCategories(categoriesResponse.data ?? []);
        setError("");
      } catch (loadError) {
        if (!active) return;
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Gagal memuat produk",
        );
      } finally {
        if (active) setLoading(false);
      }
    };

    void initial();

    return () => {
      active = false;
    };
  }, []);

  const resetForm = () => {
    setForm(emptyForm());
    setEditingId(null);
    setExistingImages([]);
    setIsModalOpen(false);
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm(emptyForm());
    setExistingImages([]);
    setMessage("");
    setError("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = async (product: ProductRow) => {
    setEditingId(product.id);
    setMessage("");
    setError("");

    try {
      const response: ApiResponse<Product> = await productService.getById(
        product.id,
      );
      const full = response.data;

      setForm({
        nama: full.nama ?? "",
        description: full.description ?? "",
        spectification: full.spectification ?? "",
        min_order: full.min_order ? String(full.min_order) : "",
        price_min: full.price_min !== undefined ? String(full.price_min) : "",
        price_max: full.price_max !== undefined ? String(full.price_max) : "",
        unit: full.unit ?? "",
        hs_code: full.hs_code ?? "",
        categoryId: full.categoryId ? String(full.categoryId) : "",
        images: null,
      });
      setExistingImages(
        (full.images ?? []).map((img) => ({
          id: img.id,
          image_url: img.image_url,
        })),
      );
      setIsModalOpen(true);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Gagal memuat detail produk",
      );
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const minOrder = Number(form.min_order);
    const priceMin = Number(form.price_min);
    const priceMax = Number(form.price_max);

    if (form.min_order !== "" && minOrder < 100) {
      setError("Minimal order harus lebih besar atau sama dengan 100.");
      return;
    }
    if (form.price_min !== "" && form.price_max !== "" && priceMin > priceMax) {
      setError("Harga minimum tidak boleh lebih besar dari harga maksimum.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("nama", form.nama);
      if (form.description) formData.append("description", form.description);
      if (form.spectification)
        formData.append("spectification", form.spectification);
      if (form.min_order) formData.append("min_order", form.min_order);
      if (form.price_min) formData.append("price_min", form.price_min);
      if (form.price_max) formData.append("price_max", form.price_max);
      if (form.unit) formData.append("unit", form.unit);
      if (form.hs_code) formData.append("hs_code", form.hs_code);
      if (form.categoryId) formData.append("categoryId", form.categoryId);

      Array.from(form.images ?? [])
        .slice(0, MAX_IMAGES)
        .forEach((file, index) => {
          formData.append(`images[${index}]`, file);
        });

      if (editingId) {
        await productService.update(editingId, formData);
      } else {
        await productService.create(formData);
      }

      setMessage(
        editingId
          ? "Produk berhasil diperbarui."
          : "Produk berhasil ditambahkan.",
      );
      resetForm();
      await loadProducts();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Gagal menyimpan produk",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Hapus produk ini?")) {
      return;
    }

    try {
      await productService.delete(id);
      setMessage("Produk berhasil dihapus.");
      await loadProducts();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Gagal menghapus produk",
      );
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    try {
      await productService.deleteImage(imageId);
      setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
      setMessage("Gambar berhasil dihapus.");
    } catch (imageError) {
      setError(
        imageError instanceof Error
          ? imageError.message
          : "Gagal menghapus gambar",
      );
    }
  };

  const priceLabel = useMemo(() => {
    if (products.length === 0) return "Belum ada produk";
    return `${products.length} produk`;
  }, [products.length]);

  return (
    <div className="space-y-4 p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Produk Saya</h1>
          <p className="text-sm text-gray-500">
            Kelola produk supplier dan kirim ke backend.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={16} /> Tambah Produk
        </button>
      </div>

      {message ? (
        <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          {message}
        </div>
      ) : null}
      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500">
          Memuat produk...
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-4 py-3 text-sm text-gray-500">
            {priceLabel}
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Nama
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Kategori
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Harga
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Min Order
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-sm text-gray-500"
                  >
                    Belum ada produk.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {product.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {product.category}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {product.price}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {product.stock}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => void handleOpenEdit(product)}
                          className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-100"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => void handleDelete(product.id)}
                          className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingId ? "Edit Produk" : "Tambah Produk"}
                </h2>
                <p className="text-sm text-gray-500">
                  Data akan dikirim ke endpoint produk supplier.
                </p>
              </div>
              <button
                onClick={resetForm}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm font-medium text-gray-700">
                  Nama produk
                  <input
                    required
                    value={form.nama}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, nama: event.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Unit
                  <input
                    value={form.unit}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, unit: event.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Minimal order (kg)
                  <input
                    type="number"
                    min={100}
                    required
                    value={form.min_order}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        min_order: event.target.value,
                      }))
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                  <span className="mt-0.5 block text-xs text-gray-400">
                    Minimal 100
                  </span>
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Kategori
                  <select
                    value={form.categoryId}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        categoryId: event.target.value,
                      }))
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 bg-white"
                  >
                    <option value="">Tanpa kategori</option>
                    {categories.map((category) => (
                      <option key={category.id} value={String(category.id)}>
                        {category.name_categories}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Harga minimum
                  <input
                    type="number"
                    min={0}
                    required
                    value={form.price_min}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        price_min: event.target.value,
                      }))
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Harga maksimum
                  <input
                    type="number"
                    min={0}
                    required
                    value={form.price_max}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        price_max: event.target.value,
                      }))
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  HS Code
                  <input
                    value={form.hs_code}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        hs_code: event.target.value,
                      }))
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </label>
                <label className="text-sm font-medium text-gray-700">
                  Gambar (maksimal {MAX_IMAGES})
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(event) => {
                      const files = event.target.files;
                      if (files && files.length > MAX_IMAGES) {
                        const dt = new DataTransfer();
                        Array.from(files)
                          .slice(0, MAX_IMAGES)
                          .forEach((file) => dt.items.add(file));
                        setForm((prev) => ({ ...prev, images: dt.files }));
                        setError(`Maksimal ${MAX_IMAGES} gambar per produk.`);
                      } else {
                        setForm((prev) => ({ ...prev, images: files }));
                        setError("");
                      }
                    }}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </label>
              </div>

              {existingImages.length > 0 && (
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    Gambar saat ini
                  </span>
                  <div className="mt-2 flex flex-wrap gap-3">
                    {existingImages.map((img) => (
                      <div key={img.id} className="relative">
                        <img
                          src={img.image_url}
                          alt="Produk"
                          className="h-20 w-20 rounded-lg border border-gray-200 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => void handleDeleteImage(img.id)}
                          className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                          aria-label="Hapus gambar"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <label className="block text-sm font-medium text-gray-700">
                Deskripsi
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      description: event.target.value,
                    }))
                  }
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </label>

              <label className="block text-sm font-medium text-gray-700">
                Spesifikasi
                <textarea
                  value={form.spectification}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      spectification: event.target.value,
                    }))
                  }
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </label>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {submitting
                    ? "Menyimpan..."
                    : editingId
                      ? "Simpan Perubahan"
                      : "Simpan Produk"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
