"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useLanguage } from "@/lib/langue/provider";

function isSuperAdminRole(role: string | null | undefined) {
  if (!role) return false;
  const normalized = role.trim().toLowerCase();
  return (
    normalized === "super_admin" ||
    normalized === "super admin" ||
    normalized === "super-admin" ||
    normalized === "superadmin"
  );
}

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const authorized = !loading && !!user?.role && isSuperAdminRole(user.role);

  useEffect(() => {
    if (loading) return;

    if (!user?.role) {
      router.replace("/login");
      return;
    }

    if (!isSuperAdminRole(user.role)) {
      router.replace("/dashboard/admin");
    }
  }, [loading, router, user?.role]);

  if (loading || !authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white px-8 py-6 shadow-sm">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          <p className="text-sm font-medium text-gray-600">{t("dashboard.common.checkingAccess")}</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
