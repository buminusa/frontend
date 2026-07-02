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
    category: "Padi",
    price: 15000,
    location: "Bandung",
    image: "/products/beras.jpeg",
  },
  {
    id: 2,
    name: "Cabai Merah",
    category: "Hortikultura",
    price: 42000,
    location: "Garut",
    image: "/products/cabai.webp",
  },
  {
    id: 3,
    name: "Kopi Gayo",
    category: "Kopi",
    price: 85000,
    location: "Aceh",
    image: "/products/kopi.jpg",
  },
  {
    id: 4,
    name: "Jahe Merah",
    category: "Rempah",
    price: 28000,
    location: "Bogor",
    image: "/products/jahe.jpg",
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