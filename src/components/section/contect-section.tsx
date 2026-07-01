import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  TrendingUp,
  Users,
  Clock,
  Award,
  Globe,
} from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ContectSection() {
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
      description: "Informasi harga dan stok selalu diperbarui secara langsung",
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
  ];

  return (
    <>
      <section className="bg-gradient-to-b from-white to-green-50">
        <div className="ml-42 mt-45">
          <h1
            className={`${geistSans.className} text-2xl font-bold text-[#1A3A1B] `}
          >
            Kenapa Bumi_Nusa?
          </h1>
          <p
            className={`${geistSans.className} mt-3 text-gray-600 text-lg max-w-2xl `}
          >
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit
            amet consectetur adipiscing elit quisque faucibus.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-10 ml-42 mr-42">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#1A3A1B]/10 rounded-xl flex items-center justify-center group-hover:bg-[#1A3A1B] transition-colors duration-300">
                  <benefit.icon className="w-6 h-6 text-[#1A3A1B] group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <h3
                    className={`${geistSans.className} text-lg font-semibold text-[#1A3A1B] mb-2`}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className={`${geistSans.className} text-sm text-gray-600 leading-relaxed`}
                  >
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-15 mb-15">
          <Button
            className={`${geistSans.className} rounded-2xl bg-yellow-400 text-[#1A3A1B] font-semibold text-base px-8 py-6 hover:scale-105 transition-transform hover:bg-yellow-500`}
          >
            Mulai Bergabung
          </Button>
        </div>
      </section>
    </>
  );
}
