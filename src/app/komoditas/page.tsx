import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import AllCommoditySection from "@/components/section/all-commodity-section";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Daftar Komoditas Rempah-rempah",
  description:
    "Temukan berbagai komoditas rempah-rempah pilihan dari supplier terpercaya di BumiNusa. Cari dan bandingkan harga rempah dengan mudah.",
  keywords: ["komoditas rempah", "daftar rempah Indonesia", "harga rempah", "supplier rempah"],
  openGraph: {
    type: "website",
    url: `${SITE_URL}/komoditas`,
    title: `Daftar Komoditas — ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Daftar Komoditas — ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: "/komoditas",
    languages: { "id-ID": "/komoditas", "x-default": "/komoditas" },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Komoditas", item: `${SITE_URL}/komoditas` },
  ],
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Daftar Komoditas Rempah-rempah — BumiNusa.id",
  description: "Temukan berbagai komoditas rempah-rempah pilihan dari supplier terpercaya di BumiNusa.",
  inLanguage: "id-ID",
  url: `${SITE_URL}/komoditas`,
  isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
};

export default async function KomoditasPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; categorySlug?: string }>
}) {
  const { search, categorySlug } = await searchParams

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <Navbar />
      <AllCommoditySection
        initialKeyword={search ?? ""}
        initialCategorySlug={categorySlug ?? null}
      />
    </>
  )
}
