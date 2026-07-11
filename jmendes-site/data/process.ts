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
    image: "/images/processo/F1930886-72E7-439B-B6AA-8E09DF9D74D7.jpeg",
    icon: PenTool,
  },
  {
    number: "03",
    key: "production",
    image: "/images/processo/0798A45C-A3DC-4E8D-BBA4-35B6CF69EBA2.jpeg",
    icon: Factory,
  },
  {
    number: "04",
    key: "finishes",
    image: "/images/processo/F8481AFD-E6B2-4B87-A256-EB1546D705EC.jpeg",
    icon: Sparkles,
  },
  {
    number: "05",
    key: "delivery",
    image: "/images/processo/DA1660C3-1669-4475-90FE-7F6F560D3791.png",
    icon: Truck,
  },
];
