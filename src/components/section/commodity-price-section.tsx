import { commodityPrices } from "@/data/dummy";
import CommodityPriceCard from "../commodity-price-card";

export default function CommodityPriceSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">

    <div className="mb-8 flex items-end justify-between">

      <div>

        <h2 className="text-3xl font-bold">
          Harga Komoditas Hari Ini
        </h2>

        <p className="mt-2 text-gray-500">
          Data diperbarui secara berkala dari berbagai daerah.
        </p>

      </div>

      <span className="hidden text-sm text-gray-500 md:block">
        Update terakhir • 09:45 WIB
      </span>

    </div>

    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

      {commodityPrices.map((commodity) => (
        <CommodityPriceCard
          key={commodity.id}
          {...commodity}
        />
      ))}

    </div>

  </div>
</section>
  )
}