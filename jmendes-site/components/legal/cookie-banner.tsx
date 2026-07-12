"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

type Props = {
  locale: string;
};

const STORAGE_KEY = "cookie-consent";

// Banner informativo (só cookies essenciais). Renderiza null no servidor e no
// 1.º render do cliente — a visibilidade só é decidida após montar (localStorage),
// evitando hydration mismatch. Pronto para evoluir para consentimento real
// quando forem adicionados cookies de análise/marketing.
export default function CookieBanner({ locale }: Props) {
  const t = useTranslations("Cookie");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // localStorage indisponível — não mostrar
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, "essential");
    } catch {
      // ignora
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9998] border-t border-[var(--border)] bg-black/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-white/80">
          {t("message")}{" "}
          <Link
            href={`/${locale}/privacidade`}
            className="text-gold underline underline-offset-2 transition-opacity hover:opacity-80"
          >
            {t("learnMore")}
          </Link>
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 bg-[var(--gold)] px-7 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
        >
          {t("accept")}
        </button>
      </div>
    </div>
  );
}
