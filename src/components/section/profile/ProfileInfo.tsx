import { User, MapPin, Phone, Globe, Mail } from "lucide-react"

interface ProfileInfoProps {
  profile: {
    full_name: string
    address: string
    province: string
    country: string
    phone: string
    email: string
  }
}

export function ProfileInfo({ profile }: ProfileInfoProps) {
  const infoItems = [
    { icon: User, label: "Full Name", value: profile.full_name },
    { icon: Mail, label: "Email", value: profile.email },
    { icon: MapPin, label: "Address", value: profile.address },
    { icon: Globe, label: "Province", value: profile.province },
    { icon: Globe, label: "Country", value: profile.country },
    { icon: Phone, label: "Phone", value: profile.phone },
  ]

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Profile Information
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {infoItems.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-lg bg-gray-50 p-3"
          >
            <item.icon className="mt-0.5 h-5 w-5 text-blue-500" />

            <div className="flex-1">
              <p className="text-xs uppercase tracking-wider text-gray-500">
                {item.label}
              </p>

              <p className="mt-0.5 font-medium text-gray-900">
                {item.value || "-"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}