"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard-section/sidebar";
import { Topbar } from "@/components/dashboard-section/top-bar";

interface DashboardLayoutProps {
  basePath: string;
  roleLabel: string;
  children: React.ReactNode;
  mainClassName?: string;
}

export function DashboardLayout({
  basePath,
  roleLabel,
  children,
  mainClassName = "p-6",
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar
        basePath={basePath}
        roleLabel={roleLabel}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="lg:ml-[264px] min-w-0">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className={mainClassName}>{children}</main>
      </div>
    </div>
  );
}