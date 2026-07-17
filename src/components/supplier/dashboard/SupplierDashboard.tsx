import { StatsCards } from "./StatsCards"
import { RecentOrders } from "./RecentOrders"
import { ProductOverview } from "./ProductOverview"
import { QuickActions } from "./QuickActions"
import { ActivityFeed } from "./ActivityFeed"

export default function SupplierDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders - 2 columns */}
        <div className="lg:col-span-2">
          <RecentOrders />
        </div>

        {/* Quick Actions - 1 column */}
        <div>
          <QuickActions />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Overview */}
        <ProductOverview />

        {/* Activity Feed */}
        <ActivityFeed />
      </div>
    </div>
  )
}