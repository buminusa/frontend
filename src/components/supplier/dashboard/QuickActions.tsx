import { Plus, Package, Users, Settings, FileText, TrendingUp } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    icon: Plus,
    label: "Tambah Produk",
    href: "/supplier/products/add",
    color: "bg-green-500"
  },
  {
    icon: Package,
    label: "Kelola Produk",
    href: "/supplier/products",
    color: "bg-blue-500"
  },
  {
    icon: FileText,
    label: "Lihat Pesanan",
    href: "/supplier/orders",
    color: "bg-purple-500"
  },
  {
    icon: Users,
    label: "Profil Supplier",
    href: "/supplier/profile",
    color: "bg-yellow-500"
  },
  {
    icon: TrendingUp,
    label: "Analitik",
    href: "/supplier/analytics",
    color: "bg-indigo-500"
  },
  {
    icon: Settings,
    label: "Pengaturan",
    href: "/supplier/settings",
    color: "bg-gray-500"
  }
]

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Aksi Cepat</h2>
      </div>
      <div className="p-4 grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <div className={`p-3 rounded-full ${action.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
              <action.icon className={`w-5 h-5 text-${action.color.replace('bg-', '')}`} />
            </div>
            <span className="text-xs font-medium text-gray-700 mt-2 text-center">
              {action.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}