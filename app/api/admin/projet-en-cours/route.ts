import { supabase } from '@/lib/supabase'
import { getAdminSession } from '@/lib/auth'

// Retourne le projet "vedette" — utilisé par le teaser homepage
export async function GET() {
  const isAuth = await getAdminSession()
  if (!isAuth) {
    return new Response(JSON.stringify({ error: 'Non autorisé' }), { status: 401 })
  }

  const { data, error } = await supabase
    .from('projets')
    .select('*')
    .eq('statut', 'vedette')
    .single()

  if (error && error.code !== 'PGRST116') {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  const defaults = {
    nom: '',
    ville: '',
    service: 'Création de site web',
    description: '',
    avancement: 0,
    lancement: '',
    lien: '',
    emoji: '🏗️',
  }

  return Response.json(data ?? defaults)
}
