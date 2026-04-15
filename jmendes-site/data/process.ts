import {
  MessageSquare,
  PenTool,
  Factory,
  Sparkles,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ProcessStepItem = {
  number: string;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
};

export const processSteps: ProcessStepItem[] = [
  {
    number: "01",
    title: "Briefing com Cliente",
    description:
      "Reunião inicial para compreender as necessidades, gostos e orçamento. Analisamos o espaço e discutimos possibilidades.",
    image: "/images/processo/briefing.jpg",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Projeto 3D",
    description:
      "Criação de modelos 3D fotorrealistas que permitem visualizar exatamente como ficará o mobiliário no espaço antes de produzir.",
    image: "/images/processo/projeto-3d.jpeg",
    icon: PenTool,
  },
  {
    number: "03",
    title: "Produção na Fábrica",
    description:
      "Fabrico com equipamento CNC de última geração. Controlo rigoroso de qualidade em cada etapa do processo produtivo.",
    image: "/images/processo/producao.png",
    icon: Factory,
  },
  {
    number: "04",
    title: "Acabamentos",
    description:
      "Aplicação de vernizes, lacas e acabamentos especiais. Cada peça é inspecionada e preparada para instalação.",
    image: "/images/processo/acabamentos.png",
    icon: Sparkles,
  },
  {
    number: "05",
    title: "Entrega e Montagem",
    description:
      "Transporte seguro e montagem profissional. Embasamento final e ajustes para garantir satisfação total.",
    image: "/images/processo/entrega-montagem.jpg",
    icon: Truck,
  },
];
