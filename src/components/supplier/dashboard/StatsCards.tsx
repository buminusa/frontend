import { Package, ShoppingBag, DollarSign, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

function StatCard({ title, value, icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p
              className={`text-xs mt-2 ${trendUp ? "text-green-600" : "text-red-600"}`}
            >
              {trendUp ? "↑" : "↓"} {trend}
            </p>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-full">{icon}</div>
      </div>
    </div>
  );
}

interface StatsCardsProps {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalViews: number;
  productsTrend?: string;
  ordersTrend?: string;
  revenueTrend?: string;
  viewsTrend?: string;
}

export function StatsCards({
  totalProducts,
  totalOrders,
  totalRevenue,
  totalViews,
  productsTrend,
  ordersTrend,
  revenueTrend,
  viewsTrend,
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Produk"
        value={totalProducts}
        icon={<Package className="w-6 h-6 text-blue-600" />}
        trend={productsTrend}
        trendUp
      />
      <StatCard
        title="Total Pesanan"
        value={totalOrders}
        icon={<ShoppingBag className="w-6 h-6 text-green-600" />}
        trend={ordersTrend}
        trendUp
      />
      <StatCard
        title="Pendapatan"
        value={new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(totalRevenue)}
        icon={<DollarSign className="w-6 h-6 text-yellow-600" />}
        trend={revenueTrend}
        trendUp
      />
      <StatCard
        title="View Produk"
        value={totalViews}
        icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
        trend={viewsTrend}
        trendUp
      />
    </div>
  );
}
