import type { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: { default: "Dashboard — BumiNusa.id", template: `%s | Dashboard` },
  robots: { index: false, follow: false, noarchive: true },
};

export default function DashboardLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
