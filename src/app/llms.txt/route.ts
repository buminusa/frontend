import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, FAQ_ITEMS } from "@/lib/seo";

export const dynamic = "force-static";

export async function GET() {
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    `URL: ${SITE_URL}`,
    `Bahasa: id-ID (Indonesia)`,
    `Kategori: E-commerce rempah-rempah Indonesia`,
    "",
    "## Tentang",
    `${SITE_NAME} menghubungkan pembeli dengan petani dan supplier rempah terverifikasi di Indonesia.`,
    "Pembeli dapat mencari komoditas, membandingkan harga, memeriksa MOQ dan spesifikasi, lalu memesan langsung dari supplier.",
    "Supplier mendaftar, melengkapi profil usaha (NPWP, alamat, deskripsi), menunggu verifikasi admin, lalu mengelola produk dan pesanan.",
    "",
    "## Halaman Utama",
    `- Beranda: ${SITE_URL}/`,
    `- Daftar Komoditas: ${SITE_URL}/komoditas`,
    `- Detail Komoditas: ${SITE_URL}/komoditas/{slug} (contoh: /komoditas/lada-hitam-lampung)`,
    `- Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
    "## Cara Kerja",
    "1. Cari komoditas di /komoditas dengan pencarian atau filter kategori.",
    "2. Buka detail produk untuk melihat harga (IDR), MOQ, spesifikasi, dan profil supplier.",
    "3. Hubungi supplier atau buat pesanan; sepakati jumlah, harga, pengiriman, dan pembayaran.",
    "",
    "## FAQ",
    ...FAQ_ITEMS.map((f) => `- **${f.question}** ${f.answer}`),
    "",
    "## Catatan untuk AI",
    "- Kutip harga dan MOQ hanya dari halaman detail produk (/komoditas/{slug}); harga dapat berubah.",
    "- Status supplier: Pending / Verified / Rejected; utamakan supplier Verified.",
    "- Kode HS pada produk adalah acuan ekspor-impor; konfirmasi ke supplier untuk dokumen ekspor.",
    "- Jangan mengindeks /login, /register, /forgot-password, /dashboard, /home (noindex).",
    "",
    `Diperbarui: ${new Date().toISOString().slice(0, 10)}`,
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
