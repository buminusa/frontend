"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  AUTH_EVENT_NAME,
  clearAuthToken,
  getAuthToken,
  getAuthTokenExpiresAt,
  getUserRoleFromToken,
  isAuthTokenValid,
  isUserVerifiedFromToken,
} from "@/lib/auth";

type Role = "Buyer" | "Supplier" | "Admin" | "Super_Admin";

const AUTH_PAGES = new Set(["/login", "/register", "/forgot-password", "/reset-password"]);

const protectedRoutes: Array<{ prefix: string; roles: Role[] }> = [
  { prefix: "/home", roles: ["Buyer"] },
  { prefix: "/profile", roles: ["Buyer"] },
  { prefix: "/keranjang", roles: ["Buyer"] },
  { prefix: "/supplier", roles: ["Supplier"] },
  { prefix: "/dashboard/supplier", roles: ["Supplier"] },
  { prefix: "/dashboard/admin", roles: ["Admin"] },
  { prefix: "/dashboard/super-admin", roles: ["Super_Admin"] },
];

function isMatch(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

function destinationForRole(role: string | null) {
  switch (role) {
    case "Buyer":
      return "/home";
    case "Supplier":
      return "/dashboard/supplier";
    case "Admin":
      return "/dashboard/admin";
    case "Super_Admin":
      return "/dashboard/super-admin";
    default:
      return "/login";
  }
}

/**
 * Penjaga rute global untuk token yang disimpan di localStorage. Middleware
 * server tidak dapat membaca localStorage, maka pengecekan dilakukan sebelum
 * pengguna dapat menetap di halaman privat setelah aplikasi terhidrasi.
 */
export function AuthRouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let expiryTimeout: number | undefined;

    const enforceRoute = () => {
      const token = getAuthToken();
      const protectedRoute = protectedRoutes.find(({ prefix }) => isMatch(pathname, prefix));

      if (!isAuthTokenValid(token)) {
        if (token) clearAuthToken();
        if (protectedRoute) router.replace("/login");
        return;
      }

      if (token && !isUserVerifiedFromToken(token)) {
        clearAuthToken();
        if (protectedRoute) router.replace("/login");
        return;
      }

      const role = getUserRoleFromToken(token!);
      const destination = destinationForRole(role);

      if (AUTH_PAGES.has(pathname)) {
        router.replace(destination);
        return;
      }

      if (protectedRoute && !protectedRoute.roles.includes(role as Role)) {
        router.replace(destination);
      }
    };

    const scheduleExpirationCheck = () => {
      if (expiryTimeout) window.clearTimeout(expiryTimeout);

      const expiresAt = getAuthTokenExpiresAt();
      if (!expiresAt) return;

      expiryTimeout = window.setTimeout(() => {
        enforceRoute();
        scheduleExpirationCheck();
      }, Math.max(0, expiresAt - Date.now()) + 50);
    };

    const handleAuthChange = () => {
      enforceRoute();
      scheduleExpirationCheck();
    };

    enforceRoute();
    scheduleExpirationCheck();
    window.addEventListener(AUTH_EVENT_NAME, handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      if (expiryTimeout) window.clearTimeout(expiryTimeout);
      window.removeEventListener(AUTH_EVENT_NAME, handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, [pathname, router]);

  return children;
}
