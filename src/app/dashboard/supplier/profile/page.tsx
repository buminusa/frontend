import { CompanyProfileSection } from "@/components/supplier/profile/CompanyProfileSection";
import { SupplierLayout } from "@/components/supplier/Layout";

export const dynamic = "force-dynamic";

export default function CompanyProfilePage() {
  return (
    <SupplierLayout>
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto max-w-4xl px-4">
          <CompanyProfileSection />
        </div>
      </main>
    </SupplierLayout>
  );
}
