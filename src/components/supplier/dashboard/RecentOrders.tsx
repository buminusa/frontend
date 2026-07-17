import { Clock, CheckCircle, XCircle, Package } from "lucide-react"

const orders = [
  {
    id: "ORD-2024-001",
    customer: "PT Maju Jaya",
    product: "Bahan Baku A",
    amount: "Rp 2.500.000",
    status: "Processing",
    date: "2024-01-15"
  },
  {
    id: "ORD-2024-002",
    customer: "CV Sentosa Abadi",
    product: "Bahan Baku B",
    amount: "Rp 1.800.000",
    status: "Shipped",
    date: "2024-01-14"
  },
  {
    id: "ORD-2024-003",
    customer: "UD Berkah Mulia",
    product: "Bahan Baku C",
    amount: "Rp 3.200.000",
    status: "Pending",
    date: "2024-01-13"
  }
]

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Processing: "bg-blue-100 text-blue-800",
  Shipped: "bg-purple-100 text-purple-800",
  Completed: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800"
}

const statusIcons = {
  Pending: Clock,
  Processing: Package,
  Shipped: CheckCircle,
  Completed: CheckCircle,
  Cancelled: XCircle
}

export function RecentOrders() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Pesanan Terbaru</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No. Pesanan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pembeli
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produk
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => {
              const StatusIcon = statusIcons[order.status as keyof typeof statusIcons]
              return (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {order.product}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status as keyof typeof statusColors]}`}>
                      <StatusIcon className="w-3 h-3" />
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString('id-ID')}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}