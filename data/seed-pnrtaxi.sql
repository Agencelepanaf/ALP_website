-- ─── PNR Taxi — Création + étude de cas complète ─────────────────────────────
-- Copiez-collez ce script dans l'éditeur SQL de votre projet Supabase.
-- Met à jour le projet si le slug 'pnr-taxi' existe déjà,
-- sinon crée le projet complet.
-- ─────────────────────────────────────────────────────────────────────────────

DO $$
DECLARE
  v_statement  TEXT;
  v_enjeux     JSONB;
  v_livrables  JSONB;
  v_approche   JSONB;
  v_outils     JSONB;
  v_resultats  JSONB;
BEGIN

  -- ── Données ──────────────────────────────────────────────────────────────────

  v_statement := 'Un site qui ne présente pas des services.
Un site qui vend une expérience.';

  v_enjeux := '[
    {"num":"01","titre":"Visibilité digitale","corps":"Socotaxi existait sur le terrain, pas sur le web. L''objectif était de créer une présence digitale forte et identifiable dans l''écosystème transport congolais."},
    {"num":"02","titre":"Crédibilité & confiance","corps":"Dans le transport, la confiance est tout. Le site devait transmettre professionnalisme et fiabilité dès les premières secondes — sans texte, juste par le design."},
    {"num":"03","titre":"Information & conversion","corps":"Présenter clairement les offres (abonnements, réservations, flotte) tout en guidant naturellement vers le contact et l''action."},
    {"num":"04","titre":"Valeur perçue premium","corps":"Se distinguer de la concurrence en positionnant PNR Taxi non pas comme un simple taxi, mais comme un service de transport haut de gamme, fiable et moderne."}
  ]'::jsonb;

  v_livrables := '["Site web vitrine"]'::jsonb;

  v_approche := '[
    {"titre":"Direction artistique & identité premium","corps":"Le brief était clair : PNR Taxi ne devait pas ressembler à un site de taxi ordinaire. Nous avons construit une direction artistique forte — charge graphique remarquable, palette sombre et contrastée, typographie impactante.\n\nL''objectif n''était pas de faire joli. C''était d''installer une valeur perçue élevée dès le premier scroll, de sorte que le visiteur ressente instinctivement : c''est sérieux, c''est professionnel, je peux leur faire confiance.","citation":"Un design premium, c''est un argument commercial silencieux. Il parle avant même que le client ait lu une ligne."},
    {"titre":"Expérience utilisateur & parcours clair","corps":"Le site est pensé comme un entonnoir naturel : attirer l''attention, présenter les services, lever les objections, et faciliter le contact. Chaque section a un rôle précis dans ce parcours.\n\nL''architecture de l''information a été simplifiée au maximum : l''utilisateur sait immédiatement ce que fait Socotaxi, ce qu''il peut obtenir, et comment l''obtenir — en moins de 30 secondes.","citation":"Un visiteur qui hésite est un visiteur perdu. La clarté du parcours, c''est de la conversion gratuite."},
    {"titre":"Engagement direct via WhatsApp","corps":"Intégration d''un chat WhatsApp natif : le canal préféré des clients en Afrique centrale. Pas de formulaire, pas d''email. Un clic, et la conversation commence.\n\nCe choix n''est pas anodin. Il répond à une réalité terrain : le mobile est dominant, WhatsApp est universel. En alignant le site sur les habitudes réelles des utilisateurs, on élimine les frictions à la conversion."}
  ]'::jsonb;

  v_outils := '[
    {"nom":"WordPress","icone":"WP", "desc":"CMS principal",    "couleur":"rgba(33,117,155,0.15)"},
    {"nom":"Elementor", "icone":"EL", "desc":"Page builder",     "couleur":"rgba(155,81,224,0.15)"},
    {"nom":"WhatsApp",  "icone":"W",  "desc":"Chat direct",      "couleur":"rgba(37,211,102,0.15)"},
    {"nom":"Analytics", "icone":"GA", "desc":"Google Analytics", "couleur":"rgba(249,171,52,0.15)"},
    {"nom":"MySQL",     "icone":"SQL","desc":"Base de données",  "couleur":"rgba(0,117,143,0.15)"}
  ]'::jsonb;

  v_resultats := '[
    {"icon":"↑", "titre":"Forte valeur perçue","desc":"Un design premium qui positionne Socotaxi comme le leader du transport à Pointe-Noire, bien au-delà de ses concurrents."},
    {"icon":"⚡","titre":"Engagement direct",   "desc":"Le chat WhatsApp intégré crée un canal de conversion frictionless, adapté aux habitudes réelles des utilisateurs locaux."},
    {"icon":"◎", "titre":"Visibilité digitale", "desc":"Suivi Google Analytics en temps réel — données de trafic, comportement visiteur, sources d''acquisition entièrement tracées."}
  ]'::jsonb;

  -- ── Upsert manuel ────────────────────────────────────────────────────────────

  IF EXISTS (SELECT 1 FROM projets WHERE slug = 'pnr-taxi') THEN

    UPDATE projets SET
      nom         = 'PNR Taxi',
      ville       = 'Pointe-Noire, Congo',
      service     = 'Création de site web',
      type        = 'Transport / Taxi',
      description = 'Transformer une flotte de taxis en marque digitale premium, capable d''instiller confiance, désirabilité et engagement dès le premier regard.',
      lien        = 'https://pnrtaxi.com',
      gradient    = 'from-amber-600/40 to-yellow-500/20',
      accent      = 'bg-accent/10 text-accent',
      tag         = 'Site web vitrine',
      annee       = '2025',
      statement   = v_statement,
      enjeux      = v_enjeux,
      livrables   = v_livrables,
      approche    = v_approche,
      outils      = v_outils,
      resultats   = v_resultats,
      updated_at  = NOW()
    WHERE slug = 'pnr-taxi';

    RAISE NOTICE 'PNR Taxi mis à jour (slug: pnr-taxi)';

  ELSE

    INSERT INTO projets (
      statut, nom, slug, ville, service, type, description,
      lien, gradient, accent, tag, annee, ordre,
      statement, enjeux, livrables, approche, outils, resultats
    ) VALUES (
      'termine',
      'PNR Taxi',
      'pnr-taxi',
      'Pointe-Noire, Congo',
      'Création de site web',
      'Transport / Taxi',
      'Transformer une flotte de taxis en marque digitale premium, capable d''instiller confiance, désirabilité et engagement dès le premier regard.',
      'https://pnrtaxi.com',
      'from-amber-600/40 to-yellow-500/20',
      'bg-accent/10 text-accent',
      'Site web vitrine',
      '2025',
      10,
      v_statement,
      v_enjeux,
      v_livrables,
      v_approche,
      v_outils,
      v_resultats
    );

    RAISE NOTICE 'PNR Taxi créé (slug: pnr-taxi)';

  END IF;

END;
$$;
