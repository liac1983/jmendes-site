"use client";

import { useEffect } from "react";

// Ao trocar de língua no menu a página não recarrega e o <html> mantém-se:
// aqui acerta-se a língua indicada aos leitores de ecrã e ao browser.
export default function HtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
