"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/langue/provider";

const menuItems = [
  { name: "landing.footer.menuKomoditas", info: "landing.footer.menuKomoditasInfo" },
  { name: "landing.footer.menuSupplier", info: "landing.footer.menuSupplierInfo" },
  { name: "landing.footer.menuAbout", info: "landing.footer.menuAboutInfo" },
  { name: "landing.footer.menuContact", info: "landing.footer.menuContactInfo" },
];

export default function FooterMenu() {
  const { t } = useLanguage();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <>
      <h3 className="text-lg font-semibold mb-4">{t("landing.footer.menuTitle")}</h3>
      <ul className="space-y-2">
        {menuItems.map((item) => {
          const isOpen = openMenu === item.name;
          return (
            <li key={item.name}>
              <button type="button" onClick={() => setOpenMenu(isOpen ? null : item.name)} aria-expanded={isOpen} className="flex w-full items-center gap-1 text-left text-sm text-gray-300 transition-colors hover:text-white">
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                {t(item.name)}
              </button>
              {isOpen && <p className="ml-5 mt-2 text-sm leading-relaxed text-gray-400">{t(item.info)}</p>}
            </li>
          );
        })}
      </ul>
    </>
  );
}
