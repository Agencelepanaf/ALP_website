import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Metadata } from 'next'
import { Star, FolderOpen, Plus, ExternalLink, ChevronRight } from 'lucide-react'

export const metadata: Metadata = { title: 'Admin — Le Panaf' }

export default async function AdminDashboardPage() {
  const [{ count: nbProjets }, { data: vedette }] = await Promise.all([
    supabase.from('projets').select('*', { count: 'exact', head: true }),
    supabase.from('projets').select('nom, avancement').eq('statut', 'vedette').single(),
  ])

  const cards = [
    {
      href: '/admin/realisations',
      label: 'Projet vedette',
      value: vedette?.nom ?? '—',
      sub: vedette ? `${vedette.avancement ?? 0} % d'avancement` : 'Aucun projet en vedette',
      color: 'bg-amber-400/10 text-amber-500',
      Icon: Star,
      iconFill: true,
    },
    {
      href: '/admin/realisations',
      label: 'Tous les projets',
      value: `${nbProjets ?? 0} projet${(nbProjets ?? 0) > 1 ? 's' : ''}`,
      sub: 'Voir et gérer',
      color: 'bg-blue-500/10 text-blue-400',
      Icon: FolderOpen,
      iconFill: false,
    },
  ]

  return (
    <div className="p-8 max-w-3xl">

      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#1A1A1A] mb-1">Dashboard</h1>
        <p className="text-sm text-[#888]">Gérez le contenu de votre site.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {cards.map(({ href, label, value, sub, color, Icon, iconFill }) => (
          <Link
            key={label}
            href={href}
            className="bg-white rounded-2xl border border-[#E5E5E5] p-5 hover:border-[#52B788]/50 hover:shadow-sm transition-all duration-150 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                <Icon size={20} fill={iconFill ? 'currentColor' : 'none'} />
              </div>
              <ChevronRight size={16} className="text-[#CCC] group-hover:text-[#52B788] transition-colors mt-1" />
            </div>
            <p className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-1">{label}</p>
            <p className="text-lg font-semibold text-[#1A1A1A] leading-tight">{value}</p>
            <p className="text-sm text-[#999] mt-0.5">{sub}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
        <p className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-3">Actions rapides</p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/realisations/nouveau"
            className="inline-flex items-center gap-2 bg-[#2D6A4F] hover:bg-[#40916C] text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-150"
          >
            <Plus size={14} strokeWidth={2.5} />
            Nouveau projet
          </Link>
          <Link
            href="/projets"
            target="_blank"
            className="inline-flex items-center gap-2 bg-[#F5F5F3] hover:bg-[#EEEEE9] text-[#555] text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-150"
          >
            <ExternalLink size={14} />
            Voir la page projets
          </Link>
        </div>
      </div>

    </div>
  )
}
