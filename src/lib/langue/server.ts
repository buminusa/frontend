import { cookies } from "next/headers";
import { getMessage, isLang, type Lang } from "./index";

export async function getServerLang(): Promise<Lang> {
  const store = await cookies();
  const value = store.get("buminusa_lang")?.value;
  return isLang(value) ? value : "id";
}

export async function getServerT() {
  const lang = await getServerLang();
  return (key: string, vars?: Record<string, string | number>) =>
    getMessage(lang, key, vars);
}
