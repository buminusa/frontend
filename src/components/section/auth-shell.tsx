import { ReactNode } from "react"
import { Sprout } from "lucide-react"

interface AuthShellProps {
  eyebrow: string
  title: string
  subtitle: string
  children: ReactNode
  quote: string
  footerLink: ReactNode
}

export default function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  quote,
  footerLink,
}: AuthShellProps) {
  return (
    <section className="relative min-h-[calc(100vh-9rem)] bg-[#FAFAF7] md:min-h-[calc(100vh-11rem)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(26,58,27,0.06),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(22,163,74,0.08),transparent_55%)]"
      />

      <div className="relative mx-auto grid min-h-[calc(100vh-9rem)] max-w-7xl grid-cols-1 px-6 py-12 md:min-h-[calc(100vh-11rem)] md:grid-cols-2 md:items-start md:gap-12 md:py-20 lg:px-8">
        <aside className="hidden self-start md:sticky md:top-24 md:flex md:h-[calc(100vh-16rem)] md:min-h-[24rem] md:flex-col md:mr-0 md:items-start md:justify-center">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#1A3A1B]/70">
            <Sprout className="h-3.5 w-3.5" strokeWidth={2.2} />
            <span>BumiNusa.id</span>
          </div>

          <div className="relative max-w-md pl-6 mt-12">
            <span
              aria-hidden
              className="absolute left-0 top-1 h-full w-px bg-gradient-to-b from-[#1A3A1B]/0 via-[#1A3A1B]/40 to-[#1A3A1B]/0"
            />
            <p className="text-2xl font-medium leading-snug tracking-tight text-[#1A3A1B] lg:text-[28px]">
              {quote}
            </p>
          </div>
        </aside>

        <div className="flex items-center justify-center md:mt-14">
          <div className="w-full max-w-md">
            <div className="hidden items-center gap-2 pb-8 md:hidden">
              <Sprout className="h-4 w-4 text-[#1A3A1B]" strokeWidth={2.2} />
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1A3A1B]">
                BumiNusa.id
              </span>
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              {eyebrow}
            </p>

            <div className="mb-2 flex items-center gap-3">
              <h1 className="text-4xl font-semibold tracking-tight text-[#1A3A1B] lg:text-5xl">
                {title}
              </h1>
            </div>

            <div className="mb-8 flex items-center gap-2">
              <span aria-hidden className="h-px w-8 bg-[#1A3A1B]/40" />
              <Sprout className="h-3 w-3 text-[#16A34A]" strokeWidth={2.4} />
              <span aria-hidden className="h-px w-8 bg-[#1A3A1B]/40" />
            </div>

            <p className="mb-8 text-sm leading-relaxed text-gray-600">
              {subtitle}
            </p>

            {children}

            <p className="mt-6 text-center text-sm text-gray-500">{footerLink}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
