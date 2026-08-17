import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import AllCommoditySection from "@/components/section/all-commodity-section";

export const metadata: Metadata = {
  title: "Daftar Komoditas Rempah-rempah",
  description:
    "Temukan berbagai komoditas rempah-rempah pilihan dari supplier terpercaya di BumiNusa. Cari dan bandingkan harga rempah dengan mudah.",
  alternates: {
    canonical: "/komoditas",
  },
};

export default async function KomoditasPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; categorySlug?: string }>
}) {
  const { search, categorySlug } = await searchParams

  return (
    <>
      <Navbar />
      <AllCommoditySection
        initialKeyword={search ?? ""}
        initialCategorySlug={categorySlug ?? null}
      />
    </>
  )
}