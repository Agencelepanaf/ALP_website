import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ChevronLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import ArticleForm from '../_form'
import { updateArticleAction } from '../actions'

export const metadata: Metadata = { title: 'Modifier article — Admin Le Panaf' }

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single()

  if (!article) notFound()

  return (
    <div className="p-8">
      <Link
        href="/admin/articles"
        className="inline-flex items-center gap-1.5 text-sm text-[#999] hover:text-[#333] mb-6 transition-colors"
      >
        <ChevronLeft size={15} /> Articles
      </Link>

      <p className="text-xs font-semibold tracking-widest uppercase text-[#999] mb-1">Admin</p>
      <h1 className="text-2xl font-semibold text-[#1A1A1A] mb-8 truncate">{article.titre}</h1>

      <ArticleForm action={updateArticleAction} defaultValues={article} mode="edit" />
    </div>
  )
}
