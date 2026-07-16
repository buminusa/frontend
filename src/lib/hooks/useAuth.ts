"use client";

import { useState, useEffect, useCallback } from "react";
import { getAuthToken, clearAuthToken, getUserRoleFromToken, AUTH_EVENT_NAME } from "@/lib/auth";

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

export function useAuth() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(() => {
    const token = getAuthToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    const role = getUserRoleFromToken(token);
    const email = decodeEmailFromToken(token);
    const initials = getInitials(email);

    setUser({ email, role, initials });
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUser();
    window.addEventListener(AUTH_EVENT_NAME, loadUser);
    return () => window.removeEventListener(AUTH_EVENT_NAME, loadUser);
  }, [loadUser]);

  const logout = useCallback(() => {
    clearAuthToken();
    window.location.href = "/login";
  }, []);

  return { user, loading, logout };
}
