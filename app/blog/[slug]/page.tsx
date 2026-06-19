import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { supabase } from '@/lib/supabase'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await supabase
    .from('articles')
    .select('titre, description')
    .eq('slug', slug)
    .eq('statut', 'publie')
    .single()

  if (!data) return { title: 'Article introuvable' }

  return {
    title: data.titre,
    description: data.description || undefined,
    openGraph: {
      title: data.titre,
      description: data.description || undefined,
      type: 'article',
    },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function readTime(contenu: string) {
  return Math.max(1, Math.ceil(contenu.trim().split(/\s+/).length / 200))
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('statut', 'publie')
    .single()

  if (!article) notFound()

  return (
    <div className="min-h-screen bg-background">

      {/* En-tête article */}
      <header className="px-4 sm:px-6 lg:px-8 pt-32 pb-10 md:pt-36 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground mb-8 transition-colors"
          >
            ← Blog
          </Link>
          <div className="flex items-center gap-3 text-xs text-foreground-muted mb-4">
            <time dateTime={article.published_at ?? article.created_at}>
              {formatDate(article.published_at ?? article.created_at)}
            </time>
            <span>·</span>
            <span>{readTime(article.contenu)} min de lecture</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
            {article.titre}
          </h1>
          {article.description && (
            <p className="mt-4 text-lg text-foreground-muted leading-relaxed">{article.description}</p>
          )}
          {article.image_url && (
            <div className="relative aspect-video rounded-2xl overflow-hidden mt-8 bg-surface">
              <Image
                src={article.image_url}
                alt={article.titre}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}
        </div>
      </header>

      {/* Contenu */}
      <article className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto prose-lepanaf">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => <h1 className="text-3xl font-semibold text-foreground mt-10 mb-4 first:mt-0">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl font-semibold text-foreground mt-8 mb-3">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl font-semibold text-foreground mt-6 mb-2">{children}</h3>,
              p:  ({ children }) => <p className="text-foreground-muted leading-relaxed mb-5">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-6 mb-5 space-y-1.5 text-foreground-muted">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-6 mb-5 space-y-1.5 text-foreground-muted">{children}</ol>,
              li: ({ children }) => <li className="leading-relaxed">{children}</li>,
              a:  ({ href, children }) => <a href={href} className="text-accent underline underline-offset-2 hover:text-accent-hover transition-colors" target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}>{children}</a>,
              strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
              em: ({ children }) => <em className="italic">{children}</em>,
              blockquote: ({ children }) => <blockquote className="border-l-4 border-accent-green pl-5 my-6 text-foreground-muted italic">{children}</blockquote>,
              code: ({ children, className }) => {
                const isBlock = className?.includes('language-')
                return isBlock
                  ? <code className="block bg-surface border border-border rounded-xl px-5 py-4 text-sm font-mono overflow-x-auto my-5">{children}</code>
                  : <code className="bg-surface border border-border rounded px-1.5 py-0.5 text-sm font-mono">{children}</code>
              },
              hr: () => <hr className="border-border my-10" />,
            }}
          >
            {article.contenu}
          </ReactMarkdown>
        </div>
      </article>

      {/* Footer article */}
      <div className="px-4 sm:px-6 lg:px-8 pb-20 border-t border-border">
        <div className="max-w-3xl mx-auto pt-10 flex items-center justify-between">
          <Link href="/blog" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
            ← Tous les articles
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-accent text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-accent-hover transition-colors"
          >
            Discutons de votre projet →
          </Link>
        </div>
      </div>

    </div>
  )
}
