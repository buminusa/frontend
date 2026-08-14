import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
        "/home",
        "/profile",
        "/keranjang",
        "/dashboard",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
