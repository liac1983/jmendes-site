"use client";

import clsx from "clsx";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** Força do efeito (0–1). 0.35 ≈ subtil. */
  strength?: number;
};

// Efeito magnético: o elemento "puxa" ligeiramente na direção do cursor e
// regressa ao centro ao sair. Degrada com elegância — sem JS ou com
// prefers-reduced-motion, fica estático e totalmente funcional.
export default function Magnetic({
  children,
  className,
  strength = 0.35,
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 220, damping: 16, mass: 0.3 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  function handleMouseMove(e: MouseEvent<HTMLSpanElement>) {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      className={clsx("inline-flex", className)}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.span>
  );
}
