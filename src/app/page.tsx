import Link from 'next/link'
import { homes, BUILDERS } from '@/lib/homes'

const BUILDER_BADGE: Record<string, string> = {
  'Coventry Homes': 'bg-sky-100 text-sky-800',
  'Perry Homes': 'bg-orange-100 text-orange-800',
  'Westin Homes': 'bg-emerald-100 text-emerald-800',
}

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-svh min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
        <img
          src="https://candelatx.com/wp-content/uploads/2026/04/Hero-Image.jpg"
          alt="Candela Scent of Sunshine Model Home Tour"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />

        <div className="relative z-10 text-center text-white px-6 max-w-sm mx-auto">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Candela Candles
          </p>
          <h1 className="text-4xl font-bold leading-tight mb-3">
            Scent of Sunshine
            <br />
            Model Home Tour
          </h1>
          <p className="text-white/75 text-base mb-8 leading-relaxed">
            Visit each model home, guess the Candela scent inside, and you could win a prize!
          </p>
          <a
            href="#homes"
            className="inline-block bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold px-8 py-4 rounded-2xl transition-colors text-base shadow-lg"
          >
            Select a Home ↓
          </a>
        </div>
      </section>

      {/* Property List */}
      <section id="homes" className="bg-stone-50 px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Choose a Home</h2>
          <p className="text-gray-500 text-sm mb-10">
            Tap a home to submit your scent guess
          </p>

          <div className="space-y-10">
            {BUILDERS.map((builder) => {
              const builderHomes = homes.filter((h) => h.builder === builder)
              const badgeClass = BUILDER_BADGE[builder]
              return (
                <div key={builder}>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                    {builder}
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {builderHomes.map((home) => (
                      <Link
                        key={home.slug}
                        href={`/home/${home.slug}`}
                        className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-start justify-between hover:shadow-md hover:border-amber-200 transition-all active:scale-[0.98]"
                      >
                        <div className="min-w-0">
                          <span
                            className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-2.5 ${badgeClass}`}
                          >
                            {home.modelSize}
                          </span>
                          <p className="font-semibold text-gray-900 text-[15px] leading-snug">
                            {home.address}
                          </p>
                          <p className="text-gray-400 text-sm mt-0.5">{home.city}</p>
                        </div>
                        <svg
                          className="w-5 h-5 text-gray-300 group-hover:text-amber-400 mt-1 flex-shrink-0 ml-3 transition-colors"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          <p className="text-center text-gray-400 text-xs mt-12">
            One guess per home per email · Gleaming at Cross Creek Ranch · Richmond, TX
          </p>
        </div>
      </section>
    </main>
  )
}
