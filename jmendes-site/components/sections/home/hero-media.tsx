"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

// Fundo do hero com parallax de scroll: a imagem desloca-se mais devagar que o
// conteúdo. O contentor ocupa exatamente a secção (inset-0, altura definida —
// Safari resolve o next/image `fill`), e a folga para o deslocamento vem de um
// `scale` constante, não de sobredimensionar (que partia o fill no Safari).
// Com prefers-reduced-motion não há deslocamento.
export default function HeroMedia() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "8%"]
  );

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y, scale: 1.2 }}>
        <Image
          src="/images/home/hero-workshop.jpg"
          alt="Oficina J. Mendes Mobiliário"
          fill
          priority
          sizes="100vw"
          className="hero-slow-zoom object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/20" />
    </div>
  );
}
