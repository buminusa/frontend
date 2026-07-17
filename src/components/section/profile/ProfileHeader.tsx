// components/sections/profile/ProfileHeader.tsx
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  fullName: string;
  isEditing: boolean;
  onToggleEdit: () => void;
}

export function ProfileHeader({ fullName, isEditing, onToggleEdit }: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {fullName}
          </h1>
          <p className="text-gray-500 mt-1">Manage your profile information</p>
        </div>
        <Button
          variant={isEditing ? "secondary" : "default"}
          onClick={onToggleEdit}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>
    </div>
  );
}