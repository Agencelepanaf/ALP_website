'use client'

import { useState, useEffect, useRef, useActionState } from 'react'
import { setStatutAction } from '../actions'
import type { Projet, StatutProjet } from '@/lib/supabase'
import { Star, Clock, CircleCheck, X } from 'lucide-react'

type Props = { projet: Projet }

const STATUTS: {
  value: StatutProjet
  label: string
  description: string
  Icon: React.ElementType
  activeClass: string
  iconClass: string
}[] = [
  {
    value: 'vedette',
    label: 'Vedette',
    description: 'Mis en avant sur la page projets',
    Icon: Star,
    activeClass: 'border-amber-300 bg-amber-50',
    iconClass: 'text-amber-500',
  },
  {
    value: 'en_cours',
    label: 'En cours',
    description: 'Affiché avec badge "En cours"',
    Icon: Clock,
    activeClass: 'border-[#52B788] bg-[#52B788]/5',
    iconClass: 'text-[#2D6A4F]',
  },
  {
    value: 'termine',
    label: 'Terminé',
    description: 'Affiché dans les réalisations',
    Icon: CircleCheck,
    activeClass: 'border-[#CCC] bg-[#F5F5F3]',
    iconClass: 'text-[#888]',
  },
]

const initialState = { error: undefined as string | undefined, success: undefined as boolean | undefined }

export default function StatutButton({ projet }: Props) {
  const [open, setOpen] = useState(false)
  const [selectedStatut, setSelectedStatut] = useState<StatutProjet>(projet.statut)
  const [state, formAction, pending] = useActionState(setStatutAction, initialState)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const avDisplayId = `av-display-${projet.id}`

  useEffect(() => {
    if (state?.success) {
      const t = setTimeout(() => setOpen(false), 800)
      return () => clearTimeout(t)
    }
  }, [state?.success])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) { if (!dialog.open) dialog.showModal() }
    else { if (dialog.open) dialog.close() }
  }, [open])

  const showEnCoursFields = selectedStatut === 'vedette' || selectedStatut === 'en_cours'

  // Icône + couleur du bouton déclencheur dans la liste
  const TriggerIcon =
    projet.statut === 'vedette'  ? Star :
    projet.statut === 'en_cours' ? Clock :
                                   CircleCheck

  const triggerColor =
    projet.statut === 'vedette'  ? 'text-amber-400 hover:text-amber-500' :
    projet.statut === 'en_cours' ? 'text-[#52B788] hover:text-[#2D6A4F]' :
                                   'text-[#CCC] hover:text-[#999]'

  const triggerTitle =
    projet.statut === 'vedette'  ? 'Vedette — changer le statut' :
    projet.statut === 'en_cours' ? 'En cours — changer le statut' :
                                   'Terminé — changer le statut'

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title={triggerTitle}
        className={`shrink-0 transition-colors duration-150 ${triggerColor}`}
      >
        <TriggerIcon
          size={16}
          fill={projet.statut === 'vedette' ? 'currentColor' : 'none'}
        />
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        className="m-auto rounded-2xl border border-[#E5E5E5] bg-white p-0 shadow-2xl w-full max-w-sm backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      >
        <div className="p-6">

          {/* En-tête */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-[#1A1A1A]">Statut du projet</h2>
              <p className="text-sm text-[#888] mt-0.5">{projet.nom}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[#CCC] hover:text-[#666] transition-colors p-1.5 rounded-lg hover:bg-[#F5F5F3]"
            >
              <X size={17} />
            </button>
          </div>

          <form action={formAction} className="flex flex-col gap-4">
            <input type="hidden" name="id" value={projet.id} />

            {/* Sélecteur de statut */}
            <div className="flex flex-col gap-1.5">
              {STATUTS.map(({ value, label, description, Icon, activeClass, iconClass }) => (
                <label
                  key={value}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-150 ${
                    selectedStatut === value ? activeClass : 'border-[#E5E5E5] hover:border-[#D0D0D0]'
                  }`}
                >
                  <input
                    type="radio"
                    name="statut"
                    value={value}
                    checked={selectedStatut === value}
                    onChange={() => setSelectedStatut(value)}
                    className="sr-only"
                  />
                  <Icon
                    size={18}
                    className={selectedStatut === value ? iconClass : 'text-[#CCC]'}
                    fill={value === 'vedette' && selectedStatut === 'vedette' ? 'currentColor' : 'none'}
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold leading-none ${selectedStatut === value ? 'text-[#1A1A1A]' : 'text-[#555]'}`}>
                      {label}
                    </p>
                    <p className="text-xs text-[#999] mt-0.5">{description}</p>
                  </div>
                  {selectedStatut === value && (
                    <CircleCheck size={16} className={iconClass} fill="currentColor" />
                  )}
                </label>
              ))}
            </div>

            {/* Champs avancement — uniquement si en cours ou vedette */}
            {showEnCoursFields && (
              <div className="flex flex-col gap-3 pt-1 border-t border-[#F0F0F0]">

                <div className="grid grid-cols-[auto_1fr] gap-3 items-end">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#666] uppercase tracking-wider">Emoji</label>
                    <input
                      name="emoji"
                      defaultValue={projet.emoji ?? '🏗️'}
                      maxLength={4}
                      className="w-14 h-[42px] text-center text-xl bg-[#F5F5F3] border border-[#E5E5E5] rounded-xl focus:outline-none focus:border-[#52B788] transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#666] uppercase tracking-wider">Lancement prévu</label>
                    <input
                      name="lancement"
                      defaultValue={projet.lancement ?? ''}
                      placeholder="Ex : Juillet 2026"
                      className="h-[42px] bg-[#F5F5F3] border border-[#E5E5E5] rounded-xl px-3 text-sm text-[#333] placeholder:text-[#AAA] focus:outline-none focus:border-[#52B788] transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-[#666] uppercase tracking-wider">
                    Avancement —{' '}
                    <span id={avDisplayId} className="font-semibold text-[#2D6A4F]">
                      {projet.avancement ?? 0} %
                    </span>
                  </label>
                  <input
                    name="avancement"
                    type="range"
                    min={0} max={100} step={5}
                    defaultValue={projet.avancement ?? 0}
                    className="w-full accent-[#2D6A4F]"
                    onInput={(e) => {
                      const el = document.getElementById(avDisplayId)
                      if (el) el.textContent = (e.target as HTMLInputElement).value + ' %'
                    }}
                  />
                  <div className="flex justify-between text-xs text-[#AAA]">
                    <span>0 %</span><span>100 %</span>
                  </div>
                </div>

              </div>
            )}

            {/* Feedback */}
            {state?.error && (
              <p className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
                {state.error}
              </p>
            )}
            {state?.success && (
              <p className="flex items-center gap-2 bg-[#52B788]/10 border border-[#52B788]/30 rounded-xl px-4 py-3 text-sm text-[#2D6A4F] font-medium">
                Statut mis à jour !
              </p>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-1 border-t border-[#F0F0F0]">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-sm text-[#888] hover:text-[#333] px-4 py-2.5 rounded-xl hover:bg-[#F5F5F3] transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={pending || !!state?.success}
                className="inline-flex items-center gap-2 bg-[#2D6A4F] hover:bg-[#40916C] disabled:opacity-60 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              >
                {pending ? 'Enregistrement…' : 'Enregistrer'}
              </button>
            </div>

          </form>
        </div>
      </dialog>
    </>
  )
}
