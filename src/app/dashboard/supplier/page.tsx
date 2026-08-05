import SupplierDashboard from "@/components/supplier/dashboard/SupplierDashboard"
import { SupplierLayout } from "@/components/supplier/Layout"

export const dynamic = "force-dynamic"

export default function DashboardPage() {
  return (
    <SupplierLayout>
      <SupplierDashboard />
    </SupplierLayout>
  )
}