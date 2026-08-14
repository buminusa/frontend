"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  clearAuthToken,
  getAuthToken,
  getUserRoleFromToken,
  isAuthTokenValid,
  isUserVerifiedFromToken,
} from "@/lib/auth"

type Role =
  | "Buyer"
  | "Supplier"
  | "Admin"
  | "Super_Admin"

interface Options {
  allowedRoles: Role[]
  redirectTo?: string
}

export function useAuthGuard({
  allowedRoles,
  redirectTo = "/login",
}: Options) {
  const router = useRouter()

  useEffect(() => {
    const token = getAuthToken()

    if (!token || !isAuthTokenValid(token)) {
      if (token) clearAuthToken()
      router.replace(redirectTo)
      return
    }

    if (!isUserVerifiedFromToken(token)) {
      clearAuthToken()
      router.replace(redirectTo)
      return
    }

    const role = getUserRoleFromToken(token)

    if (!role || !allowedRoles.includes(role as Role)) {
      switch (role) {
        case "Buyer":
          router.replace("/home")
          break

        case "Supplier":
          router.replace("/dashboard/supplier")
          break

        case "Admin":
          router.replace("/dashboard/admin")
          break

        case "Super_Admin":
          router.replace("/dashboard/super-admin")
          break

        default:
          router.replace("/login")
      }
    }
  }, [allowedRoles, redirectTo, router])
}
