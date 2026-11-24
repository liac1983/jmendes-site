// ID do Google Analytics 4 (G-XXXXXXX). Sem ele, não há Analytics nem pedido de consentimento.
const rawId = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const GA_ID = /^G-[A-Z0-9]+$/.test(rawId) ? rawId : "";

export const CONSENT_KEY = "cookie-consent";
export const CONSENT_EVENT = "cookie-consent-change";
export const CONSENT_OPEN_EVENT = "cookie-consent-open";

export type Consent = "essential" | "analytics" | "rejected";
