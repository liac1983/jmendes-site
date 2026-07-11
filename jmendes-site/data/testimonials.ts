export type Testimonial = {
  quote: string;
  author: string;
  /** Contexto opcional: tipo de cliente, projeto ou localidade. */
  role?: string;
};

// TODO: adicionar mais testemunhos REAIS de clientes aqui (idealmente 3+).
// Não inventar depoimentos — usar apenas os autorizados pelos clientes.
export const testimonials: Testimonial[] = [
  {
    quote: "Trabalho impecável! Superou todas as expectativas.",
    author: "Maria Silva",
    role: "Cozinha Moderna Minimalista",
  },
];
