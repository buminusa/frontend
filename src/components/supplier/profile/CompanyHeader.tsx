"use client"

import { Building2, CheckCircle, Clock, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/langue/provider"

interface CompanyHeaderProps {
  companyName: string
  isEditing: boolean
  onToggleEdit: () => void
  verificationStatus?: string
}

const statusLabelKeys: Record<string, string> = {
  Verified: "supplier.status.verified",
  Pending: "supplier.status.pendingVerification",
  Rejected: "supplier.status.rejected",
}

export function CompanyHeader({
  companyName,
  isEditing,
  onToggleEdit,
  verificationStatus,
}: CompanyHeaderProps) {
  const { t } = useLanguage()

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case "Verified":
        return <CheckCircle className="h-5 w-5 text-green-500" />

      case "Pending":
        return <Clock className="h-5 w-5 text-yellow-500" />

      case "Rejected":
        return <XCircle className="h-5 w-5 text-red-500" />

      default:
        return null
    }
  }

  const getStatusColor = () => {
    switch (verificationStatus) {
      case "Verified":
        return "bg-green-100 text-green-800"

      case "Pending":
        return "bg-yellow-100 text-yellow-800"

      case "Rejected":
        return "bg-red-100 text-red-800"

      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-blue-50 p-3">
            <Building2 className="h-8 w-8 text-blue-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {companyName}
            </h1>

            <div className="mt-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${getStatusColor()}`}
              >
                {getStatusIcon()}
                {t(
                  verificationStatus
                    ? statusLabelKeys[verificationStatus] ??
                        "supplier.profile.notVerified"
                    : "supplier.profile.notVerified",
                )}
              </span>
            </div>
          </div>
        </div>
        <Button
          variant={isEditing ? "secondary" : "default"}
          onClick={onToggleEdit}
        >
          {isEditing
            ? t("supplier.profile.cancel")
            : t("supplier.profile.editProfileButton")}
        </Button>
      </div>
    </div>
  )
}