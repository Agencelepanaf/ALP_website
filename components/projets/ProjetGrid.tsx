"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Projet } from "@/lib/supabase";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

type FilterKey = "tous" | "en_cours" | "termine" | string;

interface ProjetGridProps {
  projets: Projet[];
}

export default function ProjetGrid({ projets }: ProjetGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("tous");

  // Build unique service list (only if > 1 distinct service exists)
  const services = [...new Set(projets.map((p) => p.service))].sort();
  const showServiceFilters = services.length > 1;

  const hasEnCours = projets.some((p) => p.statut === "en_cours");
  const hasTermine = projets.some((p) => p.statut === "termine");

  const filters: { key: FilterKey; label: string; count: number }[] = [
    { key: "tous", label: "Tous", count: projets.length },
    ...(hasEnCours
      ? [
          {
            key: "en_cours" as FilterKey,
            label: "En cours",
            count: projets.filter((p) => p.statut === "en_cours").length,
          },
        ]
      : []),
    ...(hasTermine
      ? [
          {
            key: "termine" as FilterKey,
            label: "Livrés",
            count: projets.filter((p) => p.statut === "termine").length,
          },
        ]
      : []),
    ...(showServiceFilters
      ? services.map((s) => ({
          key: `service:${s}`,
          label: s,
          count: projets.filter((p) => p.service === s).length,
        }))
      : []),
  ];

  const filtered = projets.filter((p) => {
    if (activeFilter === "tous") return true;
    if (activeFilter === "en_cours") return p.statut === "en_cours";
    if (activeFilter === "termine") return p.statut === "termine";
    if (activeFilter.startsWith("service:"))
      return p.service === activeFilter.replace("service:", "");
    return true;
  });

  return (
    <div>
      {/* ── Filter bar ── */}
      {filters.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                activeFilter === f.key
                  ? "bg-foreground text-background shadow-sm"
                  : "bg-background border border-border text-foreground-muted hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              {f.label}
              <span
                className={`text-[10px] tabular-nums ${
                  activeFilter === f.key ? "opacity-50" : "opacity-35"
                }`}
              >
                {f.count}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* ── Grid ── */}
      {filtered.length === 0 ? (
        <p className="text-sm text-foreground-muted py-16 text-center">
          Aucun projet dans cette catégorie.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <RevealOnScroll key={p.id} delay={Math.min(i * 0.06, 0.3)}>
              <ProjetCard projet={p} />
            </RevealOnScroll>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Individual card ───────────────────────────────────────────────────────────

function ProjetCard({ projet }: { projet: Projet }) {
  const isEnCours = projet.statut === "en_cours";
  const hasLink = Boolean(projet.lien && projet.lien !== "#");

  const meta = [projet.type ?? projet.service, projet.ville, projet.annee]
    .filter(Boolean)
    .join(" · ");

  const cardInner = (
    <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-dark-surface">
      {/* ── Background: image or gradient ── */}
      {projet.image_url ? (
        <Image
          src={projet.image_url}
          alt={projet.nom}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div
          className={`absolute inset-0 flex items-center justify-center ${
            projet.gradient
              ? `bg-gradient-to-br ${projet.gradient}`
              : "bg-gradient-to-br from-accent-green/20 to-dark"
          }`}
        >
          {projet.emoji && (
            <span className="text-7xl opacity-25 select-none pointer-events-none">
              {projet.emoji}
            </span>
          )}
        </div>
      )}

      {/* ── Permanent overlay gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

      {/* ── Status / service badge ── */}
      <div className="absolute top-4 left-4 z-10">
        {isEnCours ? (
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 text-xs font-medium text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
            En cours
          </span>
        ) : (
          <span className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 text-xs font-medium text-white">
            {projet.service}
          </span>
        )}
      </div>

      {/* ── Bottom content (slides up on hover) ── */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300 ease-out">
        {meta && (
          <p className="text-[11px] text-white/45 mb-1 font-medium tracking-wide truncate">
            {meta}
          </p>
        )}
        <h3 className="font-display text-xl text-white leading-tight mb-0 group-hover:mb-3 transition-[margin] duration-300">
          {projet.nom}
        </h3>

        {/* CTA */}
        {hasLink && (
          <span className="overflow-hidden max-h-0 group-hover:max-h-8 transition-[max-height] duration-300 ease-out flex items-center gap-1 text-xs font-semibold text-accent-green pt-0.5">
            Voir le site →
          </span>
        )}
      </div>
    </div>
  );

  if (hasLink) {
    return (
      <Link
        href={projet.lien!}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Voir le projet ${projet.nom}`}
      >
        {cardInner}
      </Link>
    );
  }

  return cardInner;
}
