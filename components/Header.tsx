"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/services/presence-digitale", label: "Présence digitale" },
  { href: "/services/creation-site-web", label: "Création de site" },
  { href: "/projets", label: "Projets" },
  { href: "/methode", label: "Méthode" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Les pages étude de cas ont un hero sombre → forcer le header solid d'emblée
  const hasDarkHero = /^\/projets\/.+/.test(pathname);
  const isSolid = scrolled || hasDarkHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isSolid
            ? "bg-background/90 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-18">

            {/* Logo */}
            <Link href="/" className="shrink-0" aria-label="Agence Le Panaf — accueil">
              <Image
                src="/logo-white.png"
                alt="Agence Le Panaf"
                width={360}
                height={96}
                priority
                className="h-14 w-auto shrink-0"
              />
            </Link>

            {/* Nav desktop — pills */}
            <nav className="hidden md:flex items-center gap-1 bg-border/60 backdrop-blur-sm rounded-full px-2 py-1.5" aria-label="Navigation principale">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-foreground-muted hover:text-foreground hover:bg-surface transition-all duration-200 px-4 py-1.5 rounded-full"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA desktop */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/contact"
                className="text-sm font-semibold bg-accent text-white hover:bg-accent-hover active:scale-95 transition-all duration-200 px-5 py-2.5 rounded-full"
              >
                Discutons du projet
              </Link>
            </div>

            {/* Burger mobile */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-border/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
            >
              <div className="flex flex-col gap-1.5 w-5">
                <span className={`block h-px bg-foreground transition-all duration-200 origin-center ${menuOpen ? "rotate-45 translate-y-1.75" : ""}`} />
                <span className={`block h-px bg-foreground transition-all duration-200 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
                <span className={`block h-px bg-foreground transition-all duration-200 origin-center ${menuOpen ? "-rotate-45 -translate-y-1.75" : ""}`} />
              </div>
            </button>

          </div>
        </div>
      </header>

      {/* Menu mobile — drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-dark/60 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-surface rounded-t-3xl p-6 pb-10 shadow-2xl transition-transform duration-300 ease-out ${
            menuOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {/* Indicateur */}
          <div className="w-10 h-1 bg-border rounded-full mx-auto mb-8" />

          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium text-foreground hover:text-accent transition-colors duration-200 px-4 py-3 rounded-2xl hover:bg-background"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-6 flex items-center justify-center w-full text-base font-semibold bg-accent text-white hover:bg-accent-hover transition-all duration-200 py-4 rounded-2xl"
          >
            Discutons du projet
          </Link>
        </div>
      </div>

    </>
  );
}
