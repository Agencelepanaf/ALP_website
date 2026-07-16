// Coordonnées de contact centralisées.
// Modifier une valeur ici la met à jour partout : header, bouton flottant, page contact.

export const SITE_PHONE_DISPLAY = "(+212) 06.38.72.56.90";
export const SITE_PHONE_E164 = "+212638725690";

// Numéro WhatsApp au format international, sans "+" ni espaces.
const WHATSAPP_NUMBER = "212638725690";

// Message pré-rempli quand un visiteur clique sur un lien WhatsApp.
const WHATSAPP_MESSAGE =
  "Bonjour, je viens du site agencelepanaf.com et j'aimerais discuter de mon projet.";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;
