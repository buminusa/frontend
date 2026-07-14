// components/sections/profile/ProfileSection.tsx
"use client";

import { useState } from "react";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileInfo } from "./ProfileInfo";
import { ProfileForm } from "./ProfileForm";
import { OrderHistory } from "./OrderHistory";

// Mock data sementara
const MOCK_PROFILE = {
  id: 1,
  full_name: "John Doe",
  address: "Jl. Sudirman No. 123, RT 05 RW 03",
  province: "DKI Jakarta",
  country: "Indonesia",
  phone: "081234567890",
  orders: [
    {
      id: 1001,
      created_at: new Date("2026-01-15"),
      total_amount: 250000,
      status: "completed"
    },
    {
      id: 1002,
      created_at: new Date("2026-01-20"),
      total_amount: 175000,
      status: "pending"
    },
    {
      id: 1003,
      created_at: new Date("2026-01-25"),
      total_amount: 320000,
      status: "shipped"
    }
  ]
};

export function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(MOCK_PROFILE);

  const handleUpdateProfile = (data: any) => {
    setProfile(prev => ({ ...prev, ...data }));
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <ProfileHeader 
        fullName={profile.full_name}
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing(!isEditing)}
      />
      
      {isEditing ? (
        <ProfileForm 
          profile={profile}
          onSubmit={handleUpdateProfile}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <ProfileInfo profile={profile} />
          <OrderHistory orders={profile.orders} />
        </>
      )}
    </div>
  );
}