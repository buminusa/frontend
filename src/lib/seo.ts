export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const SITE_NAME = "BumiNusa.id";
export const SITE_DESCRIPTION =
  "Bumi Nusa adalah platform penjualan rempah-rempah terpercaya di Indonesia. Jual dan beli rempah-rempah pilihan langsung dari petani dan supplier berkualitas dengan harga terbaik.";

export const SITE_KEYWORDS = [
  "rempah rempah",
  "jual rempah",
  "beli rempah",
  "rempah indonesia",
  "spices indonesia",
  "supplier rempah",
  "bumi nusa",
  "buminusa",
  "platform rempah",
  "ekspor rempah",
];

export function truncate(text: string, maxLength = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength - 1).trimEnd()}…`;
}
