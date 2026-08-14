"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Versi khusus hero: lebar maksimal 1920px dan telah dikompresi agar tidak
// mengunduh foto asli berukuran 3.600–5.184px.
const images = ["/hero-1.webp", "/hero-2.webp", "/hero-3.webp", "/hero-4.webp"];

export default function HeroV2() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(nextSlide, 3000);

    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <div
      className="relative h-screen h-[100dvh] w-full overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Hanya slide aktif yang dirender agar tiga gambar lain tidak ikut diunduh. */}
      <Image
        key={images[currentIndex]}
        src={images[currentIndex]}
        alt={`Latar hero ${currentIndex + 1}`}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        quality={65}
      />

      <div className="absolute inset-0 z-10 bg-black/50" />
      <div className="absolute inset-0 z-20 flex items-center justify-center px-4 text-center sm:px-6">
        <div className="flex w-full max-w-3xl flex-col items-center space-y-6 text-white">
          {/* Title */}
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Menghubungkan
            <br />
            <span className="text-green-600">Hasil Bumi Indonesia</span>
            <br />
            ke Dunia
          </h1>

          <p className="max-w-xl text-base text-white/80 md:text-lg">
            Platform Agregator Komoditas Terpercaya.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-full bg-green-600 px-8 text-base font-semibold text-black shadow-lg transition-all duration-300 hover:bg-green-500 hover:scale-105 hover:shadow-amber-400/30"
            >
              <Link href="/register">Jelajahi Produk</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 rounded-full border-white/40 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-white hover:text-white"
            >
              <Link href="/#cara-kerja">Pelajari Lebih Lanjut</Link>
            </Button>
          </div>
          <div className="flex items-center justify-center gap-10 pt-8">
            {[
              {
                value: "50+",
                label: "JENIS KOMODITAS",
              },
              {
                value: "1000+",
                label: "PETANI MITRA",
              },
              {
                value: "24",
                label: "PROVINSI",
              },
            ].map((stat, idx) => (
              <React.Fragment key={idx}>
                {idx !== 0 && <div className="h-12 w-px bg-white/20" />}

                <div className="text-center">
                  <h3 className="text-3xl font-bold text-green-600">
                    {stat.value}
                  </h3>

                  <p className="mt-1 text-xs tracking-wide text-white/70">
                    {stat.label}
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
