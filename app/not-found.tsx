import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page introuvable — Le Panaf",
};

export default function NotFound() {
  return (
    <div
      className="h-[100dvh] bg-dark flex flex-col overflow-hidden relative"
      style={{ paddingTop: "80px" }}
    >

      {/* Grille décorative de fond */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#FAFAF7 1px, transparent 1px), linear-gradient(90deg, #FAFAF7 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Halo accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

      {/* Contenu centré — tout en un seul écran */}
      <main className="flex-1 flex flex-col items-center justify-between px-6 text-center relative z-10 py-6">

        {/* 404 typographique */}
        <div className="relative select-none flex-shrink-0">
          <span
            className="block text-[clamp(6rem,18vw,14rem)] leading-none text-white/[0.04] font-bold tracking-tighter"
            aria-hidden
          >
            404
          </span>
          <span
            className="absolute inset-0 flex items-center justify-center text-[clamp(4rem,12vw,9rem)] leading-none text-accent"
            style={{
              fontFamily: "'Bangers', sans-serif",
              letterSpacing: "0.06em",
              textShadow: "4px 4px 0px rgba(200,85,61,0.2)",
            }}
          >
            404
          </span>
        </div>

        {/* Bloc central : titre + description */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="font-display font-light text-white text-2xl sm:text-3xl md:text-4xl leading-[1.2] max-w-lg">
            Cette page n&rsquo;a pas <br />
            <em>de présence digitale.</em>
          </h1>
          <p className="text-dark-muted text-sm max-w-xs leading-relaxed">
            Contrairement à votre entreprise — qui mérite d&rsquo;être visible.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-accent text-white text-sm font-semibold px-7 py-3 rounded-full hover:bg-accent-hover active:scale-95 transition-all duration-200"
          >
            ← Retour à l&rsquo;accueil
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white text-sm font-semibold px-7 py-3 rounded-full hover:bg-white/10 active:scale-95 transition-all duration-200"
          >
            Discuter du projet
          </Link>
        </div>

        {/* Navigation rapide + copyright */}
        <div className="flex flex-col items-center gap-3 flex-shrink-0">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              { label: "Présence digitale", href: "/services/presence-digitale" },
              { label: "Création de site", href: "/services/creation-site-web" },
              { label: "Notre méthode", href: "/notre-methode" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-dark-muted hover:text-white transition-colors duration-200 tracking-wide uppercase"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-dark-muted text-xs">
            © {new Date().getFullYear()} Le Panaf
          </p>
        </div>

      </main>
    </div>
  );
}
