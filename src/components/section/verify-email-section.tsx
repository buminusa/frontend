"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { BadgeCheck, AlertCircle, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { verifyEmailUser } from "@/lib/auth"
import AuthShell from "./auth-shell"
import { getErrorMessage } from "@/lib/api/errors"

type VerifyState = "loading" | "success" | "error"

export default function VerifyEmailSection({
  token,
}: {
  token: string | null
}) {
  const [state, setState] = useState<VerifyState>(token ? "loading" : "error")
  const [message, setMessage] = useState<string | null>(
    token ? null : "Token verifikasi tidak ditemukan"
  )

  useEffect(() => {
    if (!token) return

    let isMounted = true

    const verify = async () => {
      try {
        const response = await verifyEmailUser(token)
        if (!isMounted) return
        setMessage(response.message)
        setState("success")
      } catch (error) {
        if (!isMounted) return
        setMessage(getErrorMessage(error, "Gagal memverifikasi email"))
        setState("error")
      }
    }

    verify()

    return () => {
      isMounted = false
    }
  }, [token])

  const renderContent = () => {
    if (state === "loading") {
      return (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex flex-col items-center gap-3 rounded-lg bg-green-50 px-3 py-6 text-center"
        >
          <Loader2 className="h-8 w-8 animate-spin text-green-600" strokeWidth={2} />
          <p className="text-sm text-green-700">Memverifikasi email Anda...</p>
        </motion.div>
      )
    }

    const isSuccess = state === "success"

    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="space-y-5"
      >
        <div
          className={
            isSuccess
              ? "flex flex-col items-center gap-3 rounded-lg bg-green-50 px-3 py-6 text-center"
              : "flex flex-col items-center gap-3 rounded-lg bg-red-50 px-3 py-6 text-center"
          }
        >
          {isSuccess ? (
            <BadgeCheck className="h-9 w-9 text-green-600" strokeWidth={2} />
          ) : (
            <AlertCircle className="h-9 w-9 text-red-500" strokeWidth={2} />
          )}
          <p className={isSuccess ? "text-sm text-green-700" : "text-sm text-red-600"}>
            {message}
          </p>
          {!isSuccess ? (
            <p className="text-xs text-gray-500">
              Buka link verifikasi dari email yang dikirim saat pendaftaran, lalu coba kembali.
            </p>
          ) : null}
        </div>

        {isSuccess ? (
          <Link
            href="/login"
            className="block w-full h-11 rounded-full bg-green-600 font-semibold text-white text-center leading-[2.75rem] transition shadow-md shadow-green-600/20 hover:-translate-y-px hover:shadow-lg hover:shadow-green-600/30"
          >
            Masuk ke Akun
          </Link>
        ) : (
          <div className="flex gap-3">
            <Link
              href="/login"
              className="flex-1 h-11 rounded-full bg-green-600 font-semibold text-white text-center leading-[2.75rem] transition shadow-md shadow-green-600/20 hover:-translate-y-px hover:shadow-lg hover:shadow-green-600/30"
            >
              Halaman Login
            </Link>
            <Link
              href="/register"
              className="flex-1 h-11 rounded-full border border-green-600 font-semibold text-green-600 text-center leading-[2.75rem] transition hover:-translate-y-px hover:bg-green-50"
            >
              Daftar Akun
            </Link>
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <AuthShell
      eyebrow="Verifikasi akun"
      title="Verifikasi Email"
      subtitle="Konfirmasikan alamat email Anda untuk mengaktifkan akun BumiNusa.id"
      quote="Email terverifikasi memastikan setiap transaksi aman dan terpercaya bagi semua mitra bisnis."
      footerLink={
        <>
          Sudah terverifikasi?{" "}
          <Link href="/login" className="font-semibold text-green-600 underline hover:text-green-700">
            Masuk di sini
          </Link>
        </>
      }
    >
      {renderContent()}
    </AuthShell>
  )
}
