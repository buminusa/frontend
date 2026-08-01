"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Lock } from "lucide-react"
import { motion } from "framer-motion"
import { registerBuyerUser, registerCompanyUser } from "@/lib/auth"
import RoleSelector from "./register/role-selector"
import BuyerFields from "./register/buyer-fields"
import CompanyFields from "./register/company-fields"
import AuthShell from "./auth-shell"
import AuthField from "./auth-field"

export default function RegisterSection() {
  const router = useRouter()
  const [role, setRole] = useState<"buyer" | "supplier">("buyer")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const [account, setAccount] = useState({
    email: "",
    password: "",
  })

  const [buyerData, setBuyerData] = useState({
    full_name: "",
    address: "",
    province: "",
    country: "",
    phone: "",
  })

  const [companyData, setCompanyData] = useState({
    company_name: "",
    npwp_file: null as File | null,
    logo: null as File | null,
    address: "",
    province: "",
    country: "",
    phone: "",
    business_description: "",
  })

  const handleAccountChange = (field: string, value: string) => {
    setAccount((prev) => ({ ...prev, [field]: value }))
  }

  const handleBuyerChange = (field: string, value: string) => {
    setBuyerData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCompanyChange = (field: string, value: string) => {
    setCompanyData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCompanyFileChange = (field: string, file: File | null) => {
    setCompanyData((prev) => ({ ...prev, [field]: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      if (role === "buyer") {
        const response = await registerBuyerUser({
          ...account,
          ...buyerData,
        })
        setMessage(response.message)
        router.push("/login")
      } else {
        const response = await registerCompanyUser({
          ...account,
          ...companyData,
        })
        setMessage(response.message)
        router.push("/login")
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Registrasi gagal")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthShell
      eyebrow="Bergabung dengan Bumi Nusa"
      title="Daftar Akun"
      subtitle="Pilih peran Anda dan lengkapi data untuk memulai bertransaksi"
      quote="Platform agregator komoditas pertama yang menghubungkan petani Indonesia ke pasar global tanpa perantara."
      footerLink={
        <>
          Sudah punya akun?{" "}
          <Link href="/login" className="font-semibold text-green-600 underline hover:text-green-700">
            Masuk di sini
          </Link>
        </>
      }
    >
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <RoleSelector role={role} onChange={setRole} />
        </motion.div>

        <div className="space-y-5">
          <AuthField
            label="Email"
            value={account.email}
            onChange={(v) => handleAccountChange("email", v)}
            placeholder="nama@email.com"
            type="email"
            icon={Mail}
          />

          <AuthField
            label="Password"
            value={account.password}
            onChange={(v) => handleAccountChange("password", v)}
            placeholder="Minimal 8 karakter"
            type="password"
            icon={Lock}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Detail {role === "buyer" ? "Pembeli" : "Supplier"}
          </p>
          {role === "buyer" ? (
            <BuyerFields formData={buyerData} onChange={handleBuyerChange} />
          ) : (
            <CompanyFields
              formData={companyData}
              onChange={handleCompanyChange}
              onFileChange={handleCompanyFileChange}
            />
          )}
        </motion.div>

        {message ? (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2"
          >
            {message}
          </motion.p>
        ) : null}

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileTap={{ scale: 0.98 }}
          className="w-full h-11 rounded-full bg-green-600 font-semibold text-white transition shadow-md shadow-green-600/20 hover:-translate-y-px hover:shadow-lg hover:shadow-green-600/30 disabled:cursor-not-allowed disabled:bg-green-400 disabled:shadow-none disabled:transform-none"
        >
          {isSubmitting ? "Memproses..." : "Daftar"}
        </motion.button>
      </motion.form>
    </AuthShell>
  )
}