"use client";

import { useRouter } from "next/navigation";
import { getAuthToken, isAuthTokenValid } from "@/lib/auth";

export function useCategoryGuard() {
  const router = useRouter();
  return function navigate(href: string) {
    const token = getAuthToken();
    if (!token || !isAuthTokenValid(token)) {
      router.replace(`/login?redirect=${encodeURIComponent(href)}`);
      return;
    }
    router.push(href);
  };
}