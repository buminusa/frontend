"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const menuItems = [
  { name: "Komoditas", info: "Temukan komoditas pilihan dari supplier Indonesia dan bandingkan produk sesuai kebutuhan Anda." },
  { name: "Supplier", info: "Supplier dapat mengelola produk, pesanan, dan profil bisnis melalui dashboard khusus." },
  { name: "Tentang Kami", info: "BumiNusa.id menghubungkan hasil bumi Indonesia dengan pasar yang lebih luas secara transparan." },
  { name: "Kontak", info: "Hubungi tim BumiNusa.id melalui telepon atau email untuk bantuan dan informasi lebih lanjut." },
];

export default function FooterMenu() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <>
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
    </>
  );
}
