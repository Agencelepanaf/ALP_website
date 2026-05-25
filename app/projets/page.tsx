import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { supabase } from "@/lib/supabase";
import type { Projet } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Nos projets — Le Panaf",
  description:
    "Découvrez les sites web et accompagnements digitaux réalisés par Le Panaf pour des PME, hôtels, restaurants et startups au Maroc et en Afrique.",
};

async function getData(): Promise<{
  projetVedette: Projet | null;
  projetsEnCours: Projet[];
  realisations: Projet[];
}> {
  const { data } = await supabase
    .from("projets")
    .select("*")
    .order("ordre", { ascending: true });

  const tous = data ?? [];
  return {
    projetVedette: tous.find((p) => p.statut === "vedette") ?? null,
    projetsEnCours: tous.filter((p) => p.statut === "en_cours"),
    realisations: tous.filter((p) => p.statut === "termine"),
  };
}

// ──────────────────────────────────────────────────────────────────────────────

/** Retourne true uniquement si le projet a un slug ET au moins un contenu
 *  d'étude de cas renseigné (statement, enjeux, approche ou résultats). */
function hasEtudeDeCas(p: Projet): boolean {
  if (!p.slug) return false;
  return Boolean(
    p.statement?.trim() ||
    p.enjeux?.some((e) => e.titre) ||
    (p.approche?.length ?? 0) > 0 ||
    p.resultats?.some((r) => r.titre)
  );
}

