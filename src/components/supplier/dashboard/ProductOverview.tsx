import { Eye, ShoppingCart, Star } from "lucide-react"

const products = [
  {
    name: "Bahan Baku Premium A",
    category: "Kimia",
    price: "Rp 150.000",
    stock: "500",
    status: "Active",
    views: 234
  },
  {
    name: "Bahan Baku Premium B",
    category: "Tekstil",
    price: "Rp 200.000",
    stock: "300",
    status: "Draft",
    views: 89
  },
  {
    name: "Bahan Baku Premium C",
    category: "Logam",
    price: "Rp 350.000",
    stock: "150",
    status: "Pending",
    views: 156
  }
]

const statusColors = {
  Active: "bg-green-100 text-green-800",
  Draft: "bg-gray-100 text-gray-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Rejected: "bg-red-100 text-red-800"
}

export function ProductOverview() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Overview Produk</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          Lihat Semua
        </button>
      </div>
      <div className="divide-y divide-gray-100">
        {products.map((product, index) => (
          <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <ShoppingCart className="w-3 h-3" />
                    {product.stock} unit
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {product.views}
                  </span>
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[product.status as keyof typeof statusColors]}`}>
                  {product.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}