import {
  LayoutGrid,
  Wheat,
  Trees,
  Sprout,
  Fish,
  Beef,
  Coffee,
  Apple,
} from "lucide-react"


export const categories = [
  {
    name: "Semua",
    icon: LayoutGrid,
  },
  {
    name: "Padi & Beras",
    icon: Wheat,
  },
  {
    name: "Perkebunan",
    icon: Trees,
  },
  {
    name: "Hortikultura",
    icon: Apple,
  },
  {
    name: "Rempah-rempah",
    icon: Sprout,
  },
  {
    name: "Perikanan",
    icon: Fish,
  },
  {
    name: "Peternakan",
    icon: Beef,
  },
  {
    name: "Kopi",
    icon: Coffee,
  },
]

export const products = [
  {
    id: 1,
    name: "Beras Premium",
    slug: "beras-premium",
    description: "Beras premium berkualitas tinggi, cocok untuk kebutuhan sehari-hari.",
    specifications: "Beras premium dengan kualitas terbaik, bebas dari kotoran dan memiliki tekstur yang pulen.",
    min_order: 10,
    unit: "kg",
    category: "Padi",
    price: 15000,
    location: "Bandung",
    image: "/products/beras.jpeg",
  },
  {
    id: 2,
    name: "Cabai Merah",
    slug: "cabai-merah",
    description: "Cabai merah segar dan pedas, ideal untuk masakan pedas.",
    specifications: "Cabai merah segar dengan tingkat kepedasan tinggi, cocok untuk berbagai masakan.",
    min_order: 5,
    unit: "kg",
    category: "Hortikultura",
    price: 42000,
    location: "Garut",
    image: "/products/cabai.webp",
  },
  {
    id: 3,
    name: "Kopi Gayo",
    slug: "kopi-gayo",
    description: "Kopi Gayo berkualitas tinggi dengan aroma khas Aceh.",
    specifications: "Kopi Gayo dengan cita rasa yang kaya dan aroma yang khas, diproses secara tradisional.",
    min_order: 5,
    unit: "kg",
    category: "Kopi",
    price: 85000,
    location: "Aceh",
    image: "/products/kopi.jpg",
  },
  {
    id: 4,
    name: "Jahe Merah",
    slug: "jahe-merah",
    description: "Jahe merah segar, cocok untuk minuman herbal dan masakan.",
    specifications: "Jahe merah dengan kualitas terbaik, memiliki aroma dan rasa yang kuat.",
    min_order: 10,
    unit: "kg",
    hs_code: "0901.21",
    category: "Rempah",
    price: 28000,
    location: "Bogor",
    image: "/products/jahe.jpeg",
  },
]

export const commodityPrices = [
  {
    id: 1,
    name: "Cabai Merah",
    unit: "kg",
    price: 45000,
    change: 3.2,
    province: "Jawa Barat",
    image: "/products/cabai.webp",
  },
  {
    id: 2,
    name: "Beras Premium",
    unit: "kg",
    price: 14500,
    change: -1.4,
    province: "Jawa Tengah",
    image: "/products/beras.jpeg",
  },
  {
    id: 3,
    name: "Kopi Arabika",
    unit: "kg",
    price: 86000,
    change: 0.8,
    province: "Aceh",
    image: "/products/kopi.jpg",
  },
  {
    id: 4,
    name: "Jagung",
    unit: "kg",
    price: 8200,
    change: -0.6,
    province: "Lampung",
    image: "/products/jagung.jpg",
  },
]

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}