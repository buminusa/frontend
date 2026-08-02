import Image from "next/image"
import Link from "next/link"
import { MapPin } from "lucide-react"

interface Props {
  slug: string
  name: string
  image: string
  category: string
  location: string
}

export default function ProductCard({
  slug,
  name,
  image,
  category,
  location,
}: Props) {
  return (
    <Link
      href={`/komoditas/${slug}`}
      className="block overflow-hidden rounded-lg border border-gray-200 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={image}
          alt={name}
          fill
          unoptimized={image.startsWith("http")}
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="space-y-2 p-3">

  <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-medium text-green-700">
    {category}
  </span>

  <h3 className="line-clamp-2 text-sm font-semibold leading-5">
    {name}
  </h3>

  <div className="flex items-center gap-1 text-xs text-gray-500">
    <MapPin size={13} />
    <span className="truncate">{location}</span>
  </div>

</div>
    </Link>
  )
}
