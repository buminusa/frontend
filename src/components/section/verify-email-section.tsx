"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { BadgeCheck, AlertCircle, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { verifyEmailUser } from "@/lib/auth"
import AuthShell from "./auth-shell"
import { getErrorMessage } from "@/lib/api/errors"
import { useLanguage } from "@/lib/langue/provider"

type VerifyState = "loading" | "success" | "error"

export default function VerifyEmailSection({
  token,
}: {
  token: string | null
}) {
  const { t } = useLanguage()
  const [state, setState] = useState<VerifyState>(token ? "loading" : "error")
  const [message, setMessage] = useState<string | null>(
    token ? null : t("auth.verify.tokenMissing")
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
        setMessage(getErrorMessage(error, t("auth.verify.failed")))
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
          <p className="text-sm text-green-700">{t("auth.verify.loading")}</p>
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
              {t("auth.verify.retryHint")}
            </p>
          ) : null}
        </div>

        {isSuccess ? (
          <Link
            href="/login"
            className="block w-full h-11 rounded-full bg-green-600 font-semibold text-white text-center leading-[2.75rem] transition shadow-md shadow-green-600/20 hover:-translate-y-px hover:shadow-lg hover:shadow-green-600/30"
          >
            {t("auth.verify.signIn")}
          </Link>
        ) : (
          <div className="flex gap-3">
            <Link
              href="/login"
              className="flex-1 h-11 rounded-full bg-green-600 font-semibold text-white text-center leading-[2.75rem] transition shadow-md shadow-green-600/20 hover:-translate-y-px hover:shadow-lg hover:shadow-green-600/30"
            >
              {t("auth.verify.loginPage")}
            </Link>
            <Link
              href="/register"
              className="flex-1 h-11 rounded-full border border-green-600 font-semibold text-green-600 text-center leading-[2.75rem] transition hover:-translate-y-px hover:bg-green-50"
            >
              {t("auth.verify.register")}
            </Link>
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <AuthShell
      eyebrow={t("auth.verify.eyebrow")}
      title={t("auth.verify.title")}
      subtitle={t("auth.verify.subtitle")}
      quote={t("auth.verify.quote")}
      footerLink={
        <>
          {t("auth.verify.alreadyVerified")}{" "}
          <Link href="/login" className="font-semibold text-green-600 underline hover:text-green-700">
            {t("auth.verify.signInHere")}
          </Link>
        </>
      }
    >
      {renderContent()}
    </AuthShell>
  )
}
