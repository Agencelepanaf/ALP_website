import { WHATSAPP_URL } from "@/lib/site";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

/**
 * Bouton WhatsApp flottant, visible sur toutes les pages publiques.
 * Le clic est suivi automatiquement par ContactClickTracking
 * (événement GA4 : contact_click_whatsapp).
 */
export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Écrivez-nous sur WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 hover:scale-105 active:scale-95 transition-transform duration-150"
    >
      <WhatsAppIcon size={26} />
    </a>
  );
}
