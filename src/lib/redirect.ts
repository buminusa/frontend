import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export function redirectByRole(
  role: string | null,
  router: AppRouterInstance
) {
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
