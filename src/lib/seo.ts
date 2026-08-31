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

export const OG_IMAGE = "/opengraph-image";
export const OG_IMAGE_FALLBACK = "/logo.png";
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

export const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "Apa itu BumiNusa.id?",
    answer:
      "BumiNusa.id adalah platform jual beli rempah-rempah terpercaya Indonesia yang menghubungkan pembeli langsung dengan petani dan supplier terverifikasi. Kami menyediakan berbagai komoditas rempah pilihan dengan harga kompetitif.",
  },
  {
    question: "Bagaimana cara membeli rempah di BumiNusa.id?",
    answer:
      "Cari komoditas di halaman Komoditas, buka detail produk, hubungi supplier atau buat pesanan langsung. Anda dapat membandingkan harga, memeriksa spesifikasi, dan memesan dengan jumlah minimum (MOQ) yang tertera.",
  },
  {
    question: "Apakah supplier di BumiNusa.id terverifikasi?",
    answer:
      "Ya, setiap supplier melalui proses verifikasi profil usaha, NPWP, dan kelengkapan data. Status verifikasi (Pending, Verified, Rejected) dikelola oleh tim admin untuk menjaga kepercayaan transaksi.",
  },
  {
    question: "Berapa minimum order (MOQ) untuk setiap produk?",
    answer:
      "MOQ berbeda untuk setiap produk dan tertera di halaman detail komoditas (misalnya 10 kg, 50 kg). Hubungi supplier untuk negosiasi jumlah dan harga grosir.",
  },
  {
    question: "Bagaimana sistem pengiriman dan pembayaran?",
    answer:
      "Pengiriman diatur antara pembeli dan supplier sesuai kesepakatan. Pembayaran dilakukan sesuai metode yang disepakati; selalu konfirmasi detail pengiriman, estimasi waktu, dan biaya sebelum menyelesaikan pesanan.",
  },
  {
    question: "Apakah BumiNusa.id melayani ekspor rempah ke luar negeri?",
    answer:
      "Ya, banyak supplier di BumiNusa.id melayani permintaan ekspor. Setiap produk mencantumkan kode HS (Harmonized System) untuk memudahkan proses ekspor-impor. Hubungi supplier untuk detail dokumen dan logistik ekspor.",
  },
  {
    question: "Bagaimana cara menjadi supplier di BumiNusa.id?",
    answer:
      "Daftar akun, lengkapi profil usaha (nama perusahaan, NPWP, alamat, deskripsi usaha, dan logo), lalu tunggu verifikasi admin. Setelah terverifikasi, Anda dapat menambahkan produk, mengatur harga dan stok, serta mengelola pesanan.",
  },
];

export const HOWTO_STEPS = [
  { name: "Cari komoditas", text: "Buka halaman Komoditas dan gunakan pencarian atau filter kategori untuk menemukan rempah yang dibutuhkan." },
  { name: "Bandingkan & pilih produk", text: "Buka detail produk untuk melihat harga, MOQ, spesifikasi, dan profil supplier terverifikasi." },
  { name: "Hubungi supplier & pesan", text: "Hubungi supplier atau buat pesanan, sepakati jumlah, harga, pengiriman, dan metode pembayaran." },
];
