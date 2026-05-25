'use client'

import { useActionState, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Projet, StatutProjet } from '@/lib/supabase'
import { Star, Clock, CircleCheck, Upload, X, ImageIcon } from 'lucide-react'
import CaseStudyFields from '@/components/admin/CaseStudyFields'

const GRADIENTS = [
  { label: 'Ambre',   value: 'from-amber-500/30 to-orange-600/20' },
  { label: 'Émeraude', value: 'from-emerald-600/40 to-teal-500/20' },
  { label: 'Bleu',    value: 'from-blue-600/40 to-indigo-500/20' },
  { label: 'Citron',  value: 'from-lime-600/40 to-green-500/20' },
  { label: 'Violet',  value: 'from-purple-600/40 to-pink-500/20' },
  { label: 'Rose',    value: 'from-rose-600/40 to-pink-500/20' },
]

const ACCENTS = [
  { label: 'Vert (ponctuel)',   value: 'bg-accent-green/10 text-accent-green' },
  { label: 'Bleu (continu)',   value: 'bg-accent/10 text-accent' },
]

const STATUTS: { value: StatutProjet; label: string; hint: string; Icon: React.ElementType; activeClass: string; iconClass: string }[] = [
  { value: 'vedette',  label: 'Vedette',  hint: 'Mis en avant',  Icon: Star,         activeClass: 'border-amber-300 bg-amber-50',   iconClass: 'text-amber-500' },
  { value: 'en_cours', label: 'En cours', hint: 'Badge vert',    Icon: Clock,        activeClass: 'border-[#52B788] bg-[#52B788]/5', iconClass: 'text-[#2D6A4F]' },
  { value: 'termine',  label: 'Terminé',  hint: 'Réalisations',  Icon: CircleCheck,  activeClass: 'border-[#999] bg-[#F5F5F3]',    iconClass: 'text-[#666]' },
]

type ProjetFormProps = {
  action: (prevState: unknown, formData: FormData) => Promise<unknown>
  defaultValues?: Partial<Projet>
  mode: 'create' | 'edit'
}

