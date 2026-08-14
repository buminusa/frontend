'use client';

const steps = [
  {
    number: '1',
    title: 'Register',
    description: 'Buat akun supplier dan buyer',
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
    title: 'Verifikasi ',
    description: 'Verifikasi identitas untuk memulai transaksi dengan aman',
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
    title: 'Pilih komoditas',
    description: 'Jelajahi dan pilih dari berbagai katagori komoditas unggulan',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: '4',
    title: 'Negosiasi',
    description: 'Mencapai Kesepakatan bersama yang saling menguntungkan',
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
    title: 'Transaksi',
    description: 'Lakukan pembayaran dengan metode yang aman dan terjamin',
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
  return (
    <section id="cara-kerja" className="w-full px-4 sm:px-6 lg:px-12 py-16 sm:py-20 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-3 sm:mb-4">
            <span className="text-neutral-800">Cara Kerja </span>
            <span className="bg-gradient-to-r from-emerald-800 via-green-500 to-green-400 bg-clip-text text-transparent">
              BumiNusa.id
            </span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 max-w-xl leading-relaxed">
            Proses yang transparan dan efisien untuk menghubungkan Anda dengan komoditas
            terbaik Nusantara.
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
                  {step.number}. {step.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed max-w-[220px]">
                  {step.description}
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
                    {step.number}. {step.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {step.description}
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