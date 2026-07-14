// components/sections/profile/ProfileInfo.tsx
import { User, MapPin, Phone, Globe, Mail } from "lucide-react";

interface ProfileInfoProps {
  profile: {
    full_name: string;
    address: string;
    province: string;
    country: string;
    phone: string;
  };
}

export function ProfileInfo({ profile }: ProfileInfoProps) {
  const infoItems = [
    { icon: User, label: "Full Name", value: profile.full_name },
    { icon: MapPin, label: "Address", value: profile.address },
    { icon: Globe, label: "Province", value: profile.province },
    { icon: Globe, label: "Country", value: profile.country },
    { icon: Phone, label: "Phone", value: profile.phone },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Profile Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {infoItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <item.icon className="w-5 h-5 text-blue-500 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</p>
              <p className="text-gray-900 font-medium mt-0.5">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}