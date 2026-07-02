import Image from "next/image"
import { MapPin } from "lucide-react"

interface Props {
  name: string
  image: string
  price: number
  location: string
}

export default function ProductCard({
  name,
  image,
  price,
  location,
}: Props) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-md">

      {/* Image */}
      <div className="relative aspect-[4/3]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="space-y-1.5 p-3">

        <h3 className="line-clamp-2 text-sm font-medium leading-5">
          {name}
        </h3>

        <p className="text-base font-bold text-[#1A3A1B]">
          Rp {price.toLocaleString("id-ID")}
        </p>

        <div className="flex items-center gap-1 text-xs text-gray-500">
          <MapPin size={13} />
          <span className="truncate">{location}</span>
        </div>

      </div>
    </div>
  )
}