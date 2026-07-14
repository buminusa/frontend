"use client";

import { useState } from "react";
import { CompanyHeader } from "@/components/supplier/profile/CompanyHeader";
import { CompanyInfo } from "@/components/supplier/profile/CompanyInfo";
import { CompanyForm } from "@/components/supplier/profile/CompanyForm";
import { BusinessDescription } from "@/components/supplier/profile/BusinessDescription";
import { VerificationStatus } from "@/components/supplier/profile/VerificationStatus";

const MOCK_COMPANY_PROFILE = {
  id: 1,
  company_name: "PT Teknologi Nusantara",
  slug: "pt-teknologi-nusantara",
  npwp: "12.345.678.9-123.456",
  address: "Jl. Gatot Subroto No. 45, RT 08 RW 12",
  province: "DKI Jakarta",
  country: "Indonesia",
  phone: "021-12345678",
  logo_url: "/images/company-logo.png",
  business_description: "Perusahaan teknologi yang bergerak di bidang pengembangan software dan solusi digital untuk berbagai industri di Indonesia.",
  verificationStatus: "Verified"
};

export function CompanyProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [company, setCompany] = useState(MOCK_COMPANY_PROFILE);

  const handleUpdateCompany = (data: any) => {
    setCompany(prev => ({ ...prev, ...data }));
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <CompanyHeader 
        companyName={company.company_name}
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing(!isEditing)}
        verificationStatus={company.verificationStatus}
      />
      
      <VerificationStatus status={company.verificationStatus} />
      
      {isEditing ? (
        <CompanyForm 
          company={company}
          onSubmit={handleUpdateCompany}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <CompanyInfo company={company} />
          <BusinessDescription description={company.business_description} />
        </>
      )}
    </div>
  );
}