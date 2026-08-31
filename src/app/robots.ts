import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const DISALLOW = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/home",
  "/profile",
  "/keranjang",
  "/dashboard",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "OAI-SearchBot", "PerplexityBot", "Google-Extended", "CCBot", "ClaudeBot", "anthropic-ai", "Cohere-ai"],
        allow: ["/", "/komoditas", "/komoditas/*", "/llms.txt", "/sitemap.xml", "/opengraph-image"],
        disallow: DISALLOW,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
