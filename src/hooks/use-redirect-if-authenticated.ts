"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  getAuthToken,
  getUserRoleFromToken,
  isAuthTokenValid,
  isUserVerifiedFromToken,
} from "@/lib/auth"

export function useRedirectIfAuthenticated() {
  const router = useRouter()

  useEffect(() => {
    const token = getAuthToken()

    if (!token || !isAuthTokenValid(token)) return

    // Akun belum verifikasi email: biarkan tetap di halaman auth (login/register)
    if (!isUserVerifiedFromToken(token)) return

    const role = getUserRoleFromToken(token)

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
    }
  }, [router])
}
