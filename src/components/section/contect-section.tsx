import { Button } from "@/components/ui/button"
import { ShieldCheck, Cog, Users, Leaf } from "lucide-react"
import Link from "next/link"

export default function ContentSection() {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Terpercaya",
      description:
        "Transparansi dan integritas adalah fondasi setiap transaksi kami.",
    },
    {
      icon: Cog,
      title: "Efisien",
      description:
        "Teknologi dan sistem yang terintegrasi untuk proses cepat dan tepat.",
    },
    {
      icon: Users,
      title: "Kolaboratif",
      description:
        "Bertumbuh bersama melalui kemitraan yang saling menguntungkan.",
    },
    {
      icon: Leaf,
      title: "Berkelanjutan",
      description:
        "Berkomitmen pada praktik bisnis yang ramah lingkungan dan berkelanjutan.",
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
            Kami memanfaatkan teknologi dan jaringan luas untuk memastikan kualitas terbaik, harga yang kompetitif, serta proses transaksi yang aman dan terpercaya.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-gray-200">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group flex flex-col items-start gap-4 lg:px-6 lg:first:pl-0"
            >
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
          ))}
        </div>

        {/* Button */}
        <Link href={"/register"}>
          <div className="mt-12 flex justify-center">
            <Button className="h-12 rounded-xl bg-yellow-400 px-8 text-base font-semibold text-[#1A3A1B] transition hover:scale-105 hover:bg-yellow-500">
              Mulai Bergabung
            </Button>
          </div>
        </Link>
      </div>
    </section>
  )
}