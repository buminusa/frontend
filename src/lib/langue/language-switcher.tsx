"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "./provider";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, toggleLang, t } = useLanguage();

  if (compact) {
    return (
      <button
        type="button"
        onClick={toggleLang}
        aria-label={
          lang === "id" ? t("nav.switchToEn") : t("nav.switchToId")
        }
        title={lang === "id" ? t("nav.switchToEn") : t("nav.switchToId")}
        className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
      >
        <Globe size={16} className="text-gray-500" />
        <span className="uppercase">{lang}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleLang}
      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-green-600"
    >
      <Globe size={18} />
      {lang === "id" ? t("nav.languageEn") : t("nav.languageId")}
      <span className="ml-auto rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold uppercase text-green-700">
        {lang === "id" ? "EN" : "ID"}
      </span>
    </button>
  );
}
