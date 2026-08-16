import { id, en } from "./messages";

export type Lang = "id" | "en";
export type Messages = Record<string, string>;

export const LANG_STORAGE_KEY = "buminusa_lang";
export const LANG_COOKIE_NAME = "buminusa_lang";
export const LANG_CHANGED_EVENT = "buminusa:lang-changed";

export const messages: Record<Lang, Messages> = { id, en };

export function isLang(value: string | null | undefined): value is Lang {
  return value === "id" || value === "en";
}

export function getMessage(
  lang: Lang,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const table = messages[lang] ?? messages.id;
  const value = table[key] ?? messages.id[key];
  if (value === undefined) return key;
  if (!vars) return value;
  return value.replace(/\{(\w+)\}/g, (match, name: string) =>
    vars[name] !== undefined ? String(vars[name]) : match,
  );
}
