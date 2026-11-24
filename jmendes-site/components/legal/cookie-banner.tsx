"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  CONSENT_EVENT,
  CONSENT_KEY,
  CONSENT_OPEN_EVENT,
  GA_ID,
  type Consent,
} from "@/lib/analytics";

type Props = {
  locale: string;
};

// Sem Analytics, o aviso é informativo (só cookies essenciais). Com Analytics, pede
// consentimento e recusar é tão fácil como aceitar. Renderiza null no servidor e no
// 1.º render do cliente — a visibilidade só é decidida após montar (localStorage),
// evitando hydration mismatch.
export default function CookieBanner({ locale }: Props) {
  const t = useTranslations("Cookie");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const choice = localStorage.getItem(CONSENT_KEY);
      // Quem só viu o aviso informativo ainda não decidiu sobre o Analytics.
      if (!choice || (GA_ID && choice === "essential")) setVisible(true);
    } catch {
      // localStorage indisponível — não mostrar
    }

    const open = () => setVisible(true);
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  function choose(consent: Consent) {
    try {
      localStorage.setItem(CONSENT_KEY, consent);
    } catch {
      // ignora
    }
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9998] border-t border-[var(--border)] bg-black/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-white/80">
          {t(GA_ID ? "analyticsMessage" : "message")}{" "}
          <Link
            href={`/${locale}/privacidade`}
            className="text-gold underline underline-offset-2 transition-opacity hover:opacity-80"
          >
            {t("learnMore")}
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          {GA_ID && (
            <button
              type="button"
              onClick={() => choose("rejected")}
              className="bg-[var(--gold)] px-7 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
            >
              {t("reject")}
            </button>
          )}
          <button
            type="button"
            onClick={() => choose(GA_ID ? "analytics" : "essential")}
            className="bg-[var(--gold)] px-7 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
