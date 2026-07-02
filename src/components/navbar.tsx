"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Search,
  Smartphone,
  ChevronDown,
  ShoppingCart,
  Menu,
  FlagIcon,
  Flag
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion";


import { useState } from "react"
import { Button } from "./ui/button";

const categories = [
  "Rempah-rempah",
  "Hasil Bumi",
  "Perkebunan",
  "Hortikultura",
  "Perikanan",
  "Peternakan",
  "Kopi",
  "Kakao",
  "Jagung",
  "Padi"
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [showCategory, setShowCategory] = useState(false)
    const [activeCategory, setActiveCategory] = useState(categories[0])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">

      {/* ================= TOP BAR ================= */}
      <div className="hidden md:block h-9 bg-yellow-400 border-b border-gray-200">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">

          <div className="flex items-center gap-2 text-sm">
            <Flag className="h-4 w-4 text-gray-600" />

            <span className="font-semibold">
              ID
            </span>

            <ChevronDown className="h-4 w-4 -rotate-90" />
          </div>

          <div className="hidden items-center gap-8 text-sm text-gray-600 lg:flex">
            <Link href="#">Tentang Bumi Nusa</Link>
            <Link href="#">Mulai Berjualan</Link>
            <Link href="#">Bantuan</Link>
          </div>

        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}
      <div className="h-14">
       <div className="mx-auto flex h-full max-w-7xl items-center gap-3 px-4 md:px-6">

          {/* Logo */}
          <Link
            href="/home"
            className="flex shrink-0 items-center gap-3"
          >
            <Image
            src="/logo.png"
            alt="BUMI NUSA"
            width={50}
            height={50}
            />

            <span className="hidden sm:block text-2xl font-bold text-[#1A3A1B]">
            BUMI NUSA
            </span>
          </Link>

          {/* Kategori */}
         <div
  className="relative hidden lg:block"
  onMouseEnter={() => setShowCategory(true)}
  onMouseLeave={() => setShowCategory(false)}
  onClick={() => setShowCategory(!showCategory)}
>
  <button className="rounded-lg px-4 py-2 text-[15px] transition hover:bg-gray-100"
  >
    Komoditas
  </button>
</div>

          {/* Search */}
          <div className="flex-1 min-w-0">
            <div className="relative">

              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type="text"
                placeholder="Cari komoditas..."
                className={"h-10 w-full rounded-xl border border-gray-300 pl-10 pr-3 text-sm outline-none focus:border-green-600"}
                />

            </div>
          </div>

          

          {/* Cart */}
          <button className="rounded-lg p-2 hover:bg-gray-100">
            <ShoppingCart size={20} />
            </button>

            <button className="hidden md:block rounded-lg px-4 py-2 text-[15px] font-semibold transition hover:bg-gray-100">
            Pilih Daerahmu <ChevronDown className="ml-1 inline-block" size={16} />
          </button>

          <div className="h-8 w-px bg-gray-300" />

          <div className="hidden md:flex items-center gap-3">
            <Link
                href="/login"
                className="rounded-lg border border-green-600 px-6 py-2 font-semibold text-green-600 hover:bg-green-50"
            >
                Masuk
            </Link>

            <Link
                href="/register"
                className="rounded-lg bg-green-600 px-6 py-2 font-semibold text-white hover:bg-green-700"
            >
                Daftar
            </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
            >
            <Menu size={22} />
            </button>

            {/* ================= MOBILE MENU ================= */}
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: -15 }} // Posisi awal agak di atas dan transparan
      animate={{ opacity: 1, y: 0 }}   // Animasi turun dan memadat
      exit={{ opacity: 0, y: -15 }}    // Animasi naik kembali saat ditutup
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute left-0 right-0 top-full border-b border-gray-100 bg-white shadow-lg md:hidden z-50"
    >
      <div className="flex flex-col space-y-2 px-4 py-4">
        
        {/* Menu Links */}
        <Link
          href="/komoditas"
          onClick={() => setIsOpen(false)}
          className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors"
        >
          Komoditas
        </Link>

        <button
          onClick={() => setIsOpen(false)}
          className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors"
        >
          Pilih Daerahmu <ChevronDown className="ml-1 inline-block" size={16} />
        </button>

        {/* Divider */}
        <div className="h-px bg-gray-100 my-1" />

        {/* Action Buttons */}
        <div className="flex flex-col pt-1 space-y-2">
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="rounded-xl border border-green-600 px-4 py-2.5 text-center text-sm font-semibold text-green-600 hover:bg-green-50 active:bg-green-100 transition-colors"
          >
            Masuk
          </Link>

          <Link
            href="/register"
            onClick={() => setIsOpen(false)}
            className="rounded-xl bg-green-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm shadow-green-200 hover:bg-green-700 active:bg-green-800 transition-all"
          >
            Daftar
          </Link>
        </div>

      </div>
    </motion.div>
  )}
</AnimatePresence>

        </div>
      </div>


      <AnimatePresence>
  {showCategory && (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.15 }}
      onMouseEnter={() => setShowCategory(true)}
      onMouseLeave={() => setShowCategory(false)}
      className="
        absolute
        left-0
        right-0
        top-full
        z-50
        border-t
        border-gray-200
        bg-white
        shadow-xl
      "
    >
      <div className="mx-auto flex max-w-7xl">

        {/* Sidebar */}
        <div className="w-72 border-r border-gray-200 py-5">

          {categories.map((category) => (
  <button
    key={category}
    onMouseEnter={() => setActiveCategory(category)}
    className={`
      block
      w-full
      px-6
      py-3
      text-left
      text-sm
      transition

      ${
        activeCategory === category
          ? "bg-gray-100 font-semibold"
          : "hover:bg-gray-50"
      }
    `}
  >
    {category}
  </button>
))}

        </div>

        {/* Content */}

        <div className="flex-1 p-8">

          <h2 className="text-3xl font-bold">
            {activeCategory}
          </h2>

          <p className="mt-3 text-gray-500">
            Berbagai komoditas rempah berkualitas dari seluruh Indonesia.
          </p>

        </div>

      </div>
    </motion.div>
  )}
</AnimatePresence>
    </header>
  )
}