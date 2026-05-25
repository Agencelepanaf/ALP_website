-- ─── Le Panaf — Schema Supabase ───────────────────────────────────────────────
-- Copiez-collez ce script dans l'éditeur SQL de votre projet Supabase.
-- ─────────────────────────────────────────────────────────────────────────────

-- Table : projet en cours (toujours une seule ligne, id = 1)
CREATE TABLE IF NOT EXISTS projet_en_cours (
  id          INTEGER PRIMARY KEY DEFAULT 1,
  nom         TEXT    NOT NULL DEFAULT '',
  ville       TEXT    NOT NULL DEFAULT '',
  service     TEXT    NOT NULL DEFAULT 'Création de site web',
  description TEXT    NOT NULL DEFAULT '',
  avancement  INTEGER NOT NULL DEFAULT 0 CHECK (avancement >= 0 AND avancement <= 100),
  lancement   TEXT    NOT NULL DEFAULT '',
  lien        TEXT,
  emoji       TEXT    NOT NULL DEFAULT '🏗️',
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Table : réalisations
CREATE TABLE IF NOT EXISTS realisations (
  id          UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT    UNIQUE NOT NULL,
  nom         TEXT    NOT NULL,
  ville       TEXT    NOT NULL DEFAULT '',
  type        TEXT    NOT NULL DEFAULT '',
  service     TEXT    NOT NULL DEFAULT 'Création de site web',
  annee       TEXT    NOT NULL DEFAULT '',
  description TEXT    NOT NULL DEFAULT '',
  gradient    TEXT    NOT NULL DEFAULT 'from-emerald-600/40 to-teal-500/20',
  accent      TEXT    NOT NULL DEFAULT 'bg-accent-green/10 text-accent-green',
  tag         TEXT    NOT NULL DEFAULT 'Projet ponctuel',
  lien        TEXT,
  ordre       INTEGER NOT NULL DEFAULT 99,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Données initiales ────────────────────────────────────────────────────────

-- Projet en cours (Hôtel Oasis — repris depuis les données hardcodées)
INSERT INTO projet_en_cours (id, nom, ville, service, description, avancement, lancement, lien, emoji)
VALUES (
  1,
  'Hôtel Oasis',
  'Marrakech, Maroc',
  'Création de site web',
  'Refonte complète du site de cet hôtel boutique 4 étoiles : stratégie de marque, design éditorial, moteur de réservation intégré et SEO bilingue français/anglais.',
  65,
  'Juillet 2026',
  NULL,
  '🏨'
)
ON CONFLICT (id) DO NOTHING;

-- Réalisations (reprises depuis les données hardcodées)
INSERT INTO realisations (slug, nom, ville, type, service, annee, description, gradient, accent, tag, lien, ordre)
VALUES
  (
    'restaurant-le-zin',
    'Le Zin',
    'Casablanca, Maroc',
    'Restaurant & bar',
    'Création de site web',
    '2025',
    'Site vitrine + carte digitale + intégration Google Business. Résultat : +42 % de réservations en ligne en 3 mois.',
    'from-emerald-600/40 to-teal-500/20',
    'bg-accent-green/10 text-accent-green',
    'Projet ponctuel',
    NULL,
    1
  ),
  (
    'cabinet-bennani',
    'Cabinet Bennani',
    'Rabat, Maroc',
    'Cabinet juridique',
    'Présence digitale',
    '2025',
    'Accompagnement mensuel : site web, contenus LinkedIn, SEO local. Positionnement en première page Google en 4 mois.',
    'from-blue-600/40 to-indigo-500/20',
    'bg-accent/10 text-accent',
    'Accompagnement continu',
    NULL,
    2
  ),
  (
    'agriconnect',
    'AgriConnect',
    'Abidjan, Côte d''Ivoire',
    'Startup Agritech',
    'Création de site web',
    '2025',
    'Landing page de lancement pour une startup qui connecte les agriculteurs aux acheteurs directs. Design rapide et SEO from day one.',
    'from-lime-600/40 to-green-500/20',
    'bg-accent-green/10 text-accent-green',
    'Projet ponctuel',
    NULL,
    3
  )
ON CONFLICT (slug) DO NOTHING;

-- ─── Sécurité : désactiver RLS (le client utilise la clé service côté serveur) ──
-- Si vous préférez activer RLS, créez une policy pour la clé service uniquement.
ALTER TABLE projet_en_cours DISABLE ROW LEVEL SECURITY;
ALTER TABLE realisations DISABLE ROW LEVEL SECURITY;
