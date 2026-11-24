"use client";

import { useTranslations } from "next-intl";
import { CONSENT_OPEN_EVENT, GA_ID } from "@/lib/analytics";

// Reabre o aviso de cookies, para mudar ou retirar o consentimento.
export default function CookieSettings() {
  const t = useTranslations("Cookie");
  if (!GA_ID) return null;

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
      className="mt-14 border border-[var(--gold)] px-7 py-3 text-gold transition hover:bg-[var(--gold)] hover:text-black"
    >
      {t("settings")}
    </button>
  );
}
