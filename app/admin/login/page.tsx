'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { loginAction } from '../actions'

const initialState = { error: '' }

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState)

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4">
      {/* Halo décoratif */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2D6A4F]/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-sm">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#2D6A4F] flex items-center justify-center mb-4">
            <span className="text-white font-bold text-lg">LP</span>
          </div>
          <h1 className="text-white text-xl font-semibold">Admin Le Panaf</h1>
          <p className="text-white/40 text-sm mt-1">Espace d&apos;administration</p>
        </div>

        {/* Formulaire */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <form action={formAction} className="flex flex-col gap-4">

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#52B788] focus:bg-white/10 transition-all duration-150"
              />
            </div>

            {state?.error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400 shrink-0">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-red-400 text-sm">{state.error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full bg-[#2D6A4F] hover:bg-[#40916C] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors duration-150 text-sm"
            >
              {pending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" /><path d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                  Connexion…
                </span>
              ) : (
                'Se connecter'
              )}
            </button>

          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          ← <Link href="/" className="hover:text-white/40 transition-colors">Retour au site</Link>
        </p>

      </div>
    </div>
  )
}
