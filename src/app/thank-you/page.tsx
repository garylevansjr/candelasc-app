import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Logo strip */}
      <div className="w-full border-b border-gray-100">
        <img
          src="https://candelatx.com/wp-content/uploads/2026/04/Hero-Image.jpg"
          alt="Candela Scent of Sunshine"
          className="w-full h-auto"
        />
      </div>

      <div className="max-w-sm mx-auto px-6 pt-14 pb-16 text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-amber-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">Thank You!</h1>
        <p className="text-gray-600 text-base leading-relaxed mb-2">
          Your guess has been recorded.
        </p>
        <p className="text-gray-500 text-sm leading-relaxed mb-10">
          Continue touring the homes and submit a guess at each one — the more you enter, the
          better your chances of winning!
        </p>

        <Link
          href="/"
          className="inline-block w-full bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold py-4 rounded-2xl transition-colors text-base"
        >
          Guess Another Home
        </Link>
      </div>
    </main>
  )
}
