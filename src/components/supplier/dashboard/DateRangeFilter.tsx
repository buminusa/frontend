"use client";

import { useLanguage } from "@/lib/langue/provider";

export type DateRange = "7" | "30" | "all";

const ranges: Array<{ value: DateRange; labelKey: string }> = [
  { value: "7", labelKey: "supplier.dashboard.range7" },
  { value: "30", labelKey: "supplier.dashboard.range30" },
  { value: "all", labelKey: "supplier.dashboard.rangeAll" },
];

export function DateRangeFilter({
  value,
  onChange,
}: {
  value: DateRange;
  onChange: (v: DateRange) => void;
}) {
  const { t } = useLanguage();
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1">
      {ranges.map((range) => {
        const active = value === range.value;
        return (
          <button
            key={range.value}
            type="button"
            onClick={() => onChange(range.value)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              active
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {t(range.labelKey)}
          </button>
        );
      })}
    </div>
  );
}
