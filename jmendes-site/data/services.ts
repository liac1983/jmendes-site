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
  id: string;
  image: string;
  bulletKeys: string[];
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    id: "customFurniture",
    image: "/images/servicos/medida.jpg",
    bulletKeys: ["measurements", "customDesign", "premiumMaterials", "projectSupport"],
    icon: Sofa,
  },
  {
    id: "interiorDesign",
    image: "/images/servicos/interiores.jpeg",
    bulletKeys: ["concept", "materials", "supplierCoordination", "siteSupervision"],
    icon: PencilRuler,
  },
  {
    id: "visualization3d",
    image: "/images/servicos/3d.jpeg",
    bulletKeys: ["detailedModels", "photorealisticRenders", "perspectives", "quickChanges"],
    icon: Cuboid,
  },
  {
    id: "industrialProduction",
    image: "/images/servicos/producao.jpeg",
    bulletKeys: ["cncEquipment", "qualityControl", "scaleProduction", "guaranteedDeadlines"],
    icon: Factory,
  },
  {
    id: "deliveryAssembly",
    image: "/images/servicos/montagem.jpeg",
    bulletKeys: ["safeTransport", "professionalAssembly", "spaceProtection", "finalCleaning"],
    icon: Truck,
  },
  {
    id: "fitting",
    image: "/images/servicos/embasamento.jpeg",
    bulletKeys: ["finalAdjustments", "hardwareInstallation", "leveling", "finalRetouches"],
    icon: Wrench,
  },
];
