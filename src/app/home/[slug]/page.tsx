import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getHomeBySlug } from '@/lib/homes'
import GuessForm from './GuessForm'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function PropertyPage({ params }: PageProps) {
  const { slug } = await params
  const home = getHomeBySlug(slug)
  if (!home) notFound()

  const cookieStore = await cookies()
  const userCookie = cookieStore.get('candelasc_user')
  const initialUser = userCookie
    ? (JSON.parse(userCookie.value) as { name: string; email: string })
    : null

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero */}
      <div className="relative h-[42vh] min-h-[260px] overflow-hidden">
        <img
          src="https://candelatx.com/wp-content/uploads/2026/04/Hero-Image.jpg"
          alt="Candela Scent of Sunshine"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        <div className="absolute inset-x-0 bottom-0 p-5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-4 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Homes
          </Link>
          <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">
            {home.builder} · {home.modelSize}
          </p>
          <h1 className="text-white text-2xl font-bold leading-tight">{home.address}</h1>
          <p className="text-white/60 text-sm">{home.city}</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-lg mx-auto px-4 py-8 pb-16">
        <GuessForm propertySlug={home.slug} initialUser={initialUser} />
      </div>
    </main>
  )
}
