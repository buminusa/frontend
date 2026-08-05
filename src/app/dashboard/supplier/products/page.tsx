import SupplierProducts from "@/components/supplier/products/SupplierProducts";
import { SupplierLayout } from "@/components/supplier/Layout";

export const dynamic = "force-dynamic";

export default function SupplierProductsPage() {
  return (
    <SupplierLayout>
      <SupplierProducts />
    </SupplierLayout>
  );
}
