import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import FooterMenu from "@/components/section/footer-menu";
import FooterCategories from "@/components/section/footer-categories";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A3A1B] text-white">
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="BumiNusa.id" width={40} height={40} className="w-10 h-10 rounded-full" />
              <h2 className="text-xl font-bold">BumiNusa.id</h2>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">Platform aggregator komoditas Indonesia yang transparan, efisien, dan terpercaya.</p>
          </div>

          <div>
            <FooterMenu />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Kategori</h3>
            <FooterCategories />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-gray-400" /><a href="tel:+62123456789" className="text-sm text-gray-300 hover:text-white transition-colors">+62 813-1059-9740</a></li>
              <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-gray-400" /><a href="mailto:admin@buminusa.com" className="text-sm text-gray-300 hover:text-white transition-colors">admin@buminusa.id</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10"><div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-20 py-4"><div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-sm text-gray-400">&copy; {currentYear} BumiNusa.id. All rights reserved.</p>
        <div className="flex gap-6"><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privasi</a><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Syarat & Ketentuan</a><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Bantuan</a></div>
      </div></div></div>
    </footer>
  );
}
