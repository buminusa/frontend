import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Halaman privat yang tidak boleh terindeks mesin pencari
const PRIVATE_PATHS = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/home",
  "/profile",
  "/keranjang",
  "/dashboard",
];

const SECURITY_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "X-DNS-Prefetch-Control": "on",
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPrivatePath = PRIVATE_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  const response = NextResponse.next();

  // HSTS hanya di production agar tidak merusak HTTP di localhost saat development
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );
  }

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }

  if (isPrivatePath) {
    // Lapisan kedua pelindung index, melengkapi robots.txt
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Jangan jalankan proxy untuk:
     * - api (proxy ke backend)
     * - _next/static & _next/image (aset Next.js)
     * - favicon.ico, icon.png, sitemap.xml, robots.txt, opengraph-image (file SEO)
     * - file statis di public/ (gambar, dll)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|logo.png|sitemap.xml|robots.txt|opengraph-image|.*\\.(?:png|webp|jpg|jpeg|svg|gif|ico)$).*)",
  ],
};
