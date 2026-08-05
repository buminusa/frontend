// components/sections/profile/OrderHistory.tsx
import Link from "next/link";
import { Package, Calendar, DollarSign, ChevronRight } from "lucide-react";

interface Order {
  id: number;
  created_at: Date;
  total_amount: number;
  status: string;
}

interface OrderHistoryProps {
  orders: Order[];
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  const getStatusColor = (status: string) => {
    const colors = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return (
      colors[status.toLowerCase() as keyof typeof colors] ||
      "bg-gray-100 text-gray-800"
    );
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      completed: "Completed",
      pending: "Pending",
      confirmed: "Confirmed",
      processing: "Processing",
      shipped: "Shipped",
      cancelled: "Cancelled",
    };
    return labels[status.toLowerCase() as keyof typeof labels] || status;
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Order History
        </h2>
        <div className="text-center py-8">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No orders yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Order History
        </h2>
        <Link
          href="/keranjang"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View All
        </Link>
      </div>

      <div className="space-y-3">
        {orders.slice(0, 3).map((order) => (
          <Link
            href={`/keranjang?orderId=${order.id}`}
            key={order.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Package className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Order #{order.id}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(order.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3 sm:mt-0 w-full sm:w-auto">
              <div className="flex items-center gap-1 text-gray-900 font-medium">
                <DollarSign className="w-4 h-4" />
                <span>Rp {order.total_amount.toLocaleString('id-ID')}</span>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {getStatusLabel(order.status)}
              </span>

              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}