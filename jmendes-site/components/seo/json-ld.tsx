import { SITE_URL, business } from "@/lib/site";

// Dados estruturados (schema.org) para o Google entender a empresa e mostrar
// resultados ricos / ficha local. FurnitureStore é subtipo de LocalBusiness.
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "@id": `${SITE_URL}/#business`,
    name: business.name,
    legalName: business.legalName,
    url: SITE_URL,
    image: `${SITE_URL}${business.logo}`,
    logo: `${SITE_URL}${business.logo}`,
    email: business.email,
    telephone: business.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      postalCode: business.address.postalCode,
      addressLocality: business.address.locality,
      addressCountry: business.address.country,
    },
    sameAs: business.social,
    priceRange: "€€",
    foundingDate: "2019",
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify evita problemas de escaping; conteúdo é estático/confiável.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
