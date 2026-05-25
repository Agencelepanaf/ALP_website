'use client'

import { deleteProjetAction } from '../actions'
import { Trash2 } from 'lucide-react'

export default function DeleteButton({ id, nom }: { id: number; nom: string }) {
  return (
    <form action={deleteProjetAction}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        title="Supprimer"
        onClick={(e) => {
          if (!confirm(`Supprimer « ${nom} » ?`)) e.preventDefault()
        }}
        className="text-[#CCC] hover:text-red-400 transition-colors shrink-0"
      >
        <Trash2 size={15} />
      </button>
    </form>
  )
}
