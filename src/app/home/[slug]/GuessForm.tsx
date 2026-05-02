'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { SCENTS } from '@/lib/homes'

function saveUserCookie(name: string, email: string) {
  const value = encodeURIComponent(JSON.stringify({ name, email }))
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `candelasc_user=${value}; expires=${expires}; path=/; SameSite=Lax`
}

interface Props {
  propertySlug: string
  initialUser: { name: string; email: string } | null
}

export default function GuessForm({ propertySlug, initialUser }: Props) {
  const [selectedScent, setSelectedScent] = useState<string | null>(null)
  const [name, setName] = useState(initialUser?.name ?? '')
  const [email, setEmail] = useState(initialUser?.email ?? '')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error' | 'already_guessed'>('idle')
  const router = useRouter()

  const canSubmit = Boolean(
    selectedScent && name.trim() && email.trim() && status !== 'submitting'
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit || !selectedScent) return

    setStatus('submitting')

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { error } = await supabase.from('guesses').insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        property_slug: propertySlug,
        scent_guess: selectedScent,
      })

      if (error) {
        if (error.code === '23505') {
          setStatus('already_guessed')
        } else {
          console.error('Insert error:', error.code, error.message)
          setStatus('error')
        }
        return
      }

      saveUserCookie(name.trim(), email.trim().toLowerCase())
      router.push('/thank-you')
    } catch (err) {
      console.error('Submit error:', err)
      setStatus('error')
    }
  }

  const isPending = status === 'submitting'

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Scent Selection */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-1">What scent do you smell?</h2>
        <p className="text-gray-500 text-sm mb-4">Tap the scent you think matches this home</p>
        <div className="grid grid-cols-2 gap-2.5">
          {SCENTS.map((scent) => {
            const isSelected = selectedScent === scent
            return (
              <button
                key={scent}
                type="button"
                onClick={() => setSelectedScent(scent)}
                className={`py-4 px-3 rounded-xl border-2 text-sm font-medium transition-all duration-150 text-left leading-snug ${
                  isSelected
                    ? 'bg-amber-500 border-amber-500 text-white shadow-md'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-amber-300 active:scale-[0.97]'
                }`}
              >
                {isSelected && (
                  <span className="block text-amber-100 text-xs mb-0.5">✓ Selected</span>
                )}
                {scent}
              </button>
            )
          })}
        </div>
      </div>

      {/* User Info */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Your Info</h2>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First and Last Name"
            required
            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 text-gray-900 text-base"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 text-gray-900 text-base"
          />
          <p className="text-xs text-gray-400 mt-1.5">
            Used only for winner selection · One guess per home
          </p>
        </div>
      </div>

      {/* Status Messages */}
      {status === 'already_guessed' && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 text-orange-700 text-sm font-medium text-center">
          You&apos;ve already submitted a guess for this home.
        </div>
      )}
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm font-medium text-center">
          Something went wrong. Please try again.
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={!canSubmit}
        className="w-full py-4 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 disabled:bg-gray-100 disabled:text-gray-400 text-white font-semibold rounded-2xl transition-colors text-base shadow-sm disabled:shadow-none"
      >
        {isPending ? 'Submitting…' : 'Submit My Guess'}
      </button>
    </form>
  )
}
