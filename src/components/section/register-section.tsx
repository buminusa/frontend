"use client"

import { useState } from "react"
import Link from "next/link"

import RoleSelector from "./register/role-selector"
import BuyerFields from "./register/buyer-fields"
import CompanyFields from "./register/company-fields"
import { registerBuyerUser, registerCompanyUser } from "@/lib/auth"

export default function RegisterSection() {
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
      } else {
        const response = await registerCompanyUser({
          ...account,
          ...companyData,
        })
        setMessage(response.message)
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Registration failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-14">
      <div className="mx-auto max-w-xl px-4">

        <h1 className="mb-2 text-3xl font-bold">
          Daftar Akun
        </h1>

        <p className="mb-8 text-sm text-gray-500">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-semibold text-green-600 underline">
            Masuk di sini
          </Link>
        </p>

        <RoleSelector role={role} onChange={setRole} />

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="space-y-4">

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                value={account.email}
                onChange={(e) => handleAccountChange("email", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black"
                placeholder="nama@email.com"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                value={account.password}
                onChange={(e) =>
                  handleAccountChange("password", e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black"
                placeholder="Minimal 8 karakter"
              />
            </div>

          </div>

          <div className="border-t border-gray-200 pt-6">
            {role === "buyer" ? (
              <BuyerFields formData={buyerData} onChange={handleBuyerChange} />
            ) : (
              <CompanyFields
                formData={companyData}
                onChange={handleCompanyChange}
                onFileChange={handleCompanyFileChange}
              />
            )}
          </div>

          {message ? (
            <p className="text-sm text-gray-600">{message}</p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-green-600 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-400"
          >
            {isSubmitting ? "Memproses..." : "Daftar"}
          </button>

        </form>

      </div>
    </section>
  )
}