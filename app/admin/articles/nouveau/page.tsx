import Link from 'next/link'
import type { Metadata } from 'next'
import { ChevronLeft } from 'lucide-react'
import ArticleForm from '../_form'
import { createArticleAction } from '../actions'

export const metadata: Metadata = { title: 'Nouvel article — Admin Le Panaf' }

export default function NouvelArticlePage() {
  return (
    <div className="p-8">
      <Link
        href="/admin/articles"
        className="inline-flex items-center gap-1.5 text-sm text-[#999] hover:text-[#333] mb-6 transition-colors"
      >
        <ChevronLeft size={15} /> Articles
      </Link>

      <p className="text-xs font-semibold tracking-widest uppercase text-[#999] mb-1">Admin</p>
      <h1 className="text-2xl font-semibold text-[#1A1A1A] mb-8">Nouvel article</h1>

      <ArticleForm action={createArticleAction} mode="create" />
    </div>
  )
}
