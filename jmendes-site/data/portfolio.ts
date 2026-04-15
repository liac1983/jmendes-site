export type PortfolioCategory =
  | "todos"
  | "cozinhas"
  | "roupeiros"
  | "comercial"
  | "casas-completas";

export type PortfolioProject = {
  slug: string;
  category: Exclude<PortfolioCategory, "todos">;
  title: string;
  type: string;
  image: string;
  testimonial?: {
    author: string;
    text: string;
  };
};

export const portfolioCategories: {
  value: PortfolioCategory;
  label: string;
}[] = [
  { value: "todos", label: "Todos" },
  { value: "cozinhas", label: "Cozinhas" },
  { value: "roupeiros", label: "Roupeiros" },
  { value: "comercial", label: "Comercial" },
  { value: "casas-completas", label: "Casas Completas" },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "cozinha-moderna-minimalista",
    category: "cozinhas",
    title: "Cozinha Moderna Minimalista",
    type: "Por Medida",
    image: "/images/portfolio/cozinha-1.jpeg",
    testimonial: {
      author: "Maria Silva",
      text: "Trabalho impecável! Superou todas as expectativas.",
    },
  },
  {
    slug: "cozinha-com-ilha-central",
    category: "cozinhas",
    title: "Cozinha com Ilha Central",
    type: "Por Medida",
    image: "/images/portfolio/cozinha-2.jpeg",
  },
  {
    slug: "walk-in-closet-luxuoso",
    category: "roupeiros",
    title: "Walk-in Closet Luxuoso",
    type: "Por Medida",
    image: "/images/portfolio/roupeiro-1.jpeg",
  },
  {
    slug: "quarto-com-roupeiro-embutido",
    category: "roupeiros",
    title: "Quarto com Roupeiro Embutido",
    type: "Por Medida",
    image: "/images/portfolio/roupeiro-2.jpeg",
    testimonial: {
      author: "Pedro Santos",
      text: "Aproveitamento máximo do espaço.",
    },
  },
  {
    slug: "sala-de-estar-premium",
    category: "casas-completas",
    title: "Sala de Estar Premium",
    type: "Projeto Completo",
    image: "/images/portfolio/sala-1.jpeg",
  },
  {
    slug: "mobiliario-de-escritorio",
    category: "comercial",
    title: "Mobiliário de Escritório",
    type: "Comercial",
    image: "/images/portfolio/comercial-1.jpeg",
  },
  {
    slug: "sala-de-jantar-contemporanea",
    category: "casas-completas",
    title: "Sala de Jantar Contemporânea",
    type: "Por Medida",
    image: "/images/portfolio/sala-2.jpeg",
  },
  {
    slug: "cozinha-classica-branca",
    category: "cozinhas",
    title: "Cozinha Clássica Branca",
    type: "Por Medida",
    image: "/images/portfolio/cozinha-3.jpeg",
  },
  {
    slug: "rececao-empresarial",
    category: "comercial",
    title: "Receção Empresarial",
    type: "Comercial",
    image: "/images/portfolio/comercial-2.jpeg",
  },
];

