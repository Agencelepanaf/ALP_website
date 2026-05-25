import Link from 'next/link'
import ProjetForm from '../_form'
import { createProjetAction } from '../../actions'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Nouveau projet — Admin Le Panaf' }

export default function NouveauProjetPage() {
  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-6">
        <Link
          href="/admin/realisations"
          className="inline-flex items-center gap-1.5 text-xs text-[#999] hover:text-[#555] transition-colors mb-3"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Retour
        </Link>
        <p className="text-xs font-semibold tracking-widest uppercase text-[#999] mb-1">Admin</p>
        <h1 className="text-2xl font-semibold text-[#1A1A1A]">Nouveau projet</h1>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
        <ProjetForm action={createProjetAction} mode="create" />
      </div>
    </div>
  )
}
