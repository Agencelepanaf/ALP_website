"use client";

import { useSyncExternalStore } from "react";
import Button from "@/components/ui/Button";

// Le choix est lu dans localStorage ; on se réabonne à l'événement émis
// par accept/refuse (et aux autres onglets via "storage").
function subscribe(callback: () => void) {
  window.addEventListener("cookie-consent", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("cookie-consent", callback);
    window.removeEventListener("storage", callback);
  };
}

export default function CookieBanner() {
  // Côté serveur : "unknown" pour ne rien afficher avant l'hydratation.
  const consent = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem("cookie_consent"),
    () => "unknown"
  );
  const visible = consent === null;

  function accept() {
    localStorage.setItem("cookie_consent", "accepted");
    window.dispatchEvent(new CustomEvent("cookie-consent", { detail: "accepted" }));
  }

  function refuse() {
    localStorage.setItem("cookie_consent", "refused");
    window.dispatchEvent(new CustomEvent("cookie-consent", { detail: "refused" }));
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentement aux cookies"
      className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border shadow-lg px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
    >
      <p className="text-sm text-foreground-muted flex-1 leading-relaxed">
        <span className="font-semibold text-foreground">Nous respectons votre vie privée.</span>
        {" "}Nous utilisons des cookies pour améliorer votre expérience de navigation, diffuser des
        publicités ou des contenus personnalisés et analyser notre trafic. En cliquant sur
        {" "}«&nbsp;Tout accepter&nbsp;», vous consentez à notre utilisation des cookies.
      </p>
      <div className="flex gap-3 shrink-0">
        <Button variant="secondary" onClick={refuse}>
          Refuser
        </Button>
        <Button variant="primary" onClick={accept}>
          Tout accepter
        </Button>
      </div>
    </div>
  );
}
