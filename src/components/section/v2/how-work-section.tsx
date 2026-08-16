'use client';

import { useLanguage } from '@/lib/langue/provider';

const steps = [
  {
    number: '1',
    title: 'landing.work.step1Title',
    description: 'landing.work.step1Description',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="7" cy="7" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="7" cy="12" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="7" cy="17" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="12" cy="9.5" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="12" cy="14.5" r="1.2" fill="currentColor" stroke="none" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l3-3m0 0l2 2m-2-2v6" />
      </svg>
    ),
  },
  {
    number: '2',
    title: 'landing.work.step2Title',
    description: 'landing.work.step2Description',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4l2.5 4.5h-5L12 4z" />
        <rect x="5" y="13" width="4" height="4" strokeWidth={2} />
        <circle cx="16" cy="15" r="2" strokeWidth={2} />
      </svg>
    ),
  },
  {
    number: '3',
    title: 'landing.work.step3Title',
    description: 'landing.work.step3Description',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: '4',
    title: 'landing.work.step4Title',
    description: 'landing.work.step4Description',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2.5" y="9" width="11" height="7" strokeWidth={2} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 12h4l3 3v1h-7v-4z" />
        <circle cx="6" cy="17.5" r="1.5" strokeWidth={2} />
        <circle cx="16.5" cy="17.5" r="1.5" strokeWidth={2} />
      </svg>
    ),
  },
  {
    number: '5',
    title: 'landing.work.step5Title',
    description: 'landing.work.step5Description',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2.5" y="9" width="11" height="7" strokeWidth={2} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 12h4l3 3v1h-7v-4z" />
        <circle cx="6" cy="17.5" r="1.5" strokeWidth={2} />
        <circle cx="16.5" cy="17.5" r="1.5" strokeWidth={2} />
      </svg>
    ),
  },
];

export default function HowWorkSection() {
  const { t } = useLanguage();

  return (
    <section id="cara-kerja" className="w-full px-4 sm:px-6 lg:px-12 py-16 sm:py-20 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-3 sm:mb-4">
            <span className="text-neutral-800">{t("landing.work.title")} </span>
            <span className="bg-gradient-to-r from-emerald-800 via-green-500 to-green-400 bg-clip-text text-transparent">
              BumiNusa.id
            </span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 max-w-xl leading-relaxed">
            {t("landing.work.description")}
          </p>
        </div>

        {/* Desktop: straight single row */}
        <div className="hidden lg:block relative">
          <svg
            className="absolute inset-x-0 top-8 w-full h-[2px] -z-0"
            viewBox="0 0 100 2"
            preserveAspectRatio="none"
          >
            <line
              x1="10"
              y1="1"
              x2="90"
              y2="1"
              stroke="#D4B96A"
              strokeWidth="1"
              strokeDasharray="3 2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="grid grid-cols-5 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center px-3"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-emerald-900 mb-5">
                  {step.icon}
                </div>
                <h3 className="text-lg font-medium text-neutral-800 mb-2">
                  {step.number}. {t(step.title)}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed max-w-[220px]">
                  {t(step.description)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / Tablet: vertical timeline */}
        <div className="lg:hidden relative pl-8 sm:pl-10">
          <div className="absolute left-[27px] sm:left-[31px] top-2 bottom-2 border-l-2 border-dashed border-amber-300/60" />
          <div className="flex flex-col gap-8 sm:gap-10">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex gap-4 sm:gap-5">
                <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-md flex items-center justify-center text-emerald-900 -ml-8 sm:-ml-10 z-10">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-neutral-800 mb-1.5">
                    {step.number}. {t(step.title)}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {t(step.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}