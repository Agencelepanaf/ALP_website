'use client'

import { deleteArticleAction } from './actions'
import { Trash2 } from 'lucide-react'

export default function DeleteArticleButton({ id, slug, titre }: { id: string; slug: string; titre: string }) {
  return (
    <form action={deleteArticleAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="slug" value={slug} />
      <button
        type="submit"
        title="Supprimer"
        onClick={(e) => {
          if (!confirm(`Supprimer « ${titre} » ?`)) e.preventDefault()
        }}
        className="text-[#CCC] hover:text-red-400 transition-colors shrink-0"
      >
        <Trash2 size={15} />
      </button>
    </form>
  )
}
