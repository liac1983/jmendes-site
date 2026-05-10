import type { FeaturedProjectContent } from "@/types/featured-project";

const basePath = "/images/featured-projects";

function projectImages(folder: string, count: number) {
  return Array.from(
    { length: count },
    (_, index) => `${basePath}/${folder}/${String(index + 1).padStart(2, "0")}.jpg`
  );
}

const blendImages = projectImages("blend", 8);
const mavrommatisImages = projectImages("mavrommatis", 16);
const mrChowImages = projectImages("mr-chow", 12);
const poissonchatImages = projectImages("poissonchat", 14);
const senseImages = projectImages("sense", 12);

export const localFeaturedProjects: FeaturedProjectContent[] = [
  {
    slug: "restaurant-blend",
    title: "Restaurant Blend",
    categoryLabel: "Restauração",
    subtitle:
      "Um espaço luminoso, urbano e acolhedor, onde a madeira clara e a luz quente criam uma experiência descontraída.",
    location: "Paris, França",
    year: "2026",
    styleVariant: "blend",
    heroImage: blendImages[0],
    cardImage: blendImages[0],
    overviewImage: blendImages[2],
    gallery: blendImages,
    intro:
      "O Blend nasce de uma linguagem leve e direta: frente aberta para a rua, mobiliário confortável e uma paleta quente que torna o serviço diário mais fluido.",
    description:
      "A intervenção trabalha bancos corridos, painéis verticais, mesas compactas e zonas de apoio com uma leitura muito contínua. O resultado é um restaurante com presença de marca, mas sem perder a sensação de proximidade.",
    conceptTitle: "Calor urbano em tons claros",
    conceptText:
      "A madeira, os estofos e a iluminação indireta foram coordenados para prolongar a luz natural e manter o espaço convidativo ao longo de todo o dia.",
    facts: [
      { label: "Tipologia", value: "Restaurante casual" },
      { label: "Ambiente", value: "Claro e acolhedor" },
      { label: "Foco", value: "Mobiliário integrado" },
    ],
    highlights: [
      "Frente de loja integrada com sala e esplanada",
      "Bancos corridos e painéis em madeira clara",
      "Iluminação indireta para reforçar profundidade",
    ],
    materials: ["Carvalho claro", "Lacados creme", "Estofos camel", "Metal polido"],
    finishes: ["Verniz mate", "Tons areia", "Luz âmbar", "Texturas suaves"],
  },
  {
    slug: "restaurant-mavrommatis",
    title: "Restaurant Mavrommatis",
    categoryLabel: "Restauração",
    subtitle:
      "Um restaurante de leitura clássica e contemporânea, com arcos suaves, pedra natural e uma atmosfera parisiense refinada.",
    location: "Paris, França",
    year: "2026",
    styleVariant: "mavrommatis",
    heroImage: mavrommatisImages[0],
    cardImage: mavrommatisImages[3],
    overviewImage: mavrommatisImages[4],
    gallery: mavrommatisImages,
    intro:
      "O Mavrommatis combina a presença histórica da fachada com interiores serenos, desenhados para valorizar o ritual da mesa e a luminosidade natural.",
    description:
      "As salas exploram transições curvas, mobiliário discreto e materiais de toque mineral. Cada elemento foi pensado para servir a experiência gastronómica sem competir com ela.",
    conceptTitle: "Elegância mineral e silêncio visual",
    conceptText:
      "A composição privilegia linhas calmas, superfícies claras e detalhes rigorosos, criando uma leitura sofisticada que se mantém confortável.",
    facts: [
      { label: "Tipologia", value: "Fine dining" },
      { label: "Ambiente", value: "Clássico contemporâneo" },
      { label: "Foco", value: "Sala e fachada" },
    ],
    highlights: [
      "Arcos interiores com transições suaves",
      "Fachada integrada com identidade discreta",
      "Mobiliário de sala com presença leve",
    ],
    materials: ["Pedra natural", "Madeira escura", "Tecidos claros", "Metal champanhe"],
    finishes: ["Mate acetinado", "Cinza quente", "Cortinas leves", "Luz difusa"],
  },
  {
    slug: "restaurant-mr-chow",
    title: "Restaurant Mr Chow",
    categoryLabel: "Restauração",
    subtitle:
      "Um projeto intenso e cinematográfico, marcado por vermelho profundo, superfícies brilhantes e ritmo gráfico.",
    location: "Paris, França",
    year: "2026",
    styleVariant: "mr-chow",
    heroImage: mrChowImages[0],
    cardImage: mrChowImages[0],
    overviewImage: mrChowImages[4],
    gallery: mrChowImages,
    intro:
      "O Mr Chow pede uma presença forte. A linguagem visual trabalha contraste, reflexos e linhas de circulação muito definidas.",
    description:
      "O balcão, os painéis verticais e a iluminação circular criam uma cadência marcada. A produção privilegia precisão nos encontros e resistência para uso intensivo.",
    conceptTitle: "Drama controlado e precisão técnica",
    conceptText:
      "A paleta vermelha é equilibrada por metal, madeira escura e luz branca, criando energia sem perder legibilidade funcional.",
    facts: [
      { label: "Tipologia", value: "Restaurante de autor" },
      { label: "Ambiente", value: "Cinematográfico" },
      { label: "Foco", value: "Balcão e painéis" },
    ],
    highlights: [
      "Painéis verticais vermelhos de grande impacto",
      "Balcão com superfícies resistentes e reflexivas",
      "Iluminação circular integrada no ritmo do espaço",
    ],
    materials: ["Madeira escura", "Lacados brilho", "Inox", "Estofos técnicos"],
    finishes: ["Vermelho profundo", "Preto polido", "Luz linear", "Alto contraste"],
  },
  {
    slug: "restaurant-poissonchat",
    title: "Restaurant Poissonchat",
    categoryLabel: "Restauração",
    subtitle:
      "Um restaurante claro e envolvente, com bar escultórico, luz suave e uma paleta calorosa de pedra e coral.",
    location: "Paris, França",
    year: "2026",
    styleVariant: "poissonchat",
    heroImage: poissonchatImages[0],
    cardImage: poissonchatImages[0],
    overviewImage: poissonchatImages[3],
    gallery: poissonchatImages,
    intro:
      "O Poissonchat trabalha uma atmosfera leve, quase suspensa, onde o bar central e a luz circular organizam a experiência.",
    description:
      "As superfícies minerais e os assentos de desenho arredondado reforçam a sensação de conforto. O mobiliário foi pensado para criar continuidade entre bar, sala e zonas de circulação.",
    conceptTitle: "Luz suave, pedra quente e fluidez",
    conceptText:
      "A volumetria do teto e do bar cria uma leitura orgânica, enquanto os acabamentos mantêm resistência e facilidade de manutenção.",
    facts: [
      { label: "Tipologia", value: "Bar e restaurante" },
      { label: "Ambiente", value: "Luminoso e fluido" },
      { label: "Foco", value: "Bar escultórico" },
    ],
    highlights: [
      "Bar central com presença monolítica",
      "Assentos arredondados em tom coral",
      "Iluminação suave como elemento arquitetónico",
    ],
    materials: ["Travertino", "Lacados claros", "Estofos coral", "Vidro iluminado"],
    finishes: ["Pedra quente", "Branco suave", "Luz difusa", "Detalhes curvos"],
  },
  {
    slug: "restaurant-sense",
    title: "Restaurant Sense",
    categoryLabel: "Restauração",
    subtitle:
      "Um espaço sensorial e orgânico, com volumes de teto escultóricos, bancos integrados e luz muito controlada.",
    location: "Paris, França",
    year: "2026",
    styleVariant: "sense",
    heroImage: senseImages[0],
    cardImage: senseImages[0],
    overviewImage: senseImages[4],
    gallery: senseImages,
    intro:
      "O Sense explora conforto, acústica e luz como matéria de projeto. A sala é desenhada para envolver o utilizador sem ruído visual.",
    description:
      "Os bancos, mesas e planos de apoio seguem uma lógica de continuidade. A produção exige rigor nos encontros curvos e nos pontos de luz integrados.",
    conceptTitle: "Atmosfera orgânica e luz baixa",
    conceptText:
      "Os tons mel, os volumes arredondados e as superfícies mate criam uma experiência calma, sofisticada e memorável.",
    facts: [
      { label: "Tipologia", value: "Restaurante sensorial" },
      { label: "Ambiente", value: "Orgânico e intimista" },
      { label: "Foco", value: "Volumes e bancos" },
    ],
    highlights: [
      "Bancos integrados com desenho envolvente",
      "Teto escultórico com iluminação quente",
      "Mesas e apoios coordenados com a paleta do espaço",
    ],
    materials: ["Madeira clara", "Microcimento", "Tecidos técnicos", "Lacados mate"],
    finishes: ["Mel suave", "Textura mineral", "Luz baixa", "Curvas contínuas"],
  },
];
