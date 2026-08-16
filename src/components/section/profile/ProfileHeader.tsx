// components/sections/profile/ProfileHeader.tsx
"use client";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/langue/provider";

interface ProfileHeaderProps {
  fullName: string;
  isEditing: boolean;
  onToggleEdit: () => void;
}

export function ProfileHeader({ fullName, isEditing, onToggleEdit }: ProfileHeaderProps) {
  const { t } = useLanguage();
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {fullName}
          </h1>
          <p className="text-gray-500 mt-1">{t("profile.manageInfo")}</p>
        </div>
        <Button
          variant={isEditing ? "secondary" : "default"}
          onClick={onToggleEdit}
        >
          {isEditing ? t("common.cancel") : t("profile.editProfile")}
        </Button>
      </div>
    </div>
  );
}