'use server'

import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

export async function submitGuess(data: {
  name: string
  email: string
  propertySlug: string
  scentGuess: string
}): Promise<{ success: boolean; error?: string }> {
  const { name, email, propertySlug, scentGuess } = data

  if (!name.trim() || !email.trim() || !scentGuess || !propertySlug) {
    return { success: false, error: 'invalid_input' }
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  try {
    const cookieStore = await cookies()
    cookieStore.set(
      'candelasc_user',
      JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase() }),
      { maxAge: 60 * 60 * 24 * 7, path: '/', sameSite: 'lax' }
    )
  } catch {
    // cookie errors are non-fatal
  }

  const { error } = await supabase.from('guesses').insert({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    property_slug: propertySlug,
    scent_guess: scentGuess,
  })

  if (error) {
    console.error('Supabase insert error:', error.code, error.message)
    if (error.code === '23505') {
      return { success: false, error: 'already_guessed' }
    }
    return { success: false, error: 'server_error' }
  }

  return { success: true }
}
