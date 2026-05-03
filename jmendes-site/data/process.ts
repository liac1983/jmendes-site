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
  key: string;
  image: string;
  icon: LucideIcon;
};

export const processSteps: ProcessStepItem[] = [
  {
    number: "01",
    key: "briefing",
    image: "/images/processo/briefing.jpg",
    icon: MessageSquare,
  },
  {
    number: "02",
    key: "project3d",
    image: "/images/processo/projeto-3d.jpeg",
    icon: PenTool,
  },
  {
    number: "03",
    key: "production",
    image: "/images/processo/producao.png",
    icon: Factory,
  },
  {
    number: "04",
    key: "finishes",
    image: "/images/processo/acabamentos.png",
    icon: Sparkles,
  },
  {
    number: "05",
    key: "delivery",
    image: "/images/processo/entrega-montagem.jpg",
    icon: Truck,
  },
];
