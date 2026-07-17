import {
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react"

interface VerificationStatusProps {
  status?: string
}

export function VerificationStatus({
  status,
}: VerificationStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "Verified":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "border-green-200 bg-green-50",
          title: "Verified Company",
          description:
            "Your company has been verified. You can now sell products on our platform.",
        }

      case "Pending":
        return {
          icon: Clock,
          color: "text-yellow-600",
          bgColor: "border-yellow-200 bg-yellow-50",
          title: "Verification Pending",
          description:
            "Your company verification is currently being reviewed.",
        }

      case "Rejected":
        return {
          icon: XCircle,
          color: "text-red-600",
          bgColor: "border-red-200 bg-red-50",
          title: "Verification Rejected",
          description:
            "Your verification was rejected. Please update your information.",
        }

      default:
        return {
          icon: AlertCircle,
          color: "text-gray-600",
          bgColor: "border-gray-200 bg-gray-50",
          title: "Not Verified",
          description:
            "Your company has not been verified yet.",
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
            {config.title}
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            {config.description}
          </p>

          {status === "Pending" && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex gap-1">
                <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
                <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-400 delay-100" />
                <div className="h-2 w-2 animate-pulse rounded-full bg-yellow-400 delay-200" />
              </div>

              <span className="text-sm text-yellow-700">
                Processing...
              </span>
            </div>
          )}

          {status === "Rejected" && (
            <button className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700">
              Resubmit for Verification →
            </button>
          )}

          {status === "Verified" && (
            <div className="mt-3">
              <span className="text-sm text-green-700">
                ✓ All features are unlocked
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}