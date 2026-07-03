"use client";

import { useState } from "react";

interface ProductTabsProps {
  description: string;
  specifications: string;
}

export default function ProductTabs({
  description,
  specifications,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"description" | "specification">(
    "description",
  );

  return (
    <div className="mt-12">
      <div className="flex gap-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("description")}
          className={`pb-3 text-sm font-semibold transition ${
            activeTab === "description"
              ? "border-b-2 border-black text-black"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Deskripsi
        </button>

        <button
          onClick={() => setActiveTab("specification")}
          className={`pb-3 text-sm font-semibold transition ${
            activeTab === "specification"
              ? "border-b-2 border-black text-black"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          Spesifikasi
        </button>
      </div>

      <div className="py-6 text-sm leading-relaxed text-gray-600">
        {activeTab === "description" ? description : specifications}
      </div>
    </div>
  );
}
