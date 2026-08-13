import Navbar from "@/components/navbar";
import AllCommoditySection from "@/components/section/all-commodity-section";

export default async function KomoditasPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const { search } = await searchParams

  return (
    <>
      <Navbar />
      <AllCommoditySection initialKeyword={search ?? ""} />
    </>
  )
}
