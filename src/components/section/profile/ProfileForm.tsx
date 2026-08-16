// components/sections/profile/ProfileForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useLanguage } from "@/lib/langue/provider";

interface ProfileFormData {
  full_name: string;
  address: string;
  province: string;
  country: string;
  phone: string;
}

interface ProfileFormProps {
  profile: ProfileFormData;
  onSubmit: (data: ProfileFormData) => void;
  onCancel: () => void;
}

export function ProfileForm({ profile, onSubmit, onCancel }: ProfileFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    full_name: profile.full_name || "",
    address: profile.address || "",
    province: profile.province || "",
    country: profile.country || "",
    phone: profile.phone || "",
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
        {t("profile.editTitle")}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label={t("profile.fullName")}
          name="full_name"
          placeholder={t("profile.fullNamePlaceholder")}
          value={formData.full_name}
          onChange={handleChange}
          required
        />
        
        <Textarea
          label={t("profile.address")}
          name="address"
          placeholder={t("profile.addressPlaceholder")}
          value={formData.address}
          onChange={handleChange}
          rows={3}
          required
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label={t("profile.province")}
            name="province"
            placeholder={t("profile.provincePlaceholder")}
            value={formData.province}
            onChange={handleChange}
            required
          />
          <Input
            label={t("profile.country")}
            name="country"
            placeholder={t("profile.countryPlaceholder")}
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        
        <Input
          label={t("profile.phone")}
          name="phone"
          type="tel"
          placeholder={t("profile.phonePlaceholder")}
          value={formData.phone}
          onChange={handleChange}
          required
        />
        
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
          <Button type="submit" className="flex-1">
            {t("profile.saveChanges")}
          </Button>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onCancel}
            className="flex-1"
          >
            {t("common.cancel")}
          </Button>
        </div>
      </form>
    </div>
  );
}