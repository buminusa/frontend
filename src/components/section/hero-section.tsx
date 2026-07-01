import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function hero() {
  const hero = {
    labels: ["Transparan", "Efisien", "Terpercaya"],
  };
  const categories = [
    { name: "Rempah-rempah", image: "/rempah.png" },
    { name: "Hasil Bumi", image: "/hasil_bumi.png" },
    { name: "Perkebunan", image: "/perkebunan.png" },
    { name: "Hortikultura", image: "/Hortikultura.png" },
  ];

  return (
    <>
      <section className="relative w-full h-[420px] overflow-hidden">
        <div>
          <img
            src="/hero.png"
            alt="Hero"
            className="absolute  w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center px-20 max-w-4xl ml-22">
          <h1
            className={`${geistSans.className} text-6xl font-semibold text-white leading-tight`}
          >
            Platform Aggregator <br /> Komoditas Indonesia
          </h1>
          <p
            className={`${geistSans.className} mt-4 text-lg font-bold text-white/80`}
          >
            {hero.labels.join(" • ")}
          </p>
          <Button
            className={`${geistSans.className} rounded-2xl mt-6 w-70 h-15 bg-yellow-400 text-[#1A3A1B] font-semibold text-lg px-5 py-2.5 rounded-md`}
          >
            Jelajahi Produk
          </Button>
        </div>
      </section>

      <section>
        <div className="max-w-full ml-22 px-20 mt-10">
          <h2
            className={`${geistSans.className} text-2xl font-bold text-[#1A3A1B]`}
          >
            Kategori Komoditas
          </h2>
          <div className="grid grid-cols-4 gap-4 mt-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 flex flex-col items-center justify-center gap-3 py-8 px-4 hover:shadow-md transition-shadow"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-16 h-16 object-contain"
                />
                <span
                  className={`${geistSans.className} text-sm font-medium text-black text-center`}
                >
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
