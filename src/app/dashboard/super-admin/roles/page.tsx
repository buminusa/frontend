"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-section/DashboardLayout";
import { DataTable } from "@/components/dashboard-section/DataTable";
import { userService } from "@/lib/api/services/users";
import { UnauthorizedError } from "@/lib/api/api";
import { getErrorMessage } from "@/lib/api/errors";
import { Search, RefreshCw, Loader2 } from "lucide-react";
import type { User, Role } from "@/lib/types/api";

export default function SuperAdminRolesPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [assigningId, setAssigningId] = useState<number | null>(null);
  const [roles] = useState<Role[]>([
    { id: 1, name_role: "Super_Admin" },
    { id: 2, name_role: "Admin" },
    { id: 3, name_role: "Supplier" },
    { id: 4, name_role: "Buyer" },
  ]);

  const loadUsers = useCallback(async () => {
    try {
      const res = await userService.getAll();
      setUsers(res.data || []);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        router.push("/login?session=expired");
        return;
      }
      setError(getErrorMessage(err, "Gagal memuat daftar pengguna"));
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const init = async () => {
      await loadUsers();
    };
    void init();
  }, [loadUsers]);

  const handleAssignRole = async (userId: number, roleId: number) => {
    setAssigningId(userId);
    try {
      await userService.assignRole(userId, roleId);
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, roleId, role: roles.find((role) => role.id === roleId) ?? u.role ?? null } : u)));
    } catch (err: unknown) {
      if (err instanceof UnauthorizedError) {
        router.push("/login?session=expired");
        return;
      }
      setError(getErrorMessage(err, "Gagal mengubah role"));
    } finally {
      setAssigningId(null);
    }
  };

  const filteredUsers = users.filter((u) =>
    [u.email, u.role?.name_role]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      key: "email",
      label: "Email",
      render: (item: User) => <span className="font-medium text-gray-900">{item.email}</span>,
    },
    {
      key: "role",
      label: "Role",
      render: (item: User) => <span className="text-gray-700">{item.role?.name_role || "-"}</span>,
    },
    {
      key: "role",
      label: "Ubah Role",
      render: (item: User) => (
        <div className="flex items-center gap-2">
          <select
            value={item.roleId ?? ""}
            onChange={(e) => handleAssignRole(item.id, Number(e.target.value))}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none"
            disabled={assigningId === item.id}
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>{role.name_role}</option>
            ))}
          </select>
          {assigningId === item.id && <Loader2 size={14} className="animate-spin text-blue-500" />}
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Terdaftar",
      render: (item: User) => <span className="text-gray-500">{item.createdAt ? new Date(item.createdAt).toLocaleDateString("id-ID") : "-"}</span>,
    },
  ];

  return (
    <DashboardLayout basePath="/dashboard/super-admin" roleLabel="Super Admin">
      <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manajemen Role</h1>
              <p className="text-sm text-gray-500 mt-1">Lihat dan kelola pengguna berdasarkan role</p>
            </div>
            <button
              onClick={() => {
                setLoading(true);
                loadUsers();
              }}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
          </div>

          <div className="mb-4">
            <div className="relative max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari pengguna..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredUsers}
            loading={loading}
            error={error}
            onRetry={() => {
              setLoading(true);
              loadUsers();
            }}
            emptyMessage="Belum ada pengguna"
            keyExtractor={(item) => item.id}
          />
        </main>
      </DashboardLayout>
  );
}