export default async function ProjetsPage() {
  const { projetVedette, projetsEnCours, realisations } = await getData();

  return (
    <div>

      {/* ── HERO ── */}
      <section className="px-4 sm:px-6 lg:px-8 pt-24 pb-10 md:pb-14 bg-background border-b border-border">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <p className="text-xs font-semibold tracking-widest uppercase text-foreground-muted mb-4">
              Notre travail
            </p>
            <h1 className="font-display text-4xl md:text-6xl text-foreground mb-5 max-w-2xl leading-tight">
              Nos projets
            </h1>
            <p className="text-base text-foreground-muted leading-relaxed">
              Sites web, présence digitale, stratégie de contenu — pour les entreprises qui veulent être trouvées, comprises et choisies.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* ── PROJET VEDETTE ── */}
      {projetVedette && (
        <section id="en-cours" className="px-4 sm:px-6 lg:px-8 py-10 md:py-14 bg-dark overflow-hidden relative">
          <div className="absolute inset-0 bg-accent-green/5 pointer-events-none" />
          <div className="max-w-6xl mx-auto relative">

            <RevealOnScroll>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                <p className="text-xs font-semibold tracking-widest uppercase text-dark-muted">
                  Projet en cours
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

              {/* Visuel */}
              <RevealOnScroll>
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-white/10 bg-linear-to-br from-amber-500/30 to-orange-600/20">
                  {projetVedette.image_url ? (
                    <Image
                      src={projetVedette.image_url}
                      alt={projetVedette.nom}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-5xl mb-3">{projetVedette.emoji}</p>
                        <p className="text-sm text-white/40 font-medium">Aperçu à venir</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                    <span className="text-xs font-medium text-white">En cours</span>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Infos */}
              <RevealOnScroll delay={0.08}>
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-xs font-semibold tracking-wider uppercase text-dark-muted mb-1">
                      {projetVedette.service} · {projetVedette.ville}
                    </p>
                    <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
                      {projetVedette.nom}
                    </h2>
                    <p className="text-sm text-dark-muted leading-relaxed">
                      {projetVedette.description}
                    </p>
                  </div>

                  {/* Lien si disponible */}
                  {projetVedette.lien && (
                    <Link
                      href={projetVedette.lien}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-accent-green hover:text-white transition-colors"
                    >
                      Voir le site →
                    </Link>
                  )}
                </div>
              </RevealOnScroll>

            </div>
          </div>
        </section>
      )}

      {/* ── GRILLE : EN COURS + RÉALISATIONS ── */}
      {(projetsEnCours.length > 0 || realisations.length > 0) && (
        <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-14 bg-surface">
          <div className="max-w-6xl mx-auto">

            <RevealOnScroll>
              <p className="text-xs font-semibold tracking-widest uppercase text-foreground-muted mb-2">
                Tous les projets
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-10">
                Réalisations
              </h2>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* ── Projets en cours (avec badge) ── */}
              {projetsEnCours.map((p, i) => {
                const cardContent = (
                  <div className="bg-dark rounded-2xl overflow-hidden border border-white/10 hover:border-accent-green/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex flex-col h-full group">

                    <div className="aspect-video relative flex items-end p-4 overflow-hidden bg-linear-to-br from-accent-green/20 to-accent-green/5">
                      {p.image_url ? (
                        <Image src={p.image_url} alt={p.nom} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="text-4xl opacity-60">{p.emoji}</span>
                        </div>
                      )}
                      <div className="relative flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                        <span className="text-xs font-medium text-white">En cours</span>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1 gap-3">
                      <div>
                        <p className="text-xs text-dark-muted mb-1">{p.service} · {p.ville}</p>
                        <h3 className="font-display text-xl text-white mb-2 group-hover:text-accent-green transition-colors duration-200">
                          {p.nom}
                        </h3>
                        <p className="text-sm text-dark-muted leading-relaxed">{p.description}</p>
                      </div>

                      {/* Indicateur étude de cas */}
                      {hasEtudeDeCas(p) && (
                        <div className="mt-auto pt-3 border-t border-white/10">
                          <span className="text-xs font-semibold text-accent-green/70 group-hover:text-accent-green transition-colors duration-200">
                            Voir l&apos;étude de cas →
                          </span>
                        </div>
                      )}
                    </div>

                  </div>
                );

                return (
                  <RevealOnScroll key={`enc-${p.id}`} delay={i * 0.07}>
                    {hasEtudeDeCas(p) ? (
                      <Link href={`/projets/${p.slug}`} className="block h-full">
                        {cardContent}
                      </Link>
                    ) : (
                      cardContent
                    )}
                  </RevealOnScroll>
                );
              })}

              {/* ── Réalisations terminées ── */}
              {realisations.map((projet, i) => {
                const cardContent = (
                  <div className="bg-background rounded-2xl overflow-hidden border border-border hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex flex-col h-full group">

                    <div className={`aspect-video relative flex items-end p-4 overflow-hidden ${!projet.image_url ? `bg-linear-to-br ${projet.gradient}` : ''}`}>
                      {projet.image_url && (
                        <Image
                          src={projet.image_url}
                          alt={projet.nom}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      )}
                      <span className="relative z-10 text-xs font-semibold px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/15">
                        {projet.service}
                      </span>
                    </div>

                    <div className="p-5 flex flex-col flex-1 gap-3">
                      <div>
                        <p className="text-xs text-foreground-muted mb-1">
                          {projet.type} · {projet.ville} · {projet.annee}
                        </p>
                        <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-accent transition-colors duration-200">
                          {projet.nom}
                        </h3>
                        <p className="text-sm text-foreground-muted leading-relaxed">{projet.description}</p>
                      </div>

                      <div className="mt-auto pt-3 border-t border-border">
                        {hasEtudeDeCas(projet) ? (
                          <span className="text-sm font-semibold text-foreground-muted group-hover:text-accent transition-colors duration-200">
                            Voir l&apos;étude de cas →
                          </span>
                        ) : projet.lien && projet.lien !== '#' ? (
                          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground-muted group-hover:text-accent transition-colors duration-200">
                            Voir le site →
                          </span>
                        ) : null}
                      </div>
                    </div>

                  </div>
                );

                return (
                  <RevealOnScroll key={projet.id} delay={(projetsEnCours.length + i) * 0.07}>
                    {hasEtudeDeCas(projet) ? (
                      <Link href={`/projets/${projet.slug}`} className="block h-full">
                        {cardContent}
                      </Link>
                    ) : projet.lien && projet.lien !== '#' ? (
                      <Link href={projet.lien} target="_blank" rel="noopener noreferrer" className="block h-full">
                        {cardContent}
                      </Link>
                    ) : (
                      cardContent
                    )}
                  </RevealOnScroll>
                );
              })}

            </div>
          </div>
        </section>
      )}

      {/* ── CTA FINAL ── */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <RevealOnScroll>
            <div className="bg-dark rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
              <h2 className="font-display text-3xl md:text-4xl text-white mb-4 relative">
                Votre projet, c&apos;est le prochain ?
              </h2>
              <p className="text-white/60 mb-8 text-sm max-w-md mx-auto relative">
                Parlez-nous de votre entreprise — nous vous répondons sous 24 h.
              </p>
              <Button href="/contact" variant="primary" className="text-sm px-8 py-4 relative">
                Discutons du projet →
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

    </div>
  );
}
