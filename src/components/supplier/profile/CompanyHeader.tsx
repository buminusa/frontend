// components/sections/supplier/profile/CompanyHeader.tsx
import { Building2, CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CompanyHeaderProps {
  companyName: string;
  isEditing: boolean;
  onToggleEdit: () => void;
  verificationStatus: string;
}

export function CompanyHeader({ 
  companyName, 
  isEditing, 
  onToggleEdit,
  verificationStatus 
}: CompanyHeaderProps) {
  const getStatusIcon = () => {
    switch (verificationStatus) {
      case "Verified":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "Pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "Rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (verificationStatus) {
      case "Verified":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-xl">
            <Building2 className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {companyName}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
                {getStatusIcon()}
                {verificationStatus}
              </span>
            </div>
          </div>
        </div>
        <Button 
          variant={isEditing ? "secondary" : "primary"}
          onClick={onToggleEdit}
        >
          {isEditing ? "Cancel" : "Edit Company Profile"}
        </Button>
      </div>
    </div>
  );
}