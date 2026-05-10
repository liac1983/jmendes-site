"use client";

import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const editorialEase = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  viewportAmount?: number;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
  y = 24,
  viewportAmount = 0.22,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: viewportAmount }}
      transition={{ duration, delay, ease: editorialEase }}
    >
      {children}
    </motion.div>
  );
}

export function ImageReveal({
  children,
  className,
  delay = 0,
  duration = 1,
  y = 24,
  viewportAmount = 0.2,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={clsx("relative overflow-hidden", className)}>{children}</div>;
  }

  return (
    <motion.div
      className={clsx("relative overflow-hidden", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
    >
      <motion.div
        className="relative h-full w-full"
        variants={{
          hidden: { opacity: 0, y, scale: 1.015 },
          visible: { opacity: 1, y: 0, scale: 1 },
        }}
        transition={{ duration, delay, ease: editorialEase }}
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 bg-[var(--surface)]"
        variants={{
          hidden: { y: 0 },
          visible: { y: "100%" },
        }}
        transition={{ duration: duration + 0.12, delay, ease: editorialEase }}
      />
    </motion.div>
  );
}
