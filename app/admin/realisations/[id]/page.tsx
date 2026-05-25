import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { updateProjetAction } from '../../actions'
import ProjetForm from '../_form'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Modifier le projet — Admin Le Panaf' }

export default async function EditProjetPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params

  const { data, error } = await supabase
    .from('projets')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) notFound()

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
        <h1 className="text-2xl font-semibold text-[#1A1A1A]">
          Modifier — <span className="text-[#52B788]">{data.nom}</span>
        </h1>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6">
        <ProjetForm action={updateProjetAction} defaultValues={data} mode="edit" />
      </div>
    </div>
  )
}
