// components/sections/profile/ProfileForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

interface ProfileFormProps {
  profile: {
    full_name: string;
    address: string;
    province: string;
    country: string;
    phone: string;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export function ProfileForm({ profile, onSubmit, onCancel }: ProfileFormProps) {
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
        Edit Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          name="full_name"
          placeholder="Enter your full name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />
        
        <Textarea
          label="Address"
          name="address"
          placeholder="Enter your address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          required
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Province"
            name="province"
            placeholder="Enter your province"
            value={formData.province}
            onChange={handleChange}
            required
          />
          <Input
            label="Country"
            name="country"
            placeholder="Enter your country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        
        <Input
          label="Phone"
          name="phone"
          type="tel"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
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