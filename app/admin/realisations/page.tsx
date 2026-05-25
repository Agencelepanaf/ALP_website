import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import DeleteButton from './_delete-button'
import StatutButton from './_en-cours-button'
import type { Metadata } from 'next'
import type { Projet } from '@/lib/supabase'
import { Star, Clock, CircleCheck, ExternalLink, Pencil, Plus } from 'lucide-react'

export const metadata: Metadata = { title: 'Projets — Admin Le Panaf' }

const STATUT_BADGE: Record<string, { label: string; className: string }> = {
  vedette:  { label: 'Vedette',  className: 'bg-amber-100 text-amber-600' },
  en_cours: { label: 'En cours', className: 'bg-[#52B788]/10 text-[#2D6A4F]' },
  termine:  { label: 'Terminé',  className: 'bg-[#F0F0F0] text-[#888]' },
}

export default async function AdminProjetsPage() {
  const { data: projets, error } = await supabase
    .from('projets')
    .select('*')
    .order('ordre', { ascending: true })

  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-500 text-sm">Erreur : {error.message}</p>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-4xl">

      {/* En-tête */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-[#999] mb-1">Admin</p>
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">Projets</h1>
        </div>
        <Link
          href="/admin/realisations/nouveau"
          className="inline-flex items-center gap-2 bg-[#2D6A4F] hover:bg-[#40916C] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors duration-150"
        >
          <Plus size={15} strokeWidth={2.5} />
          Nouveau projet
        </Link>
      </div>

      {/* Légende */}
      <div className="flex items-center gap-5 mb-4 text-xs text-[#AAA]">
        <span className="flex items-center gap-1.5">
          <Star size={13} className="text-amber-400" fill="currentColor" /> Vedette
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={13} className="text-[#52B788]" /> En cours
        </span>
        <span className="flex items-center gap-1.5">
          <CircleCheck size={13} className="text-[#CCC]" /> Terminé
        </span>
        <span className="ml-auto">Cliquez sur l&apos;icône de statut pour le modifier</span>
      </div>

      {/* Liste */}
      {projets && projets.length > 0 ? (
        <div className="flex flex-col gap-2">
          {projets.map((p: Projet) => {
            const badge = STATUT_BADGE[p.statut]
            return (
              <div
                key={p.id}
                className={`bg-white rounded-2xl border px-5 py-4 flex items-center gap-4 transition-colors ${
                  p.statut === 'vedette'  ? 'border-amber-200 bg-amber-50/40' :
                  p.statut === 'en_cours' ? 'border-[#52B788]/20 bg-[#52B788]/5' :
                                           'border-[#E5E5E5] hover:border-[#52B788]/40'
                }`}
              >
                {/* Ordre */}
                <span className="text-[#CCC] text-sm font-semibold w-6 shrink-0 text-center">{p.ordre}</span>

                {/* Infos */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-[#1A1A1A] text-sm">{p.nom}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badge.className}`}>
                      {badge.label}
                    </span>
                    {(p.statut === 'vedette' || p.statut === 'en_cours') && p.avancement !== null && (
                      <span className="text-[10px] text-[#999]">{p.avancement} %</span>
                    )}
                  </div>
                  <p className="text-xs text-[#999] mt-0.5">
                    {[p.ville, p.service, p.annee, p.lancement].filter(Boolean).join(' · ')}
                  </p>
                </div>

                {/* Lien externe */}
                {p.lien && p.lien !== '#' && (
                  <a
                    href={p.lien}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#CCC] hover:text-[#52B788] transition-colors shrink-0"
                    title="Voir le site"
                  >
                    <ExternalLink size={15} />
                  </a>
                )}

                {/* Changer le statut */}
                <StatutButton projet={p} />

                {/* Éditer */}
                <Link
                  href={`/admin/realisations/${p.id}`}
                  className="text-[#CCC] hover:text-[#52B788] transition-colors shrink-0"
                  title="Modifier"
                >
                  <Pencil size={15} />
                </Link>

                {/* Supprimer */}
                <DeleteButton id={p.id} nom={p.nom} />

              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-[#E5E5E5] p-12 text-center">
          <p className="text-[#999] text-sm mb-4">Aucun projet pour l&apos;instant.</p>
          <Link
            href="/admin/realisations/nouveau"
            className="inline-flex items-center gap-2 bg-[#2D6A4F] hover:bg-[#40916C] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            <Plus size={14} strokeWidth={2.5} />
            Créer le premier projet
          </Link>
        </div>
      )}

    </div>
  )
}
