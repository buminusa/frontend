"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  getAuthToken,
  getUserRoleFromToken,
  isAuthTokenValid,
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

    if (!isAuthTokenValid(token)) {
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
          router.replace("/supplier")
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
