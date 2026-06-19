'use client'

import { useActionState, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Upload, X, ImageIcon } from 'lucide-react'
import type { Article, ArticleStatut } from '@/lib/supabase'

type Props = {
  action: (prevState: unknown, formData: FormData) => Promise<unknown>
  defaultValues?: Partial<Article>
  mode: 'create' | 'edit'
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export default function ArticleForm({ action, defaultValues, mode }: Props) {
  const [state, formAction, pending] = useActionState(action, null) as [
    { error?: string } | null,
    (payload: FormData) => void,
    boolean
  ]
  const d = defaultValues ?? {}

  const [preview, setPreview] = useState<string | null>(null)
  const [removeImage, setRemoveImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const currentImage = d.image_url ?? null
  const shownImage = removeImage ? null : (preview ?? currentImage)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) { setPreview(null); return }
    setPreview(URL.createObjectURL(file))
    setRemoveImage(false)
  }

  function handleRemoveImage() {
    setRemoveImage(true)
    setPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <form action={formAction} className="flex flex-col gap-5 max-w-2xl">
      {mode === 'edit' && (
        <>
          <input type="hidden" name="id" value={d.id} />
          <input type="hidden" name="prev_statut" value={d.statut} />
          <input type="hidden" name="current_image_url" value={currentImage ?? ''} />
        </>
      )}
      <input type="hidden" name="remove_image" value={removeImage ? '1' : '0'} />

      {/* Statut */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-[#666] uppercase tracking-wider">Statut</label>
        <div className="flex gap-3">
          {(['brouillon', 'publie'] as ArticleStatut[]).map((s) => (
            <label key={s} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="statut"
                value={s}
                defaultChecked={d.statut ? d.statut === s : s === 'brouillon'}
                className="accent-[#2D6A4F]"
              />
              <span className="text-sm text-[#555]">
                {s === 'publie' ? 'Publié' : 'Brouillon'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Titre */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#666] uppercase tracking-wider">Titre *</label>
        <input
          name="titre"
          required
          defaultValue={d.titre}
          placeholder="Ex : Comment créer un site web qui convertit"
          onChange={(e) => {
            if (mode === 'create') {
              const slugInput = document.querySelector<HTMLInputElement>('[name="slug"]')
              if (slugInput) slugInput.value = slugify(e.target.value)
            }
          }}
          className="h-[42px] bg-[#F5F5F3] border border-[#E5E5E5] rounded-xl px-3 text-sm text-[#333] placeholder:text-[#AAA] focus:outline-none focus:border-[#52B788] transition-colors"
        />
      </div>

      {/* Slug */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#666] uppercase tracking-wider">
          Slug <span className="font-normal normal-case text-[#999]">— URL de l&apos;article</span>
        </label>
        <input
          name="slug"
          required
          defaultValue={d.slug}
          placeholder="ex-comment-creer-un-site-web"
          className="h-[42px] bg-[#F5F5F3] border border-[#E5E5E5] rounded-xl px-3 text-sm text-[#333] font-mono placeholder:text-[#AAA] focus:outline-none focus:border-[#52B788] transition-colors"
        />
        <p className="text-xs text-[#AAA]">Minuscules, tirets uniquement — ex: <code>mon-article-seo</code></p>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#666] uppercase tracking-wider">
          Description <span className="font-normal normal-case text-[#999]">— résumé SEO (~160 caractères)</span>
        </label>
        <textarea
          name="description"
          defaultValue={d.description}
          rows={2}
          placeholder="Courte description affichée dans Google et les aperçus de partage…"
          className="bg-[#F5F5F3] border border-[#E5E5E5] rounded-xl px-4 py-3 text-sm text-[#333] placeholder:text-[#AAA] focus:outline-none focus:border-[#52B788] transition-colors resize-none"
        />
      </div>

      {/* Image */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-[#666] uppercase tracking-wider">
          Image d&apos;illustration <span className="font-normal normal-case text-[#999]">— optionnelle</span>
        </label>

        {shownImage ? (
          <div className="relative aspect-video rounded-xl overflow-hidden border border-[#E5E5E5]">
            <Image src={shownImage} alt="Aperçu" fill className="object-cover" unoptimized={shownImage.startsWith('blob:')} />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 inline-flex items-center gap-1.5 bg-black/60 hover:bg-black/80 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors"
            >
              <X size={12} /> Supprimer
            </button>
          </div>
        ) : (
          <div className="aspect-video rounded-xl border-2 border-dashed border-[#E5E5E5] bg-[#FAFAFA] flex flex-col items-center justify-center gap-2 text-[#CCC]">
            <ImageIcon size={32} strokeWidth={1.5} />
            <p className="text-xs">Aucune image sélectionnée</p>
          </div>
        )}

        <label className="inline-flex items-center gap-2 self-start cursor-pointer bg-[#F5F5F3] hover:bg-[#EEEEE9] border border-[#E5E5E5] text-[#555] text-xs font-semibold px-4 py-2 rounded-xl transition-colors">
          <Upload size={13} />
          {shownImage ? "Changer l'image" : 'Choisir une image'}
          <input
            ref={fileInputRef}
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="sr-only"
          />
        </label>
        <p className="text-xs text-[#BBB]">JPEG, PNG ou WebP · max 5 Mo · ratio 16/9 recommandé</p>
      </div>

      {/* Contenu Markdown */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#666] uppercase tracking-wider">
          Contenu <span className="font-normal normal-case text-[#999]">— Markdown</span>
        </label>
        <textarea
          name="contenu"
          required
          defaultValue={d.contenu}
          rows={20}
          placeholder={`## Introduction\n\nVotre contenu en Markdown...\n\n## Sous-titre\n\nParagraphe avec **gras**, *italique*, [lien](https://…)\n\n- élément de liste\n- autre élément`}
          className="bg-[#F5F5F3] border border-[#E5E5E5] rounded-xl px-4 py-3 text-sm text-[#333] font-mono placeholder:text-[#AAA] focus:outline-none focus:border-[#52B788] transition-colors resize-y"
        />
      </div>

      {state?.error && (
        <p className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
          {state.error}
        </p>
      )}

      <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#F0F0F0]">
        <Link
          href="/admin/articles"
          className="inline-flex items-center bg-[#F5F5F3] hover:bg-[#EEEEE9] text-[#555] text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
        >
          Annuler
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 bg-[#2D6A4F] hover:bg-[#40916C] disabled:opacity-50 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors"
        >
          {pending ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" /><path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
              Enregistrement…
            </>
          ) : (
            mode === 'create' ? "Créer l'article" : 'Enregistrer'
          )}
        </button>
      </div>
    </form>
  )
}
