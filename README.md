# Le Panaf — Site web

Site officiel de l'agence Le Panaf, agence de présence digitale pour les PME et les STARTUPS ambitieuses. Basée à Casablanca, Maroc.

## Stack technique

- **Framework** : Next.js 15 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS v4
- **Animations** : Framer Motion
- **Hébergement** : Vercel
- **Polices** : Inter + Instrument Serif (Google Fonts via `next/font`)

## Installation

```bash
# Cloner le dépôt
git clone <url-du-repo>
cd agencelepanaf.ma

# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.local.example .env.local
# Renseigner les valeurs dans .env.local

# Démarrer le serveur de développement
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000).

## Structure du projet

```
agencelepanaf.ma/
├── app/
│   ├── layout.tsx                        # Layout racine (Header, Footer, SEO global)
│   ├── page.tsx                          # Page d'accueil
│   ├── globals.css                       # Styles globaux + tokens Tailwind v4
│   ├── sitemap.ts                        # Sitemap généré automatiquement
│   ├── robots.ts                         # robots.txt
│   ├── services/
│   │   ├── presence-digitale/page.tsx    # Service présence digitale
│   │   └── creation-site-web/page.tsx   # Service création de site web
│   ├── methode/page.tsx                  # Page méthode de travail
│   ├── contact/
│   │   ├── page.tsx                      # Page contact
│   │   └── ContactForm.tsx              # Formulaire client (form + fetch)
│   ├── mentions-legales/page.tsx
│   ├── politique-confidentialite/page.tsx
│   └── api/
│       └── contact/route.ts             # API route — log temporaire, brancher Resend
├── components/
│   ├── Header.tsx                        # Navigation sticky responsive
│   ├── Footer.tsx                        # Footer minimaliste
│   └── ui/
│       ├── Button.tsx                    # Variantes primary / secondary / ghost
│       ├── Section.tsx                   # Wrapper de section avec padding cohérent
│       ├── RevealOnScroll.tsx            # Animation d'apparition au scroll (Framer)
│       └── MarqueeLogos.tsx             # Placeholder logos clients (commenté)
├── lib/
│   └── fonts.ts                          # Import Google Fonts (Inter + Instrument Serif)
├── public/
│   ├── logo.svg                          # Logo version fond clair
│   └── logo-white.svg                   # Logo version fond sombre
├── .env.local.example                    # Exemple de variables d'environnement
└── CONTENU.md                            # Tous les textes du site
```

## Variables d'environnement

Copier `.env.local.example` en `.env.local` et renseigner :

| Variable | Description | Obligatoire |
|---|---|---|
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | ID Google Analytics 4 (ex: `G-XXXXXXXXXX`) | Non |
| `NEXT_PUBLIC_META_PIXEL_ID` | ID Meta Pixel | Non |
| `RESEND_API_KEY` | Clé API Resend pour l'envoi d'emails | À brancher |
| `CONTACT_EMAIL_TO` | Email de réception des formulaires | À brancher |

Les variables préfixées `NEXT_PUBLIC_` sont exposées côté client. Ne jamais y mettre de secrets.

## Brancher l'envoi d'emails

Le formulaire de contact envoie les données vers `/api/contact/route.ts`. Actuellement, les données sont seulement loggées. Pour activer l'envoi d'emails :

1. Installer Resend : `npm install resend`
2. Ouvrir `app/api/contact/route.ts`
3. Suivre les instructions dans les commentaires du fichier

## Déploiement sur Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Configurer les variables d'environnement dans le dashboard Vercel
# Project Settings > Environment Variables
```

Ou connecter le dépôt GitHub directement dans le dashboard Vercel pour le CI/CD automatique.

### Domaine personnalisé

1. Dans Vercel Dashboard → Project → Settings → Domains
2. Ajouter `lepanaf.com` et `www.lepanaf.com`
3. Configurer les DNS chez votre registrar selon les instructions Vercel

## Modifier le contenu

Tous les textes sont centralisés dans `CONTENU.md`. Les textes dans le code sont directement dans les fichiers de pages — chercher dans `app/` pour localiser un texte précis.

## Performance

Cible Lighthouse : 90+ sur tous les axes (Performance, Accessibilité, Bonnes pratiques, SEO).

Points d'attention :
- Toujours utiliser `next/image` pour les images
- Utiliser `RevealOnScroll` avec parcimonie (éviter d'animer plus de 6 éléments par section)
- Les polices sont chargées via `next/font` — pas d'import CSS externe

## Identité visuelle

| Token | Valeur | Usage |
|---|---|---|
| `background` | `#FAFAF7` | Fond principal |
| `foreground` | `#0F0F0E` | Texte principal |
| `accent-terra` | `#C8553D` | Accent primaire, CTA |
| `accent-green` | `#2D4A3E` | Accent secondaire |
| `gray-muted` | `#6B6B68` | Texte secondaire |
| `gray-border` | `#D4D4CE` | Bordures |
