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
  searchParams: Promise<{ search?: string; categoryId?: string }>
}) {
  const { search, categoryId } = await searchParams
  const parsedCategoryId = Number(categoryId)

  return (
    <>
      <Navbar />
      <AllCommoditySection
        initialKeyword={search ?? ""}
        initialCategoryId={Number.isInteger(parsedCategoryId) && parsedCategoryId > 0 ? parsedCategoryId : null}
      />
    </>
  )
}
