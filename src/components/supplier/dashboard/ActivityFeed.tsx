import { Bell, ShoppingBag, Package, User, Star } from "lucide-react"

const activities = [
  {
    icon: ShoppingBag,
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
    title: "Pesanan baru dari PT Maju Jaya",
    time: "5 menit yang lalu"
  },
  {
    icon: Package,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    title: "Produk \"Bahan Baku A\" telah diverifikasi",
    time: "1 jam yang lalu"
  },
  {
    icon: User,
    iconColor: "text-yellow-600",
    bgColor: "bg-yellow-50",
    title: "Profil supplier telah diperbarui",
    time: "3 jam yang lalu"
  },
  {
    icon: Star,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
    title: "Menerima rating 5 bintang dari CV Sentosa",
    time: "5 jam yang lalu"
  },
  {
    icon: ShoppingBag,
    iconColor: "text-red-600",
    bgColor: "bg-red-50",
    title: "Pesanan #ORD-2024-002 dibatalkan",
    time: "1 hari yang lalu"
  }
]

export function ActivityFeed() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Aktivitas Terbaru</h2>
        <Bell className="w-5 h-5 text-gray-400" />
      </div>
      <div className="divide-y divide-gray-100">
        {activities.map((activity, index) => (
          <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${activity.bgColor}`}>
                <activity.icon className={`w-4 h-4 ${activity.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700">{activity.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}