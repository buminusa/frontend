import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

export const alt = `${SITE_NAME} — Platform Rempah-rempah Indonesia`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpengraphImage() {
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
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
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
          <div
            style={{
              fontSize: "44px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "0.02em",
            }}
          >
            {SITE_NAME}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
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
              display: "flex",
              fontSize: "84px",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#ffffff",
              maxWidth: "900px",
            }}
          >
            Rempah-rempah Pilihan
            <br />
            Langsung dari Indonesia
          </div>
          <div
            style={{
              fontSize: "34px",
              color: "#a7f3d0",
              maxWidth: "820px",
              lineHeight: 1.5,
            }}
          >
            {SITE_DESCRIPTION}
          </div>
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
          <span>Jual &amp; beli rempah dari supplier terpercaya</span>
          <span style={{ color: "#fbbf24", fontWeight: 600 }}>buminusa.id</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
