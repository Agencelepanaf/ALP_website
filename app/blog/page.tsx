import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import type { Article } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Conseils, méthodes et retours d\'expérience sur la présence digitale des entreprises en Afrique francophone.',
  alternates: {
    canonical: 'https://agencelepanaf.com/blog',
  },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function readTime(contenu: string) {
  const words = contenu.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export default async function BlogPage() {
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('statut', 'publie')
    .order('published_at', { ascending: false })

  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-32 pb-12 md:pt-36 md:pb-16 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-foreground-muted mb-3">Blog</p>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Articles & conseils
          </h1>
          <p className="text-foreground-muted text-lg leading-relaxed">
            Méthodes, retours terrain et bonnes pratiques pour votre présence digitale.
          </p>
        </div>
      </section>

      {/* Liste articles */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-3xl mx-auto">
          {articles && articles.length > 0 ? (
            <div className="flex flex-col divide-y divide-border">
              {articles.map((a: Article) => (
                <article key={a.id} className="py-8 group">
                  <Link href={`/blog/${a.slug}`} className="block">
                    {a.image_url && (
                      <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 bg-surface">
                        <Image
                          src={a.image_url}
                          alt={a.titre}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-xs text-foreground-muted mb-3">
                      <time dateTime={a.published_at ?? a.created_at}>
                        {formatDate(a.published_at ?? a.created_at)}
                      </time>
                      <span>·</span>
                      <span>{readTime(a.contenu)} min de lecture</span>
                    </div>
                    <h2 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-200 mb-2">
                      {a.titre}
                    </h2>
                    {a.description && (
                      <p className="text-foreground-muted leading-relaxed line-clamp-2">{a.description}</p>
                    )}
                    <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-accent">
                      Lire l&apos;article →
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-foreground-muted">Les premiers articles arrivent bientôt.</p>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}
