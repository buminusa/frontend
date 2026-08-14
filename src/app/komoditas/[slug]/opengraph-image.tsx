import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";
import { productService } from "@/lib/api/services";
import { formatIdNumber } from "@/lib/format";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let nama = "Komoditas Bumi Nusa";
  let priceLabel = "";
  let category = "";
  try {
    const res = await productService.getBySlug(slug);
    const product = res.data;
    if (product) {
      nama = product.nama;
      priceLabel = `Rp ${formatIdNumber(product.price_min)} - Rp ${formatIdNumber(product.price_max)} / ${product.unit ?? "unit"}`;
      category = product.category?.name_categories ?? "";
    }
  } catch {
    // Fallback ke teks default bila produk tidak ditemukan
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #07130e 0%, #0d2a1c 55%, #1a3a26 100%)",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                fontWeight: 700,
                color: "#07130e",
              }}
            >
              BN
            </div>
            <div style={{ fontSize: "40px", fontWeight: 700, color: "#ffffff" }}>
              {SITE_NAME}
            </div>
          </div>
          {category ? (
            <div
              style={{
                fontSize: "28px",
                color: "#a7f3d0",
                border: "2px solid #34d399",
                borderRadius: "9999px",
                padding: "10px 28px",
              }}
            >
              {category}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          <div
            style={{
              width: "96px",
              height: "8px",
              borderRadius: "9999px",
              background: "#f59e0b",
            }}
          />
          <div
            style={{
              fontSize: "76px",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#ffffff",
              maxWidth: "1000px",
            }}
          >
            {nama}
          </div>
          {priceLabel ? (
            <div
              style={{
                display: "inline-flex",
                fontSize: "40px",
                fontWeight: 700,
                color: "#fbbf24",
                background: "rgba(245, 158, 11, 0.12)",
                border: "2px solid rgba(251, 191, 36, 0.5)",
                borderRadius: "16px",
                padding: "16px 32px",
                alignSelf: "flex-start",
              }}
            >
              {priceLabel}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#d1fae5",
            fontSize: "26px",
          }}
        >
          <span>Rempah-rempah pilihan langsung dari Indonesia</span>
          <span style={{ color: "#fbbf24", fontWeight: 600 }}>buminusa.id</span>
        </div>
      </div>
    ),
    { ...size }
  );
}