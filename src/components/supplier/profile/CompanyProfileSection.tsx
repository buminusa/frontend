"use client"

import { useEffect, useState } from "react"

import { CompanyHeader } from "@/components/supplier/profile/CompanyHeader"
import { CompanyInfo } from "@/components/supplier/profile/CompanyInfo"
import { CompanyForm } from "@/components/supplier/profile/CompanyForm"
import { BusinessDescription } from "@/components/supplier/profile/BusinessDescription"
import { VerificationStatus } from "@/components/supplier/profile/VerificationStatus"

import {
  AUTH_EVENT_NAME,
  getAuthToken,
  getUserFromToken,
} from "@/lib/auth"

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080"
).replace(/\/$/, "")

type ApiCompanyProfile = {
  id: number
  company_name: string
  slug: string
  npwp: string
  address: string
  province: string
  country: string
  phone: string
  logo_url: string | null
  business_description: string

  user: {
    id: number
    email: string

    role: {
      id: number
      name_role: string
    }
  }

  products: {
    id: number
    nama: string
    slug: string
    status: string
    createdAt: string
  }[]
}

type CompanyProfile = {
  id: number
  company_name: string
  slug: string
  npwp: string
  address: string
  province: string
  country: string
  phone: string
  logo_url?: string
  business_description: string

  email: string

  products: {
    id: number
    nama: string
    slug: string
    status: string
    createdAt: string
  }[]

  verificationStatus?: string
}

export function CompanyProfileSection() {
  const [company, setCompany] = useState<CompanyProfile | null>(null)

  const [isEditing, setIsEditing] = useState(false)

  const [isLoading, setIsLoading] = useState(true)

  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()

    async function loadCompanyProfile() {
      const token = getAuthToken()
      const user = getUserFromToken()

      if (!token || !user) {
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError("")

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/company-profile/${user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          }
        )

        const result = await response.json()

        if (!response.ok) {
          throw new Error(
            result.message || "Gagal memuat profil perusahaan."
          )
        }

        const data: ApiCompanyProfile = result.data

        setCompany({
          id: data.id,
          company_name: data.company_name,
          slug: data.slug,
          npwp: data.npwp,
          address: data.address,
          province: data.province,
          country: data.country,
          phone: data.phone,
          logo_url: data.logo_url ?? "",
          business_description: data.business_description,

          email: data.user.email,

          products: data.products,

          // backend belum menyediakan field ini
          verificationStatus: undefined,
        })
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setError(
            error instanceof Error
              ? error.message
              : "Gagal memuat profil perusahaan."
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadCompanyProfile()

    window.addEventListener(
      AUTH_EVENT_NAME,
      loadCompanyProfile
    )

    return () => {
      controller.abort()

      window.removeEventListener(
        AUTH_EVENT_NAME,
        loadCompanyProfile
      )
    }
  }, [])

  const handleUpdateCompany = (
    data: Partial<CompanyProfile>
  ) => {
    setCompany((prev) =>
      prev ? { ...prev, ...data } : prev
    )

    setIsEditing(false)
  }

  if (isLoading) {
    return (
      <p className="text-sm text-gray-500">
        Memuat profil perusahaan...
      </p>
    )
  }

  if (error) {
    return (
      <p className="text-sm text-red-600">
        {error}
      </p>
    )
  }

  if (!company) {
    return (
      <p className="text-sm text-gray-500">
        Profil perusahaan tidak ditemukan.
      </p>
    )
  }

  return (
    <div className="space-y-6">
      <CompanyHeader
        companyName={company.company_name}
        isEditing={isEditing}
        onToggleEdit={() =>
          setIsEditing(!isEditing)
        }
        verificationStatus={
          company.verificationStatus
        }
      />

      <VerificationStatus
        status={company.verificationStatus}
      />

      {isEditing ? (
        <CompanyForm
          company={company}
          onSubmit={handleUpdateCompany}
          onCancel={() =>
            setIsEditing(false)
          }
        />
      ) : (
        <>
          <CompanyInfo company={company} />

          <BusinessDescription
            description={
              company.business_description
            }
          />
        </>
      )}
    </div>
  )
}