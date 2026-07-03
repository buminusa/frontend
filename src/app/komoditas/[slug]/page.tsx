import { notFound } from "next/navigation"

import { getProductBySlug } from "../../../data/dummy"
import CommodityDetailSection from "../../../components/section/commodity-detail-section"
import OtherCommoditiesSection from "../../../components/section/other-commodities-section"
import Navbar from "../../../components/navbar"

interface KomoditasDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function KomoditasDetailPage({
  params,
}: KomoditasDetailPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <CommodityDetailSection product={product} />
      <OtherCommoditiesSection currentSlug={slug} />
    </>
  )
}