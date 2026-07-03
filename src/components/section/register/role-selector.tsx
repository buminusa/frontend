interface RoleSelectorProps {
  role: "buyer" | "supplier"
  onChange: (role: "buyer" | "supplier") => void
}

export default function RoleSelector({
  role,
  onChange,
}: RoleSelectorProps) {
  return (
    <div className="mb-8 grid grid-cols-2 gap-3">

      <button
        type="button"
        onClick={() => onChange("buyer")}
        className={`rounded-lg border px-4 py-3 text-sm font-semibold transition ${
          role === "buyer"
            ? "border-black bg-black text-white"
            : "border-gray-300 text-gray-500 hover:border-gray-400"
        }`}
      >
        Saya Pembeli
      </button>

      <button
        type="button"
        onClick={() => onChange("supplier")}
        className={`rounded-lg border px-4 py-3 text-sm font-semibold transition ${
          role === "supplier"
            ? "border-black bg-black text-white"
            : "border-gray-300 text-gray-500 hover:border-gray-400"
        }`}
      >
        Saya Supplier
      </button>

    </div>
  )
}