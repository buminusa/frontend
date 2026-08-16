"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  getMessage,
  isLang,
  LANG_CHANGED_EVENT,
  LANG_COOKIE_NAME,
  LANG_STORAGE_KEY,
  type Lang,
} from "./index";

type TFunction = (
  key: string,
  vars?: Record<string, string | number>,
) => string;

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: TFunction;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function writeCookie(lang: Lang) {
  if (typeof document === "undefined") return;
  document.cookie = `${LANG_COOKIE_NAME}=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

function readStoredLang(): Lang | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
  return isLang(stored) ? stored : null;
}

function subscribeLang(callback: () => void) {
  window.addEventListener(LANG_CHANGED_EVENT, callback);
  return () => window.removeEventListener(LANG_CHANGED_EVENT, callback);
}

export function LanguageProvider({
  children,
  initialLang = "id",
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const router = useRouter();

  const lang = useSyncExternalStore(
    subscribeLang,
    () => readStoredLang() ?? initialLang,
    () => initialLang,
  );

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const commitLang = useCallback(
    (next: Lang) => {
      if (readStoredLang() === next) return;
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
      writeCookie(next);
      window.dispatchEvent(new CustomEvent(LANG_CHANGED_EVENT, { detail: next }));
      router.refresh();
    },
    [router],
  );

  const setLang = useCallback(
    (next: Lang) => commitLang(next),
    [commitLang],
  );

  const toggleLang = useCallback(() => {
    const current = readStoredLang() ?? initialLang;
    commitLang(current === "id" ? "en" : "id");
  }, [commitLang, initialLang]);

  const t = useCallback<TFunction>(
    (key, vars) => getMessage(lang, key, vars),
    [lang],
  );

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, t }),
    [lang, setLang, toggleLang, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
