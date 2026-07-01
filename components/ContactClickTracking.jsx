'use client';

import { useEffect } from 'react';

/**
 * ContactClickTracking
 * --------------------
 * Suit les clics sur les liens de contact (téléphone, WhatsApp, e-mail)
 * et envoie un événement GA4 via la balise Google déjà présente sur le site
 * (gtag, mesure G-QVLCCGRV5P). Aucun Google Tag Manager requis.
 *
 * Événements envoyés à GA4 :
 *   - contact_click_telephone  (liens tel:)
 *   - contact_click_whatsapp   (liens wa.me / api.whatsapp.com)
 *   - contact_click_email      (liens mailto:)
 *
 * Placement : composant client, à inclure une seule fois dans le layout racine.
 */
export default function ContactClickTracking() {
  useEffect(() => {
    function handleClick(event) {
      // Remonte au lien le plus proche (utile si on clique une icône dans le lien)
      const link = event.target.closest('a');
      if (!link) return;

      const href = (link.getAttribute('href') || '').toLowerCase();
      let eventName = null;

      if (href.startsWith('tel:')) {
        eventName = 'contact_click_telephone';
      } else if (href.startsWith('mailto:')) {
        eventName = 'contact_click_email';
      } else if (
        href.includes('wa.me') ||
        href.includes('api.whatsapp.com') ||
        href.includes('whatsapp.com/send')
      ) {
        eventName = 'contact_click_whatsapp';
      }

      if (eventName && typeof window.gtag === 'function') {
        window.gtag('event', eventName, {
          link_url: link.href,
          link_text: (link.textContent || '').trim().slice(0, 100),
        });
      }
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
