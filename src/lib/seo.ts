export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const SITE_NAME = "BumiNusa.id";
export const SITE_SHORT_NAME = "BumiNusa";
export const SITE_DESCRIPTION =
  "BumiNusa.id adalah platform jual beli rempah-rempah terpercaya Indonesia. Jual dan beli rempah-rempah pilihan langsung dari petani dan supplier berkualitas dengan harga terbaik.";

export const SITE_KEYWORDS = [
  "buminusa",
  "bumi nusa",
  "buminusa.id",
  "bumi nusa id",
  "jual beli rempah",
  "rempah rempah",
  "rempah indonesia",
  "jual rempah",
  "beli rempah",
  "supplier rempah",
  "spices indonesia",
  "platform rempah",
  "ekspor rempah",
];

export const OG_IMAGE = "/logo.png";

export const TWITTER_HANDLE = "@buminusa";

export const SAME_AS: string[] = [
  "https://instagram.com/buminusa.id",
  "https://facebook.com/buminusa.id",
  "https://www.tiktok.com/@buminusa",
].filter(Boolean);

export function truncate(text: string, maxLength = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength - 1).trimEnd()}…`;
}
