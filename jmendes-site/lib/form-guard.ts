// Travões do formulário de orçamento, em memória. Na Vercel cada instância tem a
// sua memória, por isso reduzem o abuso mas não o impedem por completo.

const hits = new Map<string, number[]>();
const sent = new Map<string, number>();

const MAX_ENTRIES = 5000;
const SENT_TTL_MS = 60 * 60 * 1000;

function trim<T>(map: Map<string, T>) {
  while (map.size > MAX_ENTRIES) {
    const oldest = map.keys().next().value;
    if (oldest === undefined) return;
    map.delete(oldest);
  }
}

/** Regista uma tentativa; devolve false quando a chave já passou o limite. */
export function allowRequest(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
  const allowed = recent.length < max;
  if (allowed) recent.push(now);
  hits.delete(key);
  hits.set(key, recent);
  trim(hits);
  return allowed;
}

export function wasSent(id: string) {
  const time = sent.get(id);
  return time !== undefined && Date.now() - time < SENT_TTL_MS;
}

export function markSent(id: string) {
  sent.set(id, Date.now());
  trim(sent);
}

export function clientIp(request: Request) {
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "desconhecido"
  );
}
