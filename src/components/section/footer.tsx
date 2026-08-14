"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, ChevronDown, ChevronRight } from "lucide-react";

const menuItems = [
  { name: "Komoditas", info: "Temukan komoditas pilihan dari supplier Indonesia dan bandingkan produk sesuai kebutuhan Anda." },
  { name: "Supplier", info: "Supplier dapat mengelola produk, pesanan, dan profil bisnis melalui dashboard khusus." },
  { name: "Tentang Kami", info: "BumiNusa.id menghubungkan hasil bumi Indonesia dengan pasar yang lebih luas secara transparan." },
  { name: "Kontak", info: "Hubungi tim BumiNusa.id melalui telepon atau email untuk bantuan dan informasi lebih lanjut." },
];

const kategoriList = [
  { name: "Rempah-rempah" },
  { name: "Perkebunan" },
  { name: "Hortikultura" },
  { name: "Perikanan" },
  { name: "Peternakan" },
  { name: "Pertanian Pangan" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

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
            <h3 className="text-lg font-semibold mb-4">Menu</h3>
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isOpen = openMenu === item.name;
                return (
                  <li key={item.name}>
                    <button type="button" onClick={() => setOpenMenu(isOpen ? null : item.name)} aria-expanded={isOpen} className="flex w-full items-center gap-1 text-left text-sm text-gray-300 transition-colors hover:text-white">
                      <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      {item.name}
                    </button>
                    {isOpen && <p className="ml-5 mt-2 text-sm leading-relaxed text-gray-400">{item.info}</p>}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Kategori</h3>
            <ul className="space-y-2">
              {kategoriList.map((category) => (
                <li key={category.name} className="flex items-center gap-1 text-sm text-gray-300">
                  <ChevronRight className="w-3 h-3" />
                  {category.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3"><MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-300">Jl. Komoditas No. 123, <br /> Jakarta, Indonesia</span></li>
              <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-gray-400" /><a href="tel:+62123456789" className="text-sm text-gray-300 hover:text-white transition-colors">+62 123 456 789</a></li>
              <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-gray-400" /><a href="mailto:admin@buminusa.com" className="text-sm text-gray-300 hover:text-white transition-colors">admin@buminusa.id</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10"><div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-20 py-4"><div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-sm text-gray-400">&copy; {currentYear} Bumi Nusa. All rights reserved.</p>
        <div className="flex gap-6"><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privasi</a><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Syarat & Ketentuan</a><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Bantuan</a></div>
      </div></div></div>
    </footer>
  );
}