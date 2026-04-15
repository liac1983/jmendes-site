import {
  PencilRuler,
  Sofa,
  Cuboid,
  Factory,
  Truck,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Service = {
  title: string;
  image: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    title: "Mobiliário por Medida",
    image: "/images/servicos/medida.jpg",
    description:
      "Criamos peças únicas adaptadas exatamente às suas necessidades e ao seu espaço.",
    bullets: [
      "Medições no local",
      "Desenho personalizado",
      "Escolha de materiais premium",
      "Acompanhamento completo do projeto",
    ],
    icon: Sofa,
  },
  {
    title: "Design de Interiores",
    image: "/images/servicos/interiores.jpeg",
    description:
      "Serviço completo de design com foco em funcionalidade e estética.",
    bullets: [
      "Conceito e moodboard",
      "Seleção de materiais e cores",
      "Coordenação com fornecedores",
      "Supervisão de obra",
    ],
    icon: PencilRuler,
  },
  {
    title: "Visualização 3D",
    image: "/images/servicos/3d.jpeg",
    description:
      "Renderizações fotorrealistas para visualizar o resultado antes de produzir.",
    bullets: [
      "Modelos 3D detalhados",
      "Renders fotorrealistas",
      "Diferentes perspetivas",
      "Alterações rápidas",
    ],
    icon: Cuboid,
  },
  {
    title: "Produção Industrial",
    image: "/images/servicos/producao.jpeg",
    description:
      "Capacidade de produção em série com qualidade consistente.",
    bullets: [
      "Equipamento CNC",
      "Controlo rigoroso",
      "Produção em escala",
      "Prazos garantidos",
    ],
    icon: Factory,
  },
  {
    title: "Entrega e Montagem",
    image: "/images/servicos/montagem.jpeg",
    description:
      "Serviço completo de logística e instalação profissional.",
    bullets: [
      "Transporte seguro",
      "Montagem profissional",
      "Proteção do espaço",
      "Limpeza final",
    ],
    icon: Truck,
  },
  {
    title: "Embasamento",
    image: "/images/servicos/embasamento.jpeg",
    description:
      "Acabamentos finais no local para garantir ajuste perfeito.",
    bullets: [
      "Ajustes finais",
      "Instalação de ferragens",
      "Nivelamento",
      "Retoques finais",
    ],
    icon: Wrench,
  },
];
