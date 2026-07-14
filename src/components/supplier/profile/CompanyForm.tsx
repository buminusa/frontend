"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

interface CompanyFormProps {
  company: {
    company_name: string;
    npwp: string;
    address: string;
    province: string;
    country: string;
    phone: string;
    business_description: string;
    logo_url?: string;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function CompanyForm({ company, onSubmit, onCancel }: CompanyFormProps) {
  const [formData, setFormData] = useState({
    company_name: company.company_name || "",
    npwp: company.npwp || "",
    address: company.address || "",
    province: company.province || "",
    country: company.country || "",
    phone: company.phone || "",
    business_description: company.business_description || "",
    logo_url: company.logo_url || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Edit Company Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Company Name"
            name="company_name"
            placeholder="Enter company name"
            value={formData.company_name}
            onChange={handleChange}
            required
          />
          <Input
            label="NPWP"
            name="npwp"
            placeholder="Enter NPWP"
            value={formData.npwp}
            onChange={handleChange}
            required
          />
        </div>
        
        <Textarea
          label="Address"
          name="address"
          placeholder="Enter company address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          required
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Province"
            name="province"
            placeholder="Enter province"
            value={formData.province}
            onChange={handleChange}
            required
          />
          <Input
            label="Country"
            name="country"
            placeholder="Enter country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        
        <Input
          label="Phone"
          name="phone"
          type="tel"
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Logo URL (Optional)"
          name="logo_url"
          placeholder="Enter logo URL"
          value={formData.logo_url || ""}
          onChange={handleChange}
        />
        
        <Textarea
          label="Business Description"
          name="business_description"
          placeholder="Describe your business"
          value={formData.business_description}
          onChange={handleChange}
          rows={4}
          required
        />
        
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
          <Button type="submit" className="flex-1">
            Save Changes
          </Button>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}