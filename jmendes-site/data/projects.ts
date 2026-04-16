import type { Project } from "@/lib/project-types";

export const projects: Project[] = [
  {
    title: "Cozinha Moderna Minimalista",
    slug: "cozinha-moderna-minimalista",
    category: "POR MEDIDA",
    location: "Lisboa",
    year: "2025",
    typeLabel: "Por Medida",
    heroImage: "/images/portfolio/cozinha-moderna/hero.jpg",
    overviewImage: "/images/portfolio/cozinha-moderna/overview.jpg",
    gallery: [
      "/images/portfolio/cozinha-moderna/1.jpg",
      "/images/portfolio/cozinha-moderna/2.jpg",
      "/images/portfolio/cozinha-moderna/3.jpg",
    ],
    description:
      "Este projeto foi desenvolvido para um cliente que procurava uma cozinha moderna e funcional, com linhas minimalistas e materiais de alta qualidade. O desafio principal era maximizar o espaço disponível sem comprometer a estética elegante.",
    challenge:
      "Espaço reduzido com necessidade de arrumação significativa. O cliente queria uma cozinha ampla visualmente mas com capacidade de armazenamento superior. Havia também a necessidade de integrar todos os eletrodomésticos de forma discreta.",
    solution:
      "Criámos módulos personalizados com integração total dos eletrodomésticos. Utilizámos portas sem puxadores com sistema push-to-open para manter as linhas limpas. A ilha central foi desenhada com gavetas profundas e organizadores internos inteligentes.",
    materials: [
      "Carvalho natural",
      "Lacado mate branco",
      "Pedra quartzo branco",
      "Aço inoxidável escovado",
    ],
    finishes: [
      "Sistema soft-close em todas as gavetas",
      "Iluminação LED integrada sob armários",
      "Portas push-to-open",
      "Rodapé embutido com ventilação",
    ],
    testimonial: {
      author: "Maria Silva",
      text: "Trabalho impecável! Superou todas as expectativas.",
    },
    instagramImages: [
      "/images/portfolio/cozinha-moderna/1.jpg",
      "/images/portfolio/cozinha-moderna/2.jpg",
      "/images/portfolio/cozinha-moderna/3.jpg",
    ],
    instagramUrl: "https://www.instagram.com/jmendesmobiliario/",
  },
];

