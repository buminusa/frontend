import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Package } from "lucide-react";
import ProductTabs from "../section/product-tabs";

interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  specifications: string;
  min_order: number;
  unit: string;
  category: string;
  price: number;
  location: string;
  image: string;
}

interface CommodityDetailSectionProps {
  product: Product;
}

export default function CommodityDetailSection({
  product,
}: CommodityDetailSectionProps) {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-6xl px-4">
        <Link
          href="/komoditas"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
        >
          <ArrowLeft size={16} />
          Kembali ke Komoditas
        </Link>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <span className="mb-3 w-fit rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-500">
              {product.category}
            </span>

            <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>

            <div className="mb-6 space-y-2 border-y border-gray-200 py-5 text-sm">
              <div className="flex items-center gap-2">
                <Package size={15} className="text-gray-400" />
                <span className="text-gray-500">Min. Order</span>
                <span className="font-semibold">
                  {product.min_order} {product.unit}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-gray-400" />
                <span className="text-gray-500">Lokasi</span>
                <span className="font-semibold">{product.location}</span>
              </div>
            </div>

            <div className="mb-6 text-3xl font-bold text-[#1A3A1B]">
              Rp {product.price.toLocaleString("id-ID")}
              <span className="text-base font-semibold text-gray-500">
                /{product.unit}
              </span>
            </div>

            <button className="w-full rounded-full bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-800 md:w-fit md:px-10">
              Kirim Permintaan
            </button>
          </div>
        </div>

        <ProductTabs
          description={product.description}
          specifications={product.specifications}
        />
      </div>
    </section>
  );
}
