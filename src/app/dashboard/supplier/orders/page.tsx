import SupplierOrders from "@/components/supplier/orders/SupplierOrders";
import { SupplierLayout } from "@/components/supplier/Layout";

export const dynamic = "force-dynamic";

export default function SupplierOrdersPage() {
  return (
    <SupplierLayout>
      <SupplierOrders />
    </SupplierLayout>
  );
}
