"use client"

import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {

  const getPages = () => {
    const pages: (number | "...")[] = []

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }

      return pages
    }

    pages.push(1)

    if (currentPage > 3) {
      pages.push("...")
    }

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (currentPage < totalPages - 2) {
      pages.push("...")
    }

    pages.push(totalPages)

    return pages
  }

  return (
    <div className="mt-12 flex items-center justify-center gap-2">

      {/* Previous */}

      <button
        onClick={() =>
          onPageChange(Math.max(currentPage - 1, 1))
        }
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 ">
        <ChevronLeft size={18} />
      </button>

      {getPages().map((page, index) => {

        if (page === "...") {
          return (
            <div
              key={index}
              className="flex h-10 w-10 items-center justify-center"
            >
              <MoreHorizontal size={18} />
            </div>
          )
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              h-10
              w-10
              rounded-lg
              border
              transition

              ${
                currentPage === page
                  ? "border-[#1A3A1B] bg-[#1A3A1B] text-white"
                  : "border-gray-300 hover:bg-gray-100"
              }
            `}
          >
            {page}
          </button>
        )
      })}

      {/* Next */}

      <button
        onClick={() =>
          onPageChange(
            Math.min(currentPage + 1, totalPages)
          )
        }
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 transition hover:bg-gray-100 disabled:cursor-not-allowed isabled:opacity-40">
        <ChevronRight size={18} />
      </button>

    </div>
  )
}