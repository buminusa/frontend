import { Button } from "@/components/ui/button"
import {
  ShieldCheck,
  TrendingUp,
  Users,
  Clock,
  Award,
  Globe,
} from "lucide-react"

export default function ContentSection() {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Transparan",
      description:
        "Semua data harga dan kualitas produk tersedia secara terbuka dan akurat",
    },
    {
      icon: TrendingUp,
      title: "Efisien",
      description:
        "Proses transaksi cepat dan mudah tanpa perantara yang berbelit",
    },
    {
      icon: Users,
      title: "Terpercaya",
      description:
        "Telah dipercaya oleh ribuan petani dan pembeli di seluruh Indonesia",
    },
    {
      icon: Clock,
      title: "Real-time",
      description:
        "Informasi harga dan stok selalu diperbarui secara langsung",
    },
    {
      icon: Award,
      title: "Kualitas Terjamin",
      description:
        "Produk komoditas terbaik dengan standar kualitas yang ketat",
    },
    {
      icon: Globe,
      title: "Jangkauan Luas",
      description:
        "Terhubung dengan petani dan pembeli dari berbagai daerah di Indonesia",
    },
  ]

  return (
    <section className="bg-gradient-to-b from-white to-green-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-[#1A3A1B] lg:text-3xl">
            Kenapa Bumi Nusa?
          </h2>

          <p className="mt-4 text-base leading-relaxed text-gray-600 lg:text-lg">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit
            amet consectetur adipiscing elit quisque faucibus.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#1A3A1B]/10 transition-colors duration-300 group-hover:bg-[#1A3A1B]">
                  <benefit.icon className="h-6 w-6 text-[#1A3A1B] transition-colors duration-300 group-hover:text-white" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#1A3A1B]">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-12 flex justify-center">
          <Button className="h-12 rounded-xl bg-yellow-400 px-8 text-base font-semibold text-[#1A3A1B] transition hover:scale-105 hover:bg-yellow-500">
            Mulai Bergabung
          </Button>
        </div>
      </div>
    </section>
  )
}