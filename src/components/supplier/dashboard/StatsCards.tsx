import { Package, ShoppingBag, DollarSign, TrendingUp } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: string
  trendUp?: boolean
}

function StatCard({ title, value, icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p className={`text-xs mt-2 ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {trendUp ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  )
}

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Produk"
        value="24"
        icon={<Package className="w-6 h-6 text-blue-600" />}
        trend="+3 bulan ini"
        trendUp={true}
      />
      <StatCard
        title="Total Pesanan"
        value="18"
        icon={<ShoppingBag className="w-6 h-6 text-green-600" />}
        trend="+12%"
        trendUp={true}
      />
      <StatCard
        title="Pendapatan"
        value="Rp 45.2 Jt"
        icon={<DollarSign className="w-6 h-6 text-yellow-600" />}
        trend="+23.5%"
        trendUp={true}
      />
      <StatCard
        title="View Produk"
        value="1.2K"
        icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
        trend="+5.2%"
        trendUp={true}
      />
    </div>
  )
}