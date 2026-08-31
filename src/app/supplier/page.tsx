import type { Metadata } from "next";
import SupplierDashboard from "@/components/supplier/dashboard/SupplierDashboard";
import { SupplierLayout } from "@/components/supplier/Layout";

export const metadata: Metadata = {
  title: "Supplier — BumiNusa.id",
  robots: { index: false, follow: false, noarchive: true },
};

export default function SupplierPage() {
  return (
    <SupplierLayout>
      <SupplierDashboard />
    </SupplierLayout>
  );
}
