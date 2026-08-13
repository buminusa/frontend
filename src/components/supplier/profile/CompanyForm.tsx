"use client";

import { useRef, useState } from "react";
import Image from "next/image";
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
  onSubmit: (data: {
    company_name: string;
    address: string;
    province: string;
    country: string;
    phone: string;
    business_description: string;
  }) => void;
  onCancel: () => void;
  onLogoUpload: (file: File) => void;
  isSaving: boolean;
  saveError?: string;
}

export function CompanyForm({
  company,
  onSubmit,
  onCancel,
  onLogoUpload,
  isSaving,
  saveError,
}: CompanyFormProps) {
  const [formData, setFormData] = useState({
    company_name: company.company_name || "",
    npwp: company.npwp || "",
    address: company.address || "",
    province: company.province || "",
    country: company.country || "",
    phone: company.phone || "",
    business_description: company.business_description || "",
  });
  const [logoPreview, setLogoPreview] = useState(company.logo_url || "");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      company_name: formData.company_name,
      address: formData.address,
      province: formData.province,
      country: formData.country,
      phone: formData.phone,
      business_description: formData.business_description,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
    onLogoUpload(file);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Edit Company Profile
      </h2>
      {saveError && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {saveError}
        </div>
      )}
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
            label="NPWP (read-only)"
            name="npwp"
            placeholder="Enter NPWP"
            value={formData.npwp}
            onChange={handleChange}
            disabled
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

        <div>
          <span className="text-sm font-medium text-gray-700 block mb-1.5">
            Company Logo
          </span>
          <div className="flex items-center gap-4">
            {logoPreview ? (
              <Image
                src={logoPreview}
                alt="Logo preview"
                width={64}
                height={64}
                unoptimized
                className="h-16 w-16 rounded-lg object-cover border border-gray-200"
              />
            ) : (
              <div className="h-16 w-16 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400">
                No logo
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-blue-600 hover:file:bg-blue-100"
            />
          </div>
          {logoFile && (
            <p className="mt-1.5 text-xs text-gray-500">
              Logo akan diunggah saat dipilih.
            </p>
          )}
        </div>

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
          <Button type="submit" className="flex-1" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            className="flex-1"
            disabled={isSaving}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
