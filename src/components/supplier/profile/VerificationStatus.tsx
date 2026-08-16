"use client"

import {
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react"
import { useLanguage } from "@/lib/langue/provider"

interface VerificationStatusProps {
  status?: string
}

export function VerificationStatus({
  status,
}: VerificationStatusProps) {
  const { t } = useLanguage()

  const getStatusConfig = () => {
    switch (status) {
      case "Verified":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "border-green-200 bg-green-50",
          titleKey: "supplier.profile.verifiedTitle",
          descriptionKey: "supplier.profile.verifiedDesc",
        }

      case "Pending":
        return {
          icon: Clock,
          color: "text-yellow-600",
          bgColor: "border-yellow-200 bg-yellow-50",
          titleKey: "supplier.profile.pendingTitle",
          descriptionKey: "supplier.profile.pendingDesc",
        }

      case "Rejected":
        return {
          icon: XCircle,
          color: "text-red-600",
          bgColor: "border-red-200 bg-red-50",
          titleKey: "supplier.profile.rejectedTitle",
          descriptionKey: "supplier.profile.rejectedDesc",
        }

      default:
        return {
          icon: AlertCircle,
          color: "text-gray-600",
          bgColor: "border-gray-200 bg-gray-50",
          titleKey: "supplier.profile.notVerifiedTitle",
          descriptionKey: "supplier.profile.notVerifiedDesc",
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <div className={`rounded-xl border p-4 ${config.bgColor}`}>
      <div className="flex items-start gap-3">
        <Icon className={`mt-0.5 h-6 w-6 ${config.color}`} />

        <div>
          <h3 className="font-semibold text-gray-900">
            {t(config.titleKey)}
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            {t(config.descriptionKey)}
          </p>

          {status === "Pending" && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex gap-1">
                <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
                <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-400 delay-100" />
                <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-400 delay-200" />
              </div>

              <span className="text-sm text-yellow-700">
                {t("supplier.profile.processing")}
              </span>
            </div>
          )}

          {status === "Rejected" && (
            <button className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700">
              {t("supplier.profile.resubmit")}
            </button>
          )}

          {status === "Verified" && (
            <div className="mt-3">
              <span className="text-sm text-green-700">
                {t("supplier.profile.allFeaturesUnlocked")}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}