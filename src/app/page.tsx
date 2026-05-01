import Link from 'next/link'
import { homes, BUILDERS } from '@/lib/homes'

const BUILDER_BADGE: Record<string, string> = {
  'Coventry Homes': 'bg-sky-100 text-sky-800',
  'Perry Homes': 'bg-orange-100 text-orange-800',
  'Westin Homes': 'bg-emerald-100 text-emerald-800',
}

export default function HomePage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Logo / Hero Image */}
      <div className="w-full border-b border-gray-100">
        <img
          src="https://candelatx.com/wp-content/uploads/2026/04/Hero-Image.jpg"
          alt="Candela Scent of Sunshine Model Home Tour"
          className="w-full h-auto"
        />
      </div>

      {/* Intro */}
      <div className="px-4 pt-8 pb-4 max-w-2xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
          Candela
        </p>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-3">
          Can You Guess the Scent?
        </h1>
        <p className="text-gray-600 text-base leading-relaxed">
          Each model home is scented with a signature Candela candle. Tour the homes, make your best
          guess in each one, and you could win a prize!
        </p>
      </div>

      {/* Property List */}
      <section className="px-4 pt-6 pb-16 max-w-2xl mx-auto">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
          Select a Home
        </h2>

        <div className="space-y-10">
          {BUILDERS.map((builder) => {
            const builderHomes = homes.filter((h) => h.builder === builder)
            const badgeClass = BUILDER_BADGE[builder]
            return (
              <div key={builder}>
                <h3 className="text-sm font-semibold text-gray-500 mb-3">{builder}</h3>
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
          One guess per home per email address
        </p>
      </section>
    </main>
  )
}
