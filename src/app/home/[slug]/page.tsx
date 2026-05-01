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
    <main className="bg-white min-h-screen">
      {/* Logo strip */}
      <div className="w-full border-b border-gray-100">
        <img
          src="https://candelatx.com/wp-content/uploads/2026/04/Hero-Image.jpg"
          alt="Candela Scent of Sunshine"
          className="w-full h-auto max-h-48 object-cover object-center"
        />
      </div>

      <div className="max-w-lg mx-auto px-4 pt-6 pb-16">
        {/* Back nav */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-gray-400 hover:text-gray-700 text-sm mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Homes
        </Link>

        {/* Property header */}
        <div className="mb-8">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-500 mb-1">
            {home.builder} · {home.modelSize}
          </span>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">{home.address}</h1>
          <p className="text-gray-500 text-sm mt-0.5">{home.city}</p>
        </div>

        <GuessForm propertySlug={home.slug} initialUser={initialUser} />
      </div>
    </main>
  )
}
