"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_EVENT, CONSENT_KEY, GA_ID } from "@/lib/analytics";

// Apaga os cookies que o Analytics deixou (_ga, _ga_XXXX), no domínio e nos domínios acima.
function clearAnalyticsCookies() {
  const parts = window.location.hostname.split(".");
  const domains = ["", ...parts.map((_, i) => `; domain=.${parts.slice(i).join(".")}`)];
  for (const cookie of document.cookie.split("; ")) {
    const name = cookie.split("=")[0];
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}

// Só carrega o Google Analytics depois de a pessoa o aceitar no aviso de cookies.
export default function GoogleAnalytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;

    function update() {
      let ok = false;
      try {
        ok = localStorage.getItem(CONSENT_KEY) === "analytics";
      } catch {
        // localStorage indisponível — não há consentimento
      }
      // Interruptor do próprio Google: também pára a medição se o consentimento for retirado.
      (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = !ok;
      if (!ok) clearAnalyticsCookies();
      setAllowed(ok);
    }

    update();
    window.addEventListener(CONSENT_EVENT, update);
    return () => window.removeEventListener(CONSENT_EVENT, update);
  }, []);

  if (!GA_ID || !allowed) return null;

  return (
    <>
      <Script
        id="ga-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
