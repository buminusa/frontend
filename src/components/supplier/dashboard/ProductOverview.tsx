import { Eye, ShoppingCart } from "lucide-react";
import type { SupplierDashboardProduct } from "@/hooks/useSupplierDashboard";

const statusColors = {
  Active: "bg-green-100 text-green-800",
  Draft: "bg-gray-100 text-gray-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Rejected: "bg-red-100 text-red-800",
};

interface ProductOverviewProps {
  products: SupplierDashboardProduct[];
}

export function ProductOverview({ products }: ProductOverviewProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Overview Produk</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {products.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">Belum ada produk.</div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
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
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[product.status as keyof typeof statusColors] ?? "bg-gray-100 text-gray-800"}`}
                  >
                    {product.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
