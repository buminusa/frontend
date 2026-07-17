"use client"

import { ReactNode } from "react"
import { Sidebar } from "./Sidebar"
import  Navbar from "@/components/navbar"

interface LayoutProps {
  children: ReactNode
}

export function SupplierLayout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}