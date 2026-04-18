export type ProductLine = {
  title: string;
  description: string;
  deliveryTime: string;
  features: string[];
  image: string;
};

export const productLines: ProductLine[] = [
  {
    title: "Cozinhas Modulares",
    description:
      "Soluções práticas e elegantes com entrega rápida. Combinações modulares que se adaptam a qualquer espaço.",
    deliveryTime: "3-4 semanas",
    features: [
      "Módulos pré-fabricados",
      "Diversas cores e acabamentos",
      "Eletrodomésticos integrados",
      "Bancadas em pedra ou quartzo",
    ],
    image: "/images/linhas/cozinhas.jpeg",
  },
  {
    title: "Roupeiros Série Premium",
    description:
      "Linha de roupeiros com design contemporâneo. Organização inteligente e acabamentos de luxo.",
    deliveryTime: "2-3 semanas",
    features: [
      "Portas de correr ou batente",
      "Interior em melamina premium",
      "Sistema de iluminação LED",
      "Prateleiras ajustáveis",
    ],
    image: "/images/linhas/roupeiros.jpeg",
  },
  {
    title: "Mobiliário de Sala",
    description:
      "Estantes, aparadores e móveis TV prontos para entrega. Design moderno e funcionalidade.",
    deliveryTime: "2-3 semanas",
    features: [
      "Diversos tamanhos disponíveis",
      "Madeira maciça ou lacado",
      "Gavetas com fecho suave",
      "Design minimalista",
    ],
    image: "/images/linhas/sala.jpeg",
  },
];