import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import DeleteArticleButton from './_delete-button'
import type { Metadata } from 'next'
import type { Article } from '@/lib/supabase'
import { Pencil, Plus, Globe, FileText } from 'lucide-react'

export const metadata: Metadata = { title: 'Articles — Admin Le Panaf' }

export default async function AdminArticlesPage() {
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-500 text-sm">Erreur : {error.message}</p>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-4xl">

      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-[#999] mb-1">Admin</p>
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">Articles</h1>
        </div>
        <Link
          href="/admin/articles/nouveau"
          className="inline-flex items-center gap-2 bg-[#2D6A4F] hover:bg-[#40916C] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus size={15} strokeWidth={2.5} />
          Nouvel article
        </Link>
      </div>

      {articles && articles.length > 0 ? (
        <div className="flex flex-col gap-2">
          {articles.map((a: Article) => (
            <div
              key={a.id}
              className={`bg-white rounded-2xl border px-5 py-4 flex items-center gap-4 transition-colors ${
                a.statut === 'publie'
                  ? 'border-[#52B788]/20 bg-[#52B788]/5'
                  : 'border-[#E5E5E5] hover:border-[#52B788]/40'
              }`}
            >
              <div className={`shrink-0 ${a.statut === 'publie' ? 'text-[#52B788]' : 'text-[#CCC]'}`}>
                {a.statut === 'publie' ? <Globe size={15} /> : <FileText size={15} />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-[#1A1A1A] text-sm truncate">{a.titre}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    a.statut === 'publie'
                      ? 'bg-[#52B788]/10 text-[#2D6A4F]'
                      : 'bg-[#F0F0F0] text-[#888]'
                  }`}>
                    {a.statut === 'publie' ? 'Publié' : 'Brouillon'}
                  </span>
                </div>
                <p className="text-xs text-[#999] mt-0.5 truncate">/blog/{a.slug}</p>
              </div>

              {a.statut === 'publie' && (
                <Link
                  href={`/blog/${a.slug}`}
                  target="_blank"
                  className="text-[#CCC] hover:text-[#52B788] transition-colors shrink-0"
                  title="Voir l'article"
                >
                  <Globe size={15} />
                </Link>
              )}

              <Link
                href={`/admin/articles/${a.id}`}
                className="text-[#CCC] hover:text-[#52B788] transition-colors shrink-0"
                title="Modifier"
              >
                <Pencil size={15} />
              </Link>

              <DeleteArticleButton id={a.id} slug={a.slug} titre={a.titre} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-[#E5E5E5] p-12 text-center">
          <p className="text-[#999] text-sm mb-4">Aucun article pour l&apos;instant.</p>
          <Link
            href="/admin/articles/nouveau"
            className="inline-flex items-center gap-2 bg-[#2D6A4F] hover:bg-[#40916C] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            <Plus size={14} strokeWidth={2.5} />
            Écrire le premier article
          </Link>
        </div>
      )}

    </div>
  )
}
