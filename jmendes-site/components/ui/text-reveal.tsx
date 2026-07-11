"use client";

import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const editorialEase = [0.22, 1, 0.36, 1] as const;

type Tag = "h1" | "h2" | "h3" | "p" | "span";

// "inView": anima ao entrar no ecrã (para conteúdo abaixo da dobra).
// "mount": anima no arranque (para o hero, que está sempre visível).
type Trigger = "inView" | "mount";

// Props de disparo do elemento-pai (é o elemento observado, não deslocado,
// por isso o whileInView dispara de forma fiável).
function triggerProps(trigger: Trigger, viewportAmount: number) {
  if (trigger === "mount") {
    return { initial: "hidden", animate: "visible" } as const;
  }
  return {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: viewportAmount },
  } as const;
}

// Filhos sobem por trás da máscara (overflow-hidden). A estrutura DOM é sempre
// a mesma no servidor e no cliente; o respeito por prefers-reduced-motion é
// feito só via `transition` (que não é renderizada no HTML), evitando qualquer
// hydration mismatch.
const childVariants = {
  hidden: { y: "115%" },
  visible: { y: "0%" },
};

/* ------------------------------------------------------------------ */
/* WordReveal — revela um título (string) palavra a palavra, com máscara */
/* ------------------------------------------------------------------ */

type WordRevealProps = {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  viewportAmount?: number;
  trigger?: Trigger;
};

export function WordReveal({
  text,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.07,
  duration = 0.85,
  viewportAmount = 0.3,
  trigger = "inView",
}: WordRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      aria-label={text}
      {...triggerProps(trigger, viewportAmount)}
      transition={{
        staggerChildren: shouldReduceMotion ? 0 : stagger,
        delayChildren: shouldReduceMotion ? 0 : delay,
      }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.14em] align-bottom"
        >
          <motion.span
            className="inline-block pr-[0.26em]"
            variants={childVariants}
            transition={{ duration: shouldReduceMotion ? 0 : duration, ease: editorialEase }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ */
/* LineReveal — revela linhas (ReactNode[]) uma a uma, com máscara      */
/* ------------------------------------------------------------------ */

type LineRevealProps = {
  lines: ReactNode[];
  as?: Tag;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  viewportAmount?: number;
  trigger?: Trigger;
};

export function LineReveal({
  lines,
  as = "h1",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.12,
  duration = 0.95,
  viewportAmount = 0.05,
  trigger = "inView",
}: LineRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      {...triggerProps(trigger, viewportAmount)}
      transition={{
        staggerChildren: shouldReduceMotion ? 0 : stagger,
        delayChildren: shouldReduceMotion ? 0 : delay,
      }}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          className={clsx("block overflow-hidden pb-[0.1em]", lineClassName)}
        >
          <motion.span
            className="block"
            variants={childVariants}
            transition={{ duration: shouldReduceMotion ? 0 : duration, ease: editorialEase }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
