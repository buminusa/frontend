"use client"

import { X } from "lucide-react"
import { useLanguage } from "@/lib/langue/provider"

interface TermsModalProps {
  open: boolean
  checked: boolean
  onClose: () => void
  onChange: (checked: boolean) => void
}

export default function TermsModal({
  open,
  checked,
  onClose,
  onChange,
}: TermsModalProps) {
  const { t } = useLanguage()

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-600">
              BumiNusa.id
            </p>

            <h2 className="mt-1 text-xl font-bold text-gray-900">
              {t("auth.terms.title")}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
            aria-label={t("auth.terms.close")}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 py-6 text-sm leading-7 text-gray-600">

          <section className="mb-8">
            <h3 className="mb-3 text-base font-bold text-gray-900">
              {t("auth.terms.openingTitle")}
            </h3>

            <p className="mb-3">
              {t("auth.terms.openingP1")}
            </p>

            <p className="mb-3">
              {t("auth.terms.openingP2")}
            </p>

            <p>
              {t("auth.terms.openingP3")}
            </p>
          </section>

          <TermsSection
            title={t("auth.terms.article1Title")}
            items={[
              t("auth.terms.article1Item1"),
              t("auth.terms.article1Item2"),
              t("auth.terms.article1Item3"),
              t("auth.terms.article1Item4"),
              t("auth.terms.article1Item5"),
              t("auth.terms.article1Item6"),
              t("auth.terms.article1Item7"),
              t("auth.terms.article1Item8"),
              t("auth.terms.article1Item9"),
              t("auth.terms.article1Item10"),
            ]}
          />

          <TermsSection
            title={t("auth.terms.article2Title")}
            items={[
              t("auth.terms.article2Item1"),
              t("auth.terms.article2Item2"),
              t("auth.terms.article2Item3"),
              t("auth.terms.article2Item4"),
            ]}
          />

          <TermsSection
            title={t("auth.terms.article3Title")}
            items={[
              t("auth.terms.article3Item1"),
              t("auth.terms.article3Item2"),
              t("auth.terms.article3Item3"),
              t("auth.terms.article3Item4"),
              t("auth.terms.article3Item5"),
              t("auth.terms.article3Item6"),
              t("auth.terms.article3Item7"),
            ]}
          />

          <TermsSection
            title={t("auth.terms.article4Title")}
            items={[
              t("auth.terms.article4Item1"),
              t("auth.terms.article4Item2"),
              t("auth.terms.article4Item3"),
              t("auth.terms.article4Item4"),
              t("auth.terms.article4Item5"),
              t("auth.terms.article4Item6"),
            ]}
          />

          <TermsSection
            title={t("auth.terms.article5Title")}
            items={[
              t("auth.terms.article5Item1"),
              t("auth.terms.article5Item2"),
              t("auth.terms.article5Item3"),
              t("auth.terms.article5Item4"),
              t("auth.terms.article5Item5"),
              t("auth.terms.article5Item6"),
            ]}
          />

          <TermsSection
            title={t("auth.terms.article6Title")}
            items={[
              t("auth.terms.article6Item1"),
              t("auth.terms.article6Item2"),
              t("auth.terms.article6Item3"),
              t("auth.terms.article6Item4"),
            ]}
          />

          <TermsSection
            title={t("auth.terms.article7Title")}
            items={[
              t("auth.terms.article7Item1"),
              t("auth.terms.article7Item2"),
              t("auth.terms.article7Item3"),
              t("auth.terms.article7Item4"),
              t("auth.terms.article7Item5"),
            ]}
          />

          <TermsSection
            title={t("auth.terms.article8Title")}
            items={[
              t("auth.terms.article8Item1"),
              t("auth.terms.article8Item2"),
              t("auth.terms.article8Item3"),
            ]}
          />

          <TermsSection
            title={t("auth.terms.article9Title")}
            items={[
              t("auth.terms.article9Item1"),
              t("auth.terms.article9Item2"),
              t("auth.terms.article9Item3"),
            ]}
          />

          <TermsSection
            title={t("auth.terms.article10Title")}
            items={[
              t("auth.terms.article10Item1"),
              t("auth.terms.article10Item2"),
            ]}
          />

          <TermsSection
            title={t("auth.terms.article11Title")}
            items={[
              t("auth.terms.article11Item1"),
              t("auth.terms.article11Item2"),
            ]}
          />

          <TermsSection
            title={t("auth.terms.article12Title")}
            items={[
              t("auth.terms.article12Item1"),
              t("auth.terms.article12Item2"),
              t("auth.terms.article12Item3"),
              t("auth.terms.article12Item4"),
            ]}
          />

          <TermsSection
            title={t("auth.terms.article13Title")}
            items={[
              t("auth.terms.article13Item1"),
              t("auth.terms.article13Item2"),
              t("auth.terms.article13Item3"),
            ]}
          />

          <TermsSection
            title={t("auth.terms.article14Title")}
            items={[
              t("auth.terms.article14Item1"),
              t("auth.terms.article14Item2"),
              t("auth.terms.article14Item3"),
            ]}
          />

          <TermsSection
            title={t("auth.terms.article15Title")}
            items={[
              t("auth.terms.article15Item1"),
            ]}
          />

          <TermsSection
            title={t("auth.terms.article16Title")}
            items={[
              t("auth.terms.article16Item1"),
              t("auth.terms.article16Item2"),
            ]}
          />

          <TermsSection
            title={t("auth.terms.article17Title")}
            items={[
              t("auth.terms.article17Item1"),
              t("auth.terms.article17Item2"),
            ]}
          />

          <TermsSection
            title={t("auth.terms.article18Title")}
            items={[
              t("auth.terms.article18Item1"),
              t("auth.terms.article18Item2"),
              t("auth.terms.article18Item3"),
            ]}
          />

          <TermsSection
            title={t("auth.terms.article19Title")}
            items={[
              t("auth.terms.article19Item1"),
            ]}
          />

        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <label className="mb-4 flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => onChange(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
            />
            <span>
              {t("auth.terms.agreeLabel")}
            </span>
          </label>

          <button
            type="button"
            onClick={onClose}
            disabled={!checked}
            className="w-full rounded-full bg-green-600 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
          >
            {t("auth.terms.understand")}
          </button>
        </div>
      </div>
    </div>
  )
}

function TermsSection({
  title,
  items,
}: {
  title: string
  items: string[]
}) {
  return (
    <section className="mb-8">
      <h3 className="mb-3 text-base font-bold text-gray-900">
        {title}
      </h3>

      <ol className="space-y-2 pl-5">
        {items.map((item, index) => (
          <li key={index} className="pl-1">
            {item}
          </li>
        ))}
      </ol>
    </section>
  )
}
