'use client'

import { useState, useTransition } from 'react'
import { submitGuess } from '@/app/actions'
import { SCENTS } from '@/lib/homes'

interface Props {
  propertySlug: string
  initialUser: { name: string; email: string } | null
}

export default function GuessForm({ propertySlug, initialUser }: Props) {
  const [selectedScent, setSelectedScent] = useState<string | null>(null)
  const [name, setName] = useState(initialUser?.name ?? '')
  const [email, setEmail] = useState(initialUser?.email ?? '')
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'already_guessed'>('idle')
  const [isPending, startTransition] = useTransition()

  const canSubmit = Boolean(selectedScent && name.trim() && email.trim())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    startTransition(async () => {
      const result = await submitGuess({
        name,
        email,
        propertySlug,
        scentGuess: selectedScent!,
      })
      if (result.success) {
        setStatus('success')
      } else if (result.error === 'already_guessed') {
        setStatus('already_guessed')
      } else {
        setStatus('error')
      }
    })
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-5">
          <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Guess Submitted!</h2>
        <p className="text-gray-600 mb-1">
          You guessed{' '}
          <span className="font-semibold text-amber-600">{selectedScent}</span>
        </p>
        <p className="text-gray-400 text-sm mt-3">
          Good luck — we&apos;ll pick a winner after the tour!
        </p>
      </div>
    )
  }

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
          You&apos;ve already submitted a guess for this home!
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
        disabled={!canSubmit || isPending}
        className="w-full py-4 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 disabled:bg-gray-100 disabled:text-gray-400 text-white font-semibold rounded-2xl transition-colors text-base shadow-sm disabled:shadow-none"
      >
        {isPending ? 'Submitting…' : 'Submit My Guess'}
      </button>
    </form>
  )
}
