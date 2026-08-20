import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Client serveur uniquement — utilise la clé service (ne jamais exposer côté client)
//
// Instancié paresseusement : lire process.env et appeler createClient() au
// chargement du module ferait planter `next build` dès que les variables
// Supabase ne sont pas présentes à la compilation (ex. build self-hosted sans
// secrets injectés), même sur des routes qui n'accèdent jamais à Supabase.
let client: SupabaseClient | null = null

function getClient(): SupabaseClient {
  if (client) return client

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Variables d\'environnement Supabase manquantes : SUPABASE_URL et SUPABASE_SERVICE_KEY sont requises.'
    )
  }

  client = createClient(supabaseUrl, supabaseKey)
  return client
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const real = getClient()
    const value = Reflect.get(real, prop, real)
    return typeof value === 'function' ? value.bind(real) : value
  },
})

// ─── Types de base ─────────────────────────────────────────────────────────────

export type StatutProjet = 'vedette' | 'en_cours' | 'termine'

// ─── Sous-types pour l'étude de cas ───────────────────────────────────────────

/** Un enjeu = une cellule de la grille "Pourquoi ce projet était différent" */
export type EnjeuBlock = {
  num: string    // "01" … "04"
  titre: string
  corps: string
}

/** Un bloc de la section "Approche" (direction artistique, UX, engagement…) */
export type ApprocheBlock = {
  titre: string
  corps: string
  citation?: string  // blockquote optionnel
}

/** Un outil de la stack technique */
export type OutilItem = {
  nom: string
  icone: string   // 2-3 caractères ou emoji affiché dans le badge
  desc: string    // rôle court : "Framework React", "Page builder", etc.
  couleur?: string // bg CSS optionnel pour le badge : "rgba(0,0,0,0.12)"
}

/** Un résultat / impact du projet */
export type ResultatItem = {
  icon: string   // caractère ou emoji : "↑", "⚡", "◎", "✓"…
  titre: string
  desc: string
}

// ─── Type principal Projet ────────────────────────────────────────────────────

export type ArticleStatut = 'brouillon' | 'publie'

export type Article = {
  id: string
  slug: string
  titre: string
  description: string
  contenu: string
  image_url: string | null
  statut: ArticleStatut
  published_at: string | null
  created_at: string
  updated_at: string
}

export type Projet = {
  id: number
  statut: StatutProjet
  nom: string
  slug: string | null
  ville: string
  service: string
  type: string | null       // type de client, affiché sur les cartes "terminé"
  description: string
  // Champs "en cours" / "vedette"
  avancement: number | null
  lancement: string | null
  emoji: string | null
  // Champs "terminé"
  annee: string | null
  tag: string | null
  gradient: string | null
  accent: string | null
  // Communs
  lien: string | null
  image_url: string | null
  ordre: number
  created_at: string
  updated_at: string
  // Étude de cas (ajoutés par la migration migrate-etude-de-cas.sql)
  statement: string | null
  enjeux: EnjeuBlock[] | null
  livrables: string[] | null
  approche: ApprocheBlock[] | null
  outils: OutilItem[] | null
  resultats: ResultatItem[] | null
}
