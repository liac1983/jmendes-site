export type ProductLine = {
  slug: string
  category: string
  title: string
  subtitle: string
  availability: "Disponível" | "Indisponível"
  shortDescription: string
  heroImage: string
  aboutImage: string
  gallery: string[]
  highlights: string[]
  materials: string[]
  finishes: string[]
  dimensions: {
    largura: string
    altura: string
    profundidade: string
  }
  technicalFeatures: string[]
  advantages: string[]
  idealFor: string[]
}

export const productLines: ProductLine[] = [
  {
    slug: "cozinha-modular-minimal",
    category: "Cozinhas Modulares",
    title: "Cozinha Modular Minimal",
    subtitle: "Elegância e funcionalidade em harmonia perfeita",
    availability: "Disponível",
    shortDescription:
      "A Cozinha Modular Minimal foi pensada para interiores contemporâneos que valorizam linhas limpas, materiais nobres e funcionalidade.",
    heroImage: "/images/linhas/cozinha-minimal/hero.jpg",
    aboutImage: "/images/linhas/cozinha-minimal/about.jpg",
    gallery: [
      "/images/linhas/cozinha-minimal/gallery-1.jpg",
      "/images/linhas/cozinha-minimal/gallery-2.jpg",
      "/images/linhas/cozinha-minimal/gallery-3.jpg",
    ],
    highlights: [
      "Produção nacional com controlo de qualidade rigoroso",
      "Materiais premium selecionados",
      "Acabamentos de alta durabilidade",
      "Sistema modular flexível",
    ],
    materials: [
      "MDF lacado alto brilho",
      "Bancada em quartzo compacto",
      "Puxadores em alumínio escovado",
      "Estrutura interna em melamina branca",
    ],
    finishes: [
      "Sistema soft-close em todas as gavetas e portas",
      "Dobradiças de alta qualidade",
      "Iluminação LED sob armários",
      "Rodapé embutido com ventilação",
    ],
    dimensions: {
      largura: "Modular (180cm a 360cm)",
      altura: "220cm",
      profundidade: "60cm",
    },
    technicalFeatures: [
      "Sistema modular configurável",
      "Inclui módulos base e aéreos",
      "Gavetas com sistema anti-vibração",
      "Preparação para eletrodomésticos",
      "Uso interior",
      "Resistente à humidade",
    ],
    advantages: [
      "Produção nacional com controlo de qualidade rigoroso",
      "Materiais premium selecionados",
      "Acabamentos de alta durabilidade",
      "Sistema modular flexível",
      "Entrega e montagem incluídas",
      "Garantia de 5 anos",
    ],
    idealFor: [
      "Cozinhas modernas",
      "Espaços abertos",
      "Apartamentos contemporâneos",
      "Ambientes minimalistas",
    ],
  },
  {
    slug: "roupeiro-serie-premium",
    category: "Roupeiros Modulares",
    title: "Roupeiro Série Premium",
    subtitle: "Organização sofisticada para interiores exigentes",
    availability: "Disponível",
    shortDescription:
      "Um roupeiro modular elegante, pensado para maximizar arrumação com design contemporâneo.",
    heroImage: "/images/linhas/roupeiro-premium/hero.jpg",
    aboutImage: "/images/linhas/roupeiro-premium/about.jpg",
    gallery: ["/images/linhas/roupeiro-premium/gallery-1.jpg"],
    highlights: [
      "Estrutura robusta",
      "Interior organizado",
      "Portas com acabamento premium",
      "Configuração modular",
    ],
    materials: [
      "MDF folheado",
      "Interiores em melamina",
      "Perfis metálicos",
    ],
    finishes: [
      "Corrediças soft-close",
      "Puxadores integrados",
      "Acabamentos mate",
    ],
    dimensions: {
      largura: "Modular",
      altura: "240cm",
      profundidade: "65cm",
    },
    technicalFeatures: [
      "Configuração por módulos",
      "Uso interior",
      "Alta durabilidade",
    ],
    advantages: [
      "Montagem incluída",
      "Grande capacidade de arrumação",
      "Visual elegante",
    ],
    idealFor: ["Quartos modernos", "Suites", "Projetos residenciais premium"],
  },
]