export default function ProjetForm({ action, defaultValues, mode }: ProjetFormProps) {
  const [, formAction, pending] = useActionState(action, null)
  const d = defaultValues ?? {}

  const [statut, setStatut] = useState<StatutProjet>(d.statut ?? 'termine')
  const isEnCours = statut === 'vedette' || statut === 'en_cours'

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

  function handleRemove() {
    setRemoveImage(true)
    setPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {mode === 'edit' && (
        <>
          <input type="hidden" name="id" value={d.id} />
          <input type="hidden" name="current_image_url" value={currentImage ?? ''} />
        </>
      )}
      <input type="hidden" name="remove_image" value={removeImage ? '1' : '0'} />

      {/* ── STATUT ── */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-[#666] uppercase tracking-wider">Statut *</label>
        <div className="grid grid-cols-3 gap-2">
          {STATUTS.map(({ value, label, hint, Icon, activeClass, iconClass }) => (
            <label
              key={value}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all duration-150 ${
                statut === value ? activeClass : 'border-[#E5E5E5] hover:border-[#D0D0D0]'
              }`}
            >
              <input
                type="radio"
                name="statut"
                value={value}
                checked={statut === value}
                onChange={() => setStatut(value)}
                className="sr-only"
              />
              <Icon
                size={20}
                className={statut === value ? iconClass : 'text-[#CCC]'}
                fill={value === 'vedette' && statut === 'vedette' ? 'currentColor' : 'none'}
              />
              <div className="text-center">
                <p className={`text-xs font-semibold leading-none ${statut === value ? 'text-[#1A1A1A]' : 'text-[#666]'}`}>
                  {label}
                </p>
                <p className="text-[10px] text-[#AAA] mt-0.5">{hint}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* ── NOM + ORDRE ── */}
      <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
        <Field label="Nom du projet *" name="nom" defaultValue={d.nom} required />
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#666] uppercase tracking-wider">Ordre</label>
          <input
            name="ordre"
            type="number"
            min={1} max={999}
            defaultValue={d.ordre ?? 99}
            className="w-20 h-[42px] text-center bg-[#F5F5F3] border border-[#E5E5E5] rounded-xl text-sm text-[#333] focus:outline-none focus:border-[#52B788] transition-colors"
          />
        </div>
      </div>

      {/* ── VILLE + SERVICE ── */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Ville, Pays" name="ville" placeholder="Ex : Casablanca, Maroc" defaultValue={d.ville} />
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#666] uppercase tracking-wider">Service</label>
          <select
            name="service"
            defaultValue={d.service ?? 'Création de site web'}
            className="h-[42px] bg-[#F5F5F3] border border-[#E5E5E5] rounded-xl px-3 text-sm text-[#333] focus:outline-none focus:border-[#52B788] transition-colors"
          >
            <option>Création de site web</option>
            <option>Présence digitale</option>
            <option>Stratégie de marque</option>
            <option>SEO</option>
          </select>
        </div>
      </div>

      {/* ── DESCRIPTION ── */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#666] uppercase tracking-wider">Description *</label>
        <textarea
          name="description"
          defaultValue={d.description}
          rows={3}
          required
          placeholder="Décrivez le projet…"
          className="bg-[#F5F5F3] border border-[#E5E5E5] rounded-xl px-4 py-3 text-sm text-[#333] placeholder:text-[#AAA] focus:outline-none focus:border-[#52B788] transition-colors resize-none"
        />
      </div>

      {/* ── CHAMPS "EN COURS" / "VEDETTE" ── */}
      {isEnCours && (
        <div className="flex flex-col gap-4 p-4 bg-[#F0FFF8] rounded-xl border border-[#52B788]/25">
          <p className="text-xs font-semibold text-[#2D6A4F] uppercase tracking-wider flex items-center gap-1.5">
            <Clock size={12} /> Suivi du projet
          </p>
          <div className="grid grid-cols-[auto_1fr] gap-3 items-end">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#666] uppercase tracking-wider">Emoji</label>
              <input
                name="emoji"
                defaultValue={d.emoji ?? '🏗️'}
                maxLength={4}
                className="w-16 h-[42px] text-center text-2xl bg-[#F5F5F3] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#52B788] transition-colors"
              />
            </div>
            <Field label="Lancement prévu" name="lancement" placeholder="Ex : Juillet 2026" defaultValue={d.lancement ?? ''} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-[#666] uppercase tracking-wider">
              Avancement — <span id={`av-${d.id ?? 'new'}`} className="font-semibold text-[#2D6A4F]">{d.avancement ?? 0} %</span>
            </label>
            <input
              name="avancement"
              type="range"
              min={0} max={100} step={5}
              defaultValue={d.avancement ?? 0}
              className="w-full accent-[#2D6A4F]"
              onInput={(e) => {
                const el = document.getElementById(`av-${d.id ?? 'new'}`)
                if (el) el.textContent = (e.target as HTMLInputElement).value + ' %'
              }}
            />
            <div className="flex justify-between text-xs text-[#AAA]"><span>0 %</span><span>100 %</span></div>
          </div>
        </div>
      )}

      {/* ── CHAMPS "TERMINÉ" ── */}
      {!isEnCours && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Type de client" name="type" placeholder="Ex : Restaurant & bar" defaultValue={d.type ?? ''} />
            <Field label="Année" name="annee" placeholder="Ex : 2025" defaultValue={d.annee ?? ''} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#666] uppercase tracking-wider">Tag</label>
            <div className="flex gap-4">
              {(['Projet ponctuel', 'Accompagnement continu'] as const).map((tag) => (
                <label key={tag} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tag"
                    value={tag}
                    defaultChecked={d.tag ? d.tag === tag : tag === 'Projet ponctuel'}
                    className="accent-[#2D6A4F]"
                  />
                  <span className="text-sm text-[#555]">{tag}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── IMAGE ── */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-[#666] uppercase tracking-wider">
          Image de fond
          <span className="ml-1.5 font-normal normal-case text-[#999]">— remplace la couleur si fournie</span>
        </label>

        {shownImage ? (
          <div className="relative aspect-video rounded-xl overflow-hidden border border-[#E5E5E5]">
            <Image src={shownImage} alt="Aperçu" fill className="object-cover" unoptimized={shownImage.startsWith('blob:')} />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 inline-flex items-center gap-1.5 bg-black/60 hover:bg-black/80 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors"
            >
              <X size={12} /> Supprimer
            </button>
          </div>
        ) : (
          <div className="aspect-video rounded-xl border-2 border-dashed border-[#E5E5E5] bg-[#FAFAFA] flex flex-col items-center justify-center gap-2 text-[#CCC]">
            <ImageIcon size={32} strokeWidth={1.5} />
            <p className="text-xs">Aucune image — la couleur de fond sera utilisée</p>
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
        <p className="text-xs text-[#BBB]">JPEG, PNG ou WebP · max 5 Mo</p>
      </div>

      {/* ── COULEUR DE FOND + BADGE (terminé seulement) ── */}
      {!isEnCours && (
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#666] uppercase tracking-wider">
              Couleur de fond <span className="font-normal normal-case text-[#999]">(si pas d&apos;image)</span>
            </label>
            <select
              name="gradient"
              defaultValue={d.gradient ?? GRADIENTS[0].value}
              className="h-[42px] bg-[#F5F5F3] border border-[#E5E5E5] rounded-xl px-3 text-sm text-[#333] focus:outline-none focus:border-[#52B788] transition-colors"
            >
              {GRADIENTS.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#666] uppercase tracking-wider">Couleur badge</label>
            <select
              name="accent"
              defaultValue={d.accent ?? ACCENTS[0].value}
              className="h-[42px] bg-[#F5F5F3] border border-[#E5E5E5] rounded-xl px-3 text-sm text-[#333] focus:outline-none focus:border-[#52B788] transition-colors"
            >
              {ACCENTS.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* ── LIEN ── */}
      <Field label="URL du site (optionnel)" name="lien" type="url" placeholder="https://…" defaultValue={d.lien ?? ''} />

      {/* ── ÉTUDE DE CAS ── */}
      <CaseStudyFields
        defaultStatement={d.statement}
        defaultEnjeux={d.enjeux}
        defaultLivrables={d.livrables}
        defaultApproche={d.approche}
        defaultOutils={d.outils}
        defaultResultats={d.resultats}
      />

      {/* ── SUBMIT ── */}
      <div className="flex justify-end gap-3 pt-2 border-t border-[#F0F0F0]">
        <Link
          href="/admin/realisations"
          className="inline-flex items-center gap-2 bg-[#F5F5F3] hover:bg-[#EEEEE9] text-[#555] text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
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
            mode === 'create' ? 'Créer le projet' : 'Enregistrer'
          )}
        </button>
      </div>

    </form>
  )
}

function Field({ label, name, type = 'text', placeholder, defaultValue, required }: {
  label: string; name: string; type?: string; placeholder?: string; defaultValue?: string; required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[#666] uppercase tracking-wider">{label}</label>
      <input
        name={name} type={type} defaultValue={defaultValue} placeholder={placeholder} required={required}
        className="h-[42px] bg-[#F5F5F3] border border-[#E5E5E5] rounded-xl px-3 text-sm text-[#333] placeholder:text-[#AAA] focus:outline-none focus:border-[#52B788] transition-colors"
      />
    </div>
  )
}
