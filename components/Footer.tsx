import Link from "next/link";
import Image from "next/image";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">

          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3" aria-label="Agence Le Panaf — accueil">
              <Image
                src="/favicon.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="font-display text-xl font-semibold text-white tracking-wide">LE PANAF</span>
            </Link>
            <p className="text-sm text-dark-muted leading-relaxed max-w-xs">
              Présence digitale pour les PME et les STARTUPS ambitieuses.
              Basé à Casablanca, ouvert sur le Monde.{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline-block w-4 h-4 align-text-bottom opacity-60"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Navigation secondaire">
            <p className="text-xs font-semibold tracking-widest uppercase text-dark-muted mb-5">
              Pages
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { href: "/services/presence-digitale", label: "Présence digitale" },
                { href: "/services/creation-site-web", label: "Création de site web" },
                { href: "/realisations", label: "Nos réalisations" },
                { href: "/notre-methode", label: "Notre méthode" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-dark-muted hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-dark-muted mb-5">
              Contact
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:contact@agencelepanaf.com"
                  className="text-sm text-dark-muted hover:text-white transition-colors duration-200"
                >
                  contact@agencelepanaf.com
                </a>
              </li>
              <li className="text-sm text-dark-muted">Casablanca, Maroc</li>
              <li>
                <a
                  href="https://www.linkedin.com/in/edhem-rombhot/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-dark-muted hover:text-white transition-colors duration-200"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-6 border-t border-border-dark flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-xs text-dark-muted">
            © {year} Agence Le Panaf. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/mentions-legales" className="text-xs text-dark-muted hover:text-white transition-colors duration-200">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="text-xs text-dark-muted hover:text-white transition-colors duration-200">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
