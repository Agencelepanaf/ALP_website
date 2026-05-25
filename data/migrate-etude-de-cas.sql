-- ─── Migration : champs "étude de cas" pour la table projets ─────────────────
-- À exécuter dans l'éditeur SQL de votre projet Supabase (une seule fois).
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE projets
  ADD COLUMN IF NOT EXISTS statement  TEXT,
  ADD COLUMN IF NOT EXISTS enjeux     JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS livrables  JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS approche   JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS outils     JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS resultats  JSONB DEFAULT '[]'::jsonb;

-- ─── Structure attendue par colonne ──────────────────────────────────────────
--
-- statement  : TEXT
--   "Un site qui ne présente pas des services.\nUn site qui vend une expérience."
--
-- enjeux     : JSONB  →  Array<{ num: string; titre: string; corps: string }>
--   [{"num":"01","titre":"Visibilité digitale","corps":"..."},
--    {"num":"02","titre":"Crédibilité & confiance","corps":"..."},
--    {"num":"03","titre":"Information & conversion","corps":"..."},
--    {"num":"04","titre":"Valeur perçue premium","corps":"..."}]
--
-- livrables  : JSONB  →  Array<string>
--   ["Site web optimisé SEO","SEO technique","Formation & documentation"]
--
-- approche   : JSONB  →  Array<{ titre: string; corps: string; citation?: string }>
--   [{"titre":"Direction artistique","corps":"...","citation":"..."},
--    {"titre":"Expérience utilisateur","corps":"..."},
--    {"titre":"Engagement direct","corps":"...","citation":"..."}]
--
-- outils     : JSONB  →  Array<{ nom: string; icone: string; desc: string }>
--   [{"nom":"Next.js","icone":"N","desc":"Framework React"},
--    {"nom":"Supabase","icone":"S","desc":"Base de données"}]
--
-- resultats  : JSONB  →  Array<{ icon: string; titre: string; desc: string }>
--   [{"icon":"↑","titre":"Valeur perçue élevée","desc":"..."},
--    {"icon":"⚡","titre":"Engagement direct","desc":"..."},
--    {"icon":"◎","titre":"Visibilité digitale","desc":"..."}]
