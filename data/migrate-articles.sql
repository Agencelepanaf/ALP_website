-- ─── Le Panaf — Table articles (blog) ────────────────────────────────────────
-- Copiez-collez ce script dans l'éditeur SQL de votre projet Supabase.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS articles (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT        UNIQUE NOT NULL,
  titre        TEXT        NOT NULL,
  description  TEXT        NOT NULL DEFAULT '',
  contenu      TEXT        NOT NULL DEFAULT '',
  image_url    TEXT,
  statut       TEXT        NOT NULL DEFAULT 'brouillon'
                           CHECK (statut IN ('brouillon', 'publie')),
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Si la table existe déjà, ajouter la colonne image_url :
-- ALTER TABLE articles ADD COLUMN IF NOT EXISTS image_url TEXT;

ALTER TABLE articles DISABLE ROW LEVEL SECURITY;
