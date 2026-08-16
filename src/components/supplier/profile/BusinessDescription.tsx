"use client";

import { FileText } from "lucide-react";
import { useLanguage } from "@/lib/langue/provider";

interface BusinessDescriptionProps {
  description: string;
}

export function BusinessDescription({ description }: BusinessDescriptionProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900">
          {t("supplier.profile.businessDescription")}
        </h2>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-700 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}