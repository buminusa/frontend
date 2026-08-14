import SupplierDashboard from "@/components/supplier/dashboard/SupplierDashboard";
import { SupplierLayout } from "@/components/supplier/Layout";

export default function SupplierPage() {
  return (
    <SupplierLayout>
      <SupplierDashboard />
    </SupplierLayout>
  );
}
