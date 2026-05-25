import { redirect } from 'next/navigation'

// Cette page est remplacée par la gestion du statut directement dans /admin/realisations
export default function OldProjetEnCoursPage() {
  redirect('/admin/realisations')
}
