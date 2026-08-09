'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ContentSection() {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
          <div className="relative min-h-[520px] overflow-hidden rounded-3xl">
            <Image
              src="/img6.jpg"
              alt="Tentang Kami"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Icon */}
            <div className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-black">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="mb-3 text-4xl font-semibold">
                Tentang Kami
              </h3>

              <p className="max-w-xl leading-relaxed text-white/85">
                Bumi Nusa adalah jembatan yang menghubungkan dedikasi petani
                lokal dengan permintaan pasar global. Kami memastikan kualitas
                premium dari sumber daya alam Indonesia, dikelola dengan praktik
                berkelanjutan.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
           <div className="relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-3xl p-6">
  <Image
    src="/spices.jpg"
    alt="Rempah"
    fill
    className="object-cover"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

  <div className="relative z-10 flex items-start justify-between">
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm text-white">
      <svg
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="6" r="2.4" />
        <circle cx="17.2" cy="9.4" r="2.4" />
        <circle cx="17.2" cy="15.6" r="2.4" />
        <circle cx="12" cy="19" r="2.4" />
        <circle cx="6.8" cy="15.6" r="2.4" />
        <circle cx="6.8" cy="9.4" r="2.4" />
      </svg>
    </div>

    <span className="rounded-full bg-white/15 px-3 py-1 text-xs text-white backdrop-blur-sm">
      Unggulan
    </span>
  </div>

  <div className="relative z-10">
    <h4 className="mb-2 text-2xl font-semibold text-white">
      Rempah
    </h4>

    <p className="text-sm text-white/80">
      Kualitas ekspor terbaik
    </p>
  </div>
</div>

           <div className="relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-3xl p-6">
  <Image
    src="/img7.jpg"
    alt="Perkebunan"
    fill
    className="object-cover"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm text-white">
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 20A7 7 0 019.8 6.1C15.5 5 20 6.5 20 6.5s1.4 4.8-1.6 9.5A7 7 0 0111 20zM11 20c0-4 1.5-8 5-11"
      />
    </svg>
  </div>

  <div className="relative z-10">
    <h4 className="mb-2 text-2xl font-semibold text-white">
      Perkebunan
    </h4>

    <p className="text-sm text-white/80">
      Kopi, Teh, & Cokelat
    </p>
  </div>
</div>
          </div>
        </div>

        {/* Banner */}
        <div className="mt-5">
          <Link
            href="/produk"
            className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-3xl bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-600 px-8 py-8 transition-all duration-300 hover:from-amber-300 hover:to-yellow-700"
          >
            <div>
              <h4 className="mb-2 text-3xl font-bold text-neutral-900">
                Jelajahi Semua Kategori
              </h4>

              <p className="max-w-xl text-neutral-800/80">
                Temukan lebih dari 50+ jenis komoditas berkualitas tinggi dari
                seluruh pelosok Nusantara.
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white transition-transform duration-300 group-hover:translate-x-1">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}