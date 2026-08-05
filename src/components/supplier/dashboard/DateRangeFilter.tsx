"use client";

export type DateRange = "7" | "30" | "all";

const ranges: Array<{ value: DateRange; label: string }> = [
  { value: "7", label: "7 Hari" },
  { value: "30", label: "30 Hari" },
  { value: "all", label: "Semua" },
];

export function DateRangeFilter({
  value,
  onChange,
}: {
  value: DateRange;
  onChange: (v: DateRange) => void;
}) {
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
            {range.label}
          </button>
        );
      })}
    </div>
  );
}
