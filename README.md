# Le Panaf — Site web

Site officiel de l'agence Le Panaf, agence de présence digitale pour les PME et les startups ambitieuses. Basée à Casablanca, Maroc.

## Stack technique

- **Framework** : Next.js 16 (App Router) — attention, conventions différentes des versions précédentes (voir `AGENTS.md`)
- **Langage** : TypeScript, React 19
- **Styling** : Tailwind CSS v4
- **Animations** : Framer Motion
- **Base de données** : Supabase (articles, réalisations, projet en cours)
- **Emails** : Resend (formulaire de contact)
- **Auth admin** : mot de passe + session JWT signée (`jose`)
- **Analytics** : GA4 / Meta Pixel, chargés après consentement (bannière cookies)
- **Polices** : Bangers + Luckiest Guy via `@fontsource`
- **Hébergement** : Hostinger (Node.js, build `standalone`)

## Installation

```bash
git clone <url-du-repo>
cd agencelepanaf.ma
npm install
cp .env.local.example .env.local   # puis renseigner les valeurs
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000).

| Script | Rôle |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production avec Webpack (`.next/standalone`) |
| `npm run start` | Lance le build de production |
| `npm run lint` | ESLint |

## Structure du projet

```
agencelepanaf.ma/
├── app/
│   ├── layout.tsx                 # Layout racine (Header, Footer, SEO, analytics)
│   ├── page.tsx                   # Accueil
│   ├── services/
│   │   ├── presence-digitale/     # Service présence digitale
│   │   └── creation-site-web/     # Service création de site web
│   ├── notre-methode/             # Méthode de travail
│   ├── realisations/              # Liste + [slug] (études de cas, depuis Supabase)
│   ├── blog/                      # Liste + [slug] (articles Markdown, depuis Supabase)
│   ├── sante/                     # Page Santé
│   ├── contact/                   # Page + formulaire (tracking GA4)
│   ├── mentions-legales/, politique-confidentialite/
│   ├── admin/                     # Back-office protégé
│   │   ├── login/                 # Connexion
│   │   ├── articles/              # Liste, nouveau, [id]
│   │   ├── realisations/          # Liste, nouveau, [id]
│   │   ├── projet-en-cours/
│   │   └── actions.ts             # Server Actions
│   ├── api/
│   │   ├── contact/route.ts       # Envoi du formulaire via Resend
│   │   └── admin/projet-en-cours/
│   ├── sitemap.ts, robots.ts, not-found.tsx
│   └── globals.css                # Tokens Tailwind v4 + styles globaux
├── components/
│   ├── Header.tsx, Footer.tsx
│   ├── AnalyticsProvider.tsx, CookieBanner*.tsx, ContactClickTracking.jsx
│   ├── admin/                     # Champs de formulaire admin
│   ├── projets/                   # Grille des réalisations
│   └── ui/                        # Button, Section, RevealOnScroll, WhatsAppFloat…
├── lib/
│   ├── auth.ts                    # Sessions JWT admin
│   ├── supabase.ts                # Client Supabase (initialisé à la demande)
│   ├── site.ts                    # Config du site
│   └── fonts.ts
├── data/                          # Scripts SQL (seed, migrations)
├── proxy.ts                       # Protection /admin + headers (ex-middleware)
├── next.config.mjs                # standalone, images Supabase, redirections, headers
├── .github/dependabot.yml         # Surveillance des dépendances
└── CONTENU.md                     # Textes du site
```

## Variables d'environnement

Copier `.env.local.example` en `.env.local` et renseigner :

| Variable | Description | Obligatoire |
|---|---|---|
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | ID Google Analytics 4 (`G-XXXXXXXXXX`) | Non |
| `NEXT_PUBLIC_META_PIXEL_ID` | ID Meta Pixel | Non |
| `RESEND_API_KEY` | Clé API Resend | Oui (contact) |
| `CONTACT_EMAIL_TO` | Email de réception des formulaires | Oui (contact) |
| `SUPABASE_URL` | URL du projet Supabase | Oui |
| `SUPABASE_SERVICE_KEY` | Clé service Supabase (serveur uniquement) | Oui |
| `ADMIN_PASSWORD` | Mot de passe de `/admin/login` | Oui |
| `ADMIN_JWT_SECRET` | Secret de signature des sessions (≥ 32 caractères, `openssl rand -base64 32`) | Oui |

Les variables préfixées `NEXT_PUBLIC_` sont exposées côté client : ne jamais y mettre de secrets. Les variables `NEXT_PUBLIC_` sont figées au build : relancer un build après modification.

## Base de données

Les scripts de `data/` s'exécutent dans l'éditeur SQL de Supabase :
- `seed.sql` — schéma et données initiales
- `migrate-articles.sql`, `migrate-etude-de-cas.sql` — migrations
- `seed-pnrtaxi.sql` — exemple d'étude de cas

Les images sont servies depuis le Storage public Supabase (hostname restreint dans `next.config.ts`).

## Déploiement (Hostinger Node.js)

Le build utilise `output: "standalone"` : `next build` génère un `server.js` minimal dans `.next/standalone`.

1. Connecter le dépôt GitHub dans hPanel (déploiement auto sur push de `master`)
2. Commande de build : `npm run build` — démarrage : `npm run start`
3. Le build utilise Webpack (`next build --webpack`) et `next.config.mjs` : la glibc du serveur est trop ancienne pour le SWC natif, et Turbopack ne fonctionne pas avec le repli WebAssembly. Ne pas repasser à Turbopack ni à `next.config.ts`.
4. Renseigner toutes les variables d'environnement dans hPanel, puis relancer un build

## Administration

`/admin` est protégé par `proxy.ts` : sans session valide, redirection vers `/admin/login`. On y gère les articles du blog, les réalisations et le bloc « projet en cours ».

## Modifier le contenu

Les textes de référence sont dans `CONTENU.md` ; les textes affichés sont dans les pages de `app/`. Articles et réalisations se gèrent depuis l'admin.

## Performance

Cible Lighthouse : 90+ sur tous les axes.
- Toujours utiliser `next/image`
- `RevealOnScroll` avec parcimonie (6 éléments animés max par section)

## Identité visuelle

Tokens définis dans `app/globals.css` :

| Token | Valeur | Usage |
|---|---|---|
| `background` | `#F5F5F0` | Fond principal |
| `surface` | `#FFFFFF` | Cartes, blocs |
| `foreground` | `#0D0D0D` | Texte principal |
| `foreground-muted` | `#5C5C5A` | Texte secondaire |
| `accent` | `#C8553D` | Accent primaire, CTA |
| `accent-green` | `#2D4A3E` | Accent secondaire |
| `dark` | `#111110` | Sections sombres |
| `border` | `#E2E2DC` | Bordures |
