"use client";

import { Bell, ShoppingBag, Package, User, Star } from "lucide-react";
import type { SupplierDashboardActivity } from "@/hooks/useSupplierDashboard";
import { useLanguage } from "@/lib/langue/provider";

const iconMap = {
  shopping: ShoppingBag,
  package: Package,
  user: User,
  star: Star,
};

const iconColors = {
  shopping: "text-green-600",
  package: "text-blue-600",
  user: "text-yellow-600",
  star: "text-purple-600",
};

const bgColors = {
  shopping: "bg-green-50",
  package: "bg-blue-50",
  user: "bg-yellow-50",
  star: "bg-purple-50",
};

interface ActivityFeedProps {
  activities: SupplierDashboardActivity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {t("supplier.dashboard.recentActivity")}
        </h2>
        <Bell className="w-5 h-5 text-gray-400" />
      </div>
      <div className="divide-y divide-gray-100">
        {activities.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">
            {t("supplier.dashboard.noActivity")}
          </div>
        ) : (
          activities.map((activity, index) => {
            const Icon = iconMap[activity.icon];
            return (
              <div
                key={`${activity.title}-${index}`}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-full ${bgColors[activity.icon]}`}
                  >
                    <Icon className={`w-4 h-4 ${iconColors[activity.icon]}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700">{activity.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {activity.time}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
