// components/sections/supplier/profile/VerificationStatus.tsx
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";

interface VerificationStatusProps {
  status: string;
}

export function VerificationStatus({ status }: VerificationStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "Verified":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-50 border-green-200",
          title: "Verified Company",
          description: "Your company has been verified. You can now sell products on our platform."
        };
      case "Pending":
        return {
          icon: Clock,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50 border-yellow-200",
          title: "Verification Pending",
          description: "Your company verification is being reviewed. This process usually takes 1-3 business days."
        };
      case "Rejected":
        return {
          icon: XCircle,
          color: "text-red-600",
          bgColor: "bg-red-50 border-red-200",
          title: "Verification Rejected",
          description: "Your company verification was rejected. Please update your information and resubmit."
        };
      default:
        return {
          icon: AlertCircle,
          color: "text-gray-600",
          bgColor: "bg-gray-50 border-gray-200",
          title: "Not Verified",
          description: "Please submit your company information for verification."
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className={`border rounded-xl p-4 ${config.bgColor}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-6 h-6 ${config.color} mt-0.5`} />
        <div>
          <h3 className="font-semibold text-gray-900">{config.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{config.description}</p>
          
          {status === "Pending" && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
              </div>
              <span className="text-sm text-yellow-700">Processing...</span>
            </div>
          )}

          {status === "Rejected" && (
            <button className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium">
              Resubmit for Verification →
            </button>
          )}

          {status === "Verified" && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm text-green-700">✓ All features are unlocked</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}