'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * Bouton CTA "Discutons de votre projet" — mobile uniquement.
 * À placer en absolute dans la section hero (qui doit avoir position: relative).
 * Slide-up depuis le bas + vibration après l'entrée.
 */
export default function FloatingCTA() {
  return (
    <div className="absolute bottom-6 inset-x-0 flex justify-center md:hidden pointer-events-none">

      {/* 1. Entrée : slide-up depuis le bas */}
      <motion.div
        className="pointer-events-auto"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 0.9,
          duration: 0.55,
          type: 'spring',
          stiffness: 180,
          damping: 18,
        }}
      >
        {/* 2. Vibration : se déclenche après l'entrée */}
        <motion.div
          animate={{ rotate: [0, -5, 5, -5, 5, -3, 3, 0] }}
          transition={{
            delay: 1.7,
            duration: 0.55,
            ease: 'easeInOut',
          }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 bg-accent text-white text-sm font-semibold px-6 py-3.5 rounded-full shadow-xl shadow-accent/30 active:scale-95 transition-transform duration-150 whitespace-nowrap"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Discutons de votre projet
          </Link>
        </motion.div>
      </motion.div>

    </div>
  )
}
