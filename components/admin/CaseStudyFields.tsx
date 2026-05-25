'use client'

import { useState } from 'react'
import { Plus, Trash2, ChevronDown, ChevronRight, BookOpen } from 'lucide-react'
import type { EnjeuBlock, ApprocheBlock, OutilItem, ResultatItem } from '@/lib/supabase'

// ── Valeurs par défaut ────────────────────────────────────────────────────────

const EMPTY_ENJEUX: EnjeuBlock[] = [
  { num: '01', titre: '', corps: '' },
  { num: '02', titre: '', corps: '' },
  { num: '03', titre: '', corps: '' },
  { num: '04', titre: '', corps: '' },
]

const EMPTY_RESULTATS: ResultatItem[] = [
  { icon: '↑', titre: '', desc: '' },
  { icon: '⚡', titre: '', desc: '' },
  { icon: '◎', titre: '', desc: '' },
]

// ── Props ─────────────────────────────────────────────────────────────────────

interface CaseStudyFieldsProps {
  defaultStatement?: string | null
  defaultEnjeux?: EnjeuBlock[] | null
  defaultLivrables?: string[] | null
  defaultApproche?: ApprocheBlock[] | null
  defaultOutils?: OutilItem[] | null
  defaultResultats?: ResultatItem[] | null
}

// ── Composant ─────────────────────────────────────────────────────────────────

