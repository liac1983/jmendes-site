# Guia de Lançamento — J. Mendes Mobiliário

Como colocar o site online na **Vercel** e ligar o **domínio**.
Tempo estimado: ~20-30 min.

---

## Pré-requisitos
- [x] Código no GitHub (`liac1983/jmendes-site`) — já feito.
- [ ] Conta na **Vercel** (grátis; entrar com o GitHub).
- [ ] Domínio (ver nota no fim se `jaimemendes.com` já existe por causa do email).
- [ ] Valores das variáveis de ambiente (Sanity + Brevo) — estão no ficheiro local `.env.local`.

---

## Passo 1 — Importar o projeto na Vercel
1. Em **vercel.com** → **Add New… → Project**.
2. Escolher o repositório **`jmendes-site`** do GitHub.
3. ⚠️ **MUITO IMPORTANTE:** em **Root Directory**, clicar em **Edit** e selecionar a pasta **`jmendes-site`** (o site está numa subpasta do repositório; sem isto o deploy falha).
4. Framework: **Next.js** (deteta automaticamente). Não mexer nos comandos de build.
5. **NÃO** clicar em Deploy ainda — primeiro adicionar as variáveis (Passo 2).

---

## Passo 2 — Variáveis de ambiente
Na configuração do projeto → **Environment Variables**, adicionar (ambiente **Production** e **Preview**):

| Variável | O que é | Onde obter |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID do projeto Sanity | igual ao `.env.local` |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset Sanity (ex.: `production`) | igual ao `.env.local` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Versão da API Sanity (ex.: `2024-01-01`) | igual ao `.env.local` (se existir) |
| `BREVO_API_KEY` | Chave da API Brevo (envio do formulário) | igual ao `.env.local` |
| `CONTACT_TO_EMAIL` | Email que recebe os contactos | igual ao `.env.local` |
| `CONTACT_FROM_EMAIL` | Email remetente (verificado no Brevo) | igual ao `.env.local` |
| `NEXT_PUBLIC_SITE_URL` | Domínio final, ex.: `https://www.jaimemendes.com` | ver Passo 4 |

> Copiar os valores exatamente como estão em `.env.local` (que **não** vai para o GitHub).

Depois, clicar em **Deploy**. Ao fim de ~1-2 min o site fica num URL `*.vercel.app`.

---

## Passo 3 — Ligar o domínio
No projeto Vercel → **Settings → Domains** → adicionar o domínio (ex.: `jaimemendes.com` e `www.jaimemendes.com`).

A Vercel indica **o que configurar no registrar do domínio**. Há duas hipóteses:

**Opção A (mais simples) — Nameservers da Vercel**
No registrar, trocar os *nameservers* para os que a Vercel indicar (ex.: `ns1.vercel-dns.com`). A Vercel passa a gerir todo o DNS.
⚠️ Se o email `@jaimemendes.com` estiver ligado a este domínio, **não uses esta opção** sem migrar também os registos MX do email — senão o email deixa de funcionar. Nesse caso, usa a Opção B.

**Opção B (recomendada se já há email no domínio) — Registos DNS**
No painel de DNS do registrar, adicionar:
- Registo **A** — `@` → `76.76.21.21`
- Registo **CNAME** — `www` → `cname.vercel-dns.com`

(A Vercel mostra sempre os valores exatos a usar — segue os que ela indicar.)

O **certificado SSL (https)** é emitido automaticamente pela Vercel. Pode demorar até algumas horas a propagar o DNS.

---

## Passo 4 — Definir o URL final e redeploy
1. Depois do domínio ativo, garantir que `NEXT_PUBLIC_SITE_URL` tem o domínio final (com `https://`).
2. Escolher o domínio principal (ex.: `www.jaimemendes.com`) e a Vercel redireciona o outro.
3. **Redeploy** (Deployments → … → Redeploy) para os URLs de SEO/sitemap passarem a usar o domínio real.

---

## Passo 5 — Depois de online (checklist)
- [ ] **Testar o formulário de contacto** — enviar uma mensagem de teste e confirmar que chega ao `CONTACT_TO_EMAIL`.
- [ ] **Email não vai para spam:** no Brevo, verificar o remetente (`CONTACT_FROM_EMAIL`) e configurar **SPF/DKIM** no DNS do domínio.
- [ ] **Google Search Console** — adicionar o site e submeter `https://<dominio>/sitemap.xml`.
- [ ] Testar todas as páginas e os 4 idiomas.
- [ ] Confirmar a partilha (Open Graph) no WhatsApp/Facebook.
- [ ] Rever o texto da **Política de Privacidade** com o dono/jurista.

---

## Nota — o domínio pode já existir
O email da empresa usa `@jaimemendes.com`, por isso o domínio **`jaimemendes.com` provavelmente já está registado**. Confirmar com o dono onde está registado e quem tem acesso ao DNS **antes de comprar** — nesse caso, salta a compra e vai direto ao Passo 3 (Opção B, para não partir o email).
