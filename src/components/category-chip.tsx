interface Props {
  name: string
  icon: React.ElementType
  active: boolean
  onClick: () => void
}

export default function CategoryChip({
  name,
  icon: Icon,
  active,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        flex shrink-0 items-center gap-3 rounded-2xl border px-5 py-3 transition-all
        ${
          active
            ? "border-green-600 bg-green-50"
            : "border-gray-200 bg-white hover:border-green-600 hover:shadow-md"
        }
      `}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
        <Icon size={22} className="text-green-700" />
      </div>

      <span className="whitespace-nowrap text-sm font-medium md:text-base">
        {name}
      </span>
    </button>
  )
}