export default function CaseStudyFields({
  defaultStatement,
  defaultEnjeux,
  defaultLivrables,
  defaultApproche,
  defaultOutils,
  defaultResultats,
}: CaseStudyFieldsProps) {
  const hasExistingData = !!(
    defaultStatement ||
    defaultEnjeux?.some(e => e.titre) ||
    defaultLivrables?.length ||
    defaultApproche?.length ||
    defaultOutils?.length ||
    defaultResultats?.some(r => r.titre)
  )

  const [open, setOpen] = useState(hasExistingData)

  const [statement, setStatement] = useState(defaultStatement ?? '')
  const [enjeux, setEnjeux] = useState<EnjeuBlock[]>(
    defaultEnjeux?.length ? defaultEnjeux : EMPTY_ENJEUX
  )
  const [livrables, setLivrables] = useState<string[]>(
    defaultLivrables?.length ? defaultLivrables : ['']
  )
  const [approche, setApproche] = useState<ApprocheBlock[]>(
    defaultApproche?.length ? defaultApproche : [{ titre: '', corps: '', citation: '' }]
  )
  const [outils, setOutils] = useState<OutilItem[]>(
    defaultOutils?.length ? defaultOutils : [{ nom: '', icone: '', desc: '' }]
  )
  const [resultats, setResultats] = useState<ResultatItem[]>(
    defaultResultats?.length ? defaultResultats : EMPTY_RESULTATS
  )

  // ── Sérialisation JSON → toujours dans le DOM pour la soumission ─────────────
  const enjeuxJson = JSON.stringify(enjeux.filter(e => e.titre.trim()))
  const livrJson   = JSON.stringify(livrables.filter(l => l.trim()))
  const approJson  = JSON.stringify(approche.filter(a => a.titre.trim() || a.corps.trim()))
  const outilsJson = JSON.stringify(outils.filter(o => o.nom.trim()))
  const resultJson = JSON.stringify(resultats.filter(r => r.titre.trim()))

  return (
    <>
      {/* ── Inputs cachés (toujours présents dans le DOM) ── */}
      <input type="hidden" name="case_statement"  value={statement} />
      <input type="hidden" name="case_enjeux"     value={enjeuxJson} />
      <input type="hidden" name="case_livrables"  value={livrJson} />
      <input type="hidden" name="case_approche"   value={approJson} />
      <input type="hidden" name="case_outils"     value={outilsJson} />
      <input type="hidden" name="case_resultats"  value={resultJson} />

      {/* ── Section pliable ── */}
      <div className="border border-[#E5E5E5] rounded-2xl overflow-hidden">

        {/* En-tête toggle */}
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          className="w-full flex items-center justify-between px-5 py-3.5 bg-[#FAFAFA] hover:bg-[#F5F5F3] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <BookOpen size={15} className="text-[#999]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#555]">
              Étude de cas
            </span>
            {hasExistingData && (
              <span className="text-[10px] bg-[#52B788]/15 text-[#2D6A4F] px-2 py-0.5 rounded-full font-semibold">
                Configurée
              </span>
            )}
          </div>
          {open
            ? <ChevronDown  size={15} className="text-[#AAA]" />
            : <ChevronRight size={15} className="text-[#AAA]" />
          }
        </button>

        {open && (
          <div className="p-5 flex flex-col gap-7 border-t border-[#E5E5E5]">

            {/* ── 1. Statement ── */}
            <Section label="Citation d'ouverture" hint="Texte affiché en grand sous le hero — laissez vide pour la phrase par défaut.">
              <textarea
                value={statement}
                onChange={e => setStatement(e.target.value)}
                rows={3}
                placeholder={"Un site qui ne présente pas des services.\nUn site qui vend une expérience."}
                className={TEXTAREA}
              />
            </Section>

            {/* ── 2. Livrables ── */}
            <Section label="Livrables" hint="Liste dans la sidebar de la section Approche.">
              <div className="flex flex-col gap-2">
                {livrables.map((l, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={l}
                      onChange={e => setLivrables(prev => prev.map((x, j) => j === i ? e.target.value : x))}
                      placeholder="Ex : Site web optimisé SEO"
                      className={INPUT}
                    />
                    <RemoveBtn onClick={() => setLivrables(prev => prev.filter((_, j) => j !== i))} />
                  </div>
                ))}
                <AddBtn label="Ajouter un livrable" onClick={() => setLivrables(prev => [...prev, ''])} />
              </div>
            </Section>

            {/* ── 3. Enjeux ── */}
            <Section label="Enjeux (4 blocs)" hint="Grille 2×2 — section «Pourquoi ce projet était différent».">
              <div className="flex flex-col gap-3">
                {enjeux.map((e, i) => (
                  <div key={i} className="p-3 bg-[#F5F5F3] rounded-xl border border-[#E5E5E5] flex flex-col gap-2">
                    <span className="text-[10px] font-black text-[#CCC] uppercase tracking-widest">{e.num}</span>
                    <input
                      type="text"
                      value={e.titre}
                      onChange={ev => setEnjeux(prev => prev.map((x, j) => j === i ? { ...x, titre: ev.target.value } : x))}
                      placeholder="Titre de l'enjeu"
                      className={INPUT_WHITE}
                    />
                    <textarea
                      value={e.corps}
                      onChange={ev => setEnjeux(prev => prev.map((x, j) => j === i ? { ...x, corps: ev.target.value } : x))}
                      rows={2}
                      placeholder="Description de l'enjeu…"
                      className={TEXTAREA_WHITE}
                    />
                  </div>
                ))}
              </div>
            </Section>

            {/* ── 4. Approche ── */}
            <Section label="Blocs d'approche" hint="Contenu principal de la section Approche (direction artistique, UX, engagement…).">
              <div className="flex flex-col gap-3">
                {approche.map((a, i) => (
                  <div key={i} className="p-3 bg-[#F5F5F3] rounded-xl border border-[#E5E5E5] flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#BBB] uppercase tracking-wider">Bloc {i + 1}</span>
                      {approche.length > 1 && (
                        <RemoveBtn onClick={() => setApproche(prev => prev.filter((_, j) => j !== i))} size={12} />
                      )}
                    </div>
                    <input
                      type="text"
                      value={a.titre}
                      onChange={ev => setApproche(prev => prev.map((x, j) => j === i ? { ...x, titre: ev.target.value } : x))}
                      placeholder="Titre du bloc (ex : Direction artistique & identité)"
                      className={INPUT_WHITE}
                    />
                    <textarea
                      value={a.corps}
                      onChange={ev => setApproche(prev => prev.map((x, j) => j === i ? { ...x, corps: ev.target.value } : x))}
                      rows={4}
                      placeholder="Contenu du bloc…"
                      className={TEXTAREA_WHITE}
                    />
                    <input
                      type="text"
                      value={a.citation ?? ''}
                      onChange={ev => setApproche(prev => prev.map((x, j) => j === i ? { ...x, citation: ev.target.value } : x))}
                      placeholder="Citation / blockquote (optionnel)"
                      className={`${INPUT_WHITE} italic placeholder:not-italic`}
                    />
                  </div>
                ))}
                <AddBtn label="Ajouter un bloc" onClick={() => setApproche(prev => [...prev, { titre: '', corps: '', citation: '' }])} />
              </div>
            </Section>

            {/* ── 5. Outils ── */}
            <Section label="Stack technique" hint="Icône (2-3 car.), Nom et rôle court.">
              <div className="flex flex-col gap-2">
                {outils.map((o, i) => (
                  <div key={i} className="grid grid-cols-[52px_1fr_1fr_auto] gap-2 items-center">
                    <input
                      type="text"
                      value={o.icone}
                      onChange={ev => setOutils(prev => prev.map((x, j) => j === i ? { ...x, icone: ev.target.value } : x))}
                      placeholder="WP"
                      maxLength={3}
                      className={`${INPUT} text-center font-bold`}
                    />
                    <input
                      type="text"
                      value={o.nom}
                      onChange={ev => setOutils(prev => prev.map((x, j) => j === i ? { ...x, nom: ev.target.value } : x))}
                      placeholder="WordPress"
                      className={INPUT}
                    />
                    <input
                      type="text"
                      value={o.desc}
                      onChange={ev => setOutils(prev => prev.map((x, j) => j === i ? { ...x, desc: ev.target.value } : x))}
                      placeholder="CMS principal"
                      className={INPUT}
                    />
                    <RemoveBtn onClick={() => setOutils(prev => prev.filter((_, j) => j !== i))} />
                  </div>
                ))}
                <AddBtn label="Ajouter un outil" onClick={() => setOutils(prev => [...prev, { nom: '', icone: '', desc: '' }])} />
              </div>
            </Section>

            {/* ── 6. Résultats ── */}
            <Section label="Résultats (3 blocs)" hint="Section «Ce que le projet a accompli» — icône, titre, description.">
              <div className="flex flex-col gap-2">
                {resultats.map((r, i) => (
                  <div key={i} className="grid grid-cols-[44px_1fr_2fr] gap-2 items-center">
                    <input
                      type="text"
                      value={r.icon}
                      onChange={ev => setResultats(prev => prev.map((x, j) => j === i ? { ...x, icon: ev.target.value } : x))}
                      placeholder="↑"
                      className={`${INPUT} text-center text-base`}
                    />
                    <input
                      type="text"
                      value={r.titre}
                      onChange={ev => setResultats(prev => prev.map((x, j) => j === i ? { ...x, titre: ev.target.value } : x))}
                      placeholder="Titre"
                      className={INPUT}
                    />
                    <input
                      type="text"
                      value={r.desc}
                      onChange={ev => setResultats(prev => prev.map((x, j) => j === i ? { ...x, desc: ev.target.value } : x))}
                      placeholder="Description courte"
                      className={INPUT}
                    />
                  </div>
                ))}
              </div>
            </Section>

          </div>
        )}
      </div>
    </>
  )
}

// ── Helpers UI ────────────────────────────────────────────────────────────────

function Section({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <p className="text-xs font-semibold text-[#666] uppercase tracking-wider">{label}</p>
        {hint && <p className="text-[11px] text-[#AAA] mt-0.5">{hint}</p>}
      </div>
      {children}
    </div>
  )
}

function AddBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="self-start flex items-center gap-1.5 text-xs text-[#52B788] hover:text-[#2D6A4F] font-semibold transition-colors mt-0.5"
    >
      <Plus size={13} /> {label}
    </button>
  )
}

function RemoveBtn({ onClick, size = 14 }: { onClick: () => void; size?: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-[#CCC] hover:text-red-400 transition-colors shrink-0"
    >
      <Trash2 size={size} />
    </button>
  )
}

// ── Classes Tailwind partagées ────────────────────────────────────────────────

const INPUT =
  'h-[38px] bg-[#F5F5F3] border border-[#E5E5E5] rounded-xl px-3 text-sm text-[#333] placeholder:text-[#CCC] focus:outline-none focus:border-[#52B788] transition-colors'

const INPUT_WHITE =
  'h-[36px] bg-white border border-[#E5E5E5] rounded-lg px-3 text-sm text-[#333] placeholder:text-[#CCC] focus:outline-none focus:border-[#52B788] transition-colors'

const TEXTAREA =
  'bg-[#F5F5F3] border border-[#E5E5E5] rounded-xl px-4 py-3 text-sm text-[#333] placeholder:text-[#AAA] focus:outline-none focus:border-[#52B788] transition-colors resize-none'

const TEXTAREA_WHITE =
  'bg-white border border-[#E5E5E5] rounded-lg px-3 py-2 text-sm text-[#333] placeholder:text-[#CCC] focus:outline-none focus:border-[#52B788] transition-colors resize-none'
