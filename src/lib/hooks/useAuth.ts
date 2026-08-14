"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getAuthToken, clearAuthToken, getUserRoleFromToken, isAuthTokenValid, AUTH_EVENT_NAME } from "@/lib/auth";

interface UserInfo {
  email: string;
  role: string | null;
  initials: string;
}

function decodeEmailFromToken(token: string): string {
  try {
    const payload = token.split(".")[1];
    if (!payload) return "";
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
    const data = JSON.parse(atob(padded));
    return data.email || "";
  } catch {
    return "";
  }
}

function getInitials(email: string): string {
  if (!email) return "U";
  const name = email.split("@")[0];
  const parts = name.split(/[._-]/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

function readUserFromToken(): UserInfo | null {
  const token = getAuthToken();
  if (!token || !isAuthTokenValid(token)) return null;

  const email = decodeEmailFromToken(token);

  return {
    email,
    role: getUserRoleFromToken(token),
    initials: getInitials(email),
  };
}

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(() => readUserFromToken());
  const [loading] = useState(false);

  const loadUser = useCallback(() => {
    setUser(readUserFromToken());
  }, []);

  useEffect(() => {
    window.addEventListener(AUTH_EVENT_NAME, loadUser);
    return () => window.removeEventListener(AUTH_EVENT_NAME, loadUser);
  }, [loadUser]);

  const logout = useCallback(() => {
    clearAuthToken();
    router.push("/login");
  }, [router]);

  return { user, loading, logout };
}
