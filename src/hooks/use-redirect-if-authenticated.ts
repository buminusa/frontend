"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  getAuthToken,
  getUserRoleFromToken,
} from "@/lib/auth"

export function useRedirectIfAuthenticated() {
  const router = useRouter()

  useEffect(() => {
    const token = getAuthToken()

    if (!token) return

    const role = getUserRoleFromToken(token)

    switch (role) {
      case "Buyer":
        router.replace("/home")
        break

      case "Supplier":
        router.replace("/suplier")
        break

      case "Admin":
        router.replace("/dashboard/admin")
        break

      case "Super_Admin":
        router.replace("/dashboard/super-admin")
        break
    }
  }, [router])
}