// Lugares do site onde a imagem pode ser trocada no painel (Sanity → "Imagens do site").
// A chave é o que liga o documento do painel ao sítio da imagem no site; o "fallback"
// é a imagem que aparece enquanto ninguém escolher outra no painel.
import { services } from "@/data/services";
import { processSteps } from "@/data/process";

export type SiteImageSlot = {
  key: string;
  label: string;
  fallback: string;
};

const serviceLabels: Record<string, string> = {
  customFurniture: "Mobiliário por medida",
  interiorDesign: "Design de interiores",
  visualization3d: "Visualização 3D",
  industrialProduction: "Produção",
  deliveryAssembly: "Entrega e montagem",
  fitting: "Embasamento",
};

const processLabels: Record<string, string> = {
  briefing: "Briefing",
  project3d: "Projeto 3D",
  production: "Produção",
  finishes: "Acabamentos",
  delivery: "Entrega",
};

export const siteImageSlots: SiteImageSlot[] = [
  {
    key: "inicio.hero",
    label: "Início › Imagem de fundo do topo",
    fallback: "/images/home/hero-workshop.jpg",
  },
  {
    key: "sobre.hero",
    label: "Sobre nós › Imagem do topo",
    fallback: "/images/sobre/hero.jpg",
  },
  {
    key: "sobre.historia1",
    label: "Sobre nós › A nossa história › Imagem 1 (esquerda)",
    fallback: "/images/sobre/story-1.jpeg",
  },
  {
    key: "sobre.historia2",
    label: "Sobre nós › A nossa história › Imagem 2 (direita)",
    fallback: "/images/sobre/story-2.jpg",
  },
  ...services.map((service) => ({
    key: `servicos.${service.id}`,
    label: `Serviços › ${serviceLabels[service.id] ?? service.id}`,
    fallback: service.image,
  })),
  ...processSteps.map((step) => ({
    key: `processo.${step.key}`,
    label: `Processo › ${step.number} ${processLabels[step.key] ?? step.key}`,
    fallback: step.image,
  })),
];
