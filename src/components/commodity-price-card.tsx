import Image from "next/image"
import { MapPin, TrendingUp, TrendingDown } from "lucide-react"

interface CommodityPriceCardProps {
  name: string
  image: string
  province: string
  price: number
  unit: string
  change: number
}

export default function CommodityPriceCard({
  name,
  image,
  province,
  price,
  unit,
  change,
}: CommodityPriceCardProps) {
  const isUp = change >= 0

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md">

      <div className="flex items-center gap-3">

        <Image
          src={image}
          alt={name}
          width={52}
          height={52}
          className="rounded-lg object-cover"
        />

        <div className="flex-1">

          <h3 className="font-semibold">
            {name}
          </h3>

          <div className="mt-1 text-md font-semibold text-green-600">
            Rp {price.toLocaleString("id-ID")}
            <span className="text-sm font-semibold text-gray-500">
               /{unit}
            </span>
          </div>

        </div>

      </div>

      <div className="mt-4 flex items-center justify-between">

        <div className="flex items-center gap-1 text-sm text-gray-500">
          <MapPin size={14} />
          {province}
        </div>

        <div
          className={`flex items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold ${
            isUp
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {isUp ? (
            <TrendingUp size={14} />
          ) : (
            <TrendingDown size={14} />
          )}

          {Math.abs(change)}%
        </div>

      </div>

    </div>
  )
}