import { Geist, Geist_Mono } from "next/font/google";
import { 
  Mail, 
  Phone, 
  MapPin,
  ChevronRight
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const menuItems = [
    { name: "Komoditas", href: "/" },
    { name: "Supplier", href: "/" },
    { name: "Tentang Kami", href: "/" },
    { name: "Kontak", href: "/" },
  ];

  const categories = [
    { name: "Rempah-rempah", href: "/" },
    { name: "Hasil Bumi", href: "/" },
    { name: "Perkebunan", href: "/" },
    { name: "Hortikultura", href: "/" },
  ];

  return (
    <footer className="bg-[#1A3A1B] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1 - Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Bumi_Nusa" className="w-10 h-10 rounded-full" />
              <h2 className="text-xl font-bold">
                Bumi_Nusa
              </h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Platform aggregator komoditas Indonesia yang transparan, efisien, dan terpercaya.
            </p>
            {/* <div className="flex gap-3 mt-4">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div> */}
          </div>

          {/* Column 2 - Menu */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Menu
            </h3>
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <ChevronRight className="w-3 h-3" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Kategori */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Kategori
            </h3>
            <ul className="space-y-2">
              {categories.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <ChevronRight className="w-3 h-3" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Kontak */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Kontak
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">
                  Jl. Komoditas No. 123, <br /> Jakarta, Indonesia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <a href="tel:+62123456789" className="text-sm text-gray-300 hover:text-white transition-colors">
                  +62 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <a href="mailto:info@buminusa.com" className="text-sm text-gray-300 hover:text-white transition-colors">
                  info@buminusa.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-20 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} Bumi Nusa. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privasi
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Syarat & Ketentuan
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Bantuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}