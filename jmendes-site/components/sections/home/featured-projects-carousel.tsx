"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { FeaturedProjectCard } from "@/types/featured-project";

type Props = {
  projects: FeaturedProjectCard[];
  locale: string;
  viewAllLabel: string;
  viewAllHref: string;
  viewProjectLabel: string;
  categoryFallback: string;
};

export default function FeaturedProjectsCarousel({
  projects,
  locale,
  viewAllLabel,
  viewAllHref,
  viewProjectLabel,
  categoryFallback,
}: Props) {
  const [current, setCurrent] = useState(0);
  const total = projects.length;

  function goTo(index: number) {
    setCurrent(Math.max(0, Math.min(index, total - 1)));
  }

  function handleDragEnd(_: unknown, info: { offset: { x: number } }) {
    const threshold = 50;
    if (info.offset.x < -threshold && current < total - 1) goTo(current + 1);
    else if (info.offset.x > threshold && current > 0) goTo(current - 1);
  }

  if (!total) return null;

  return (
    <div className="relative overflow-hidden" style={{ touchAction: "pan-y" }}>
      {/* Sliding track — all slides in a flex row */}
      <motion.div
        className="flex"
        style={{ width: `${total * 100}%` }}
        animate={{ x: `-${(current / total) * 100}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 40 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        {projects.map((project) => {
          const href = `/${locale}/projetos-destaque/${project.slug}`;
          return (
            <div
              key={project.slug}
              className="relative select-none"
              style={{ width: `${100 / total}%` }}
            >
              {/* Hero image */}
              <div className="relative aspect-[4/5] w-full sm:aspect-[4/3] md:aspect-[16/9]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  draggable={false}
                  priority
                />
                {/* Gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/10" />

                {/* Text overlay — bottom left. Sombra garante leitura sobre imagens claras. */}
                <div className="absolute bottom-0 left-0 right-0 p-6 [text-shadow:0_2px_14px_rgba(0,0,0,0.8)] md:p-10 lg:p-14">
                  <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[var(--gold)]">
                    {project.categoryLabel || categoryFallback}
                  </p>
                  <h3 className="mb-3 text-2xl font-semibold text-white md:text-4xl lg:text-5xl">
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <p className="mb-5 max-w-lg text-sm text-white md:text-base">
                      {project.subtitle}
                    </p>
                  )}
                  <Link
                    href={href}
                    className="editorial-link inline-flex items-center gap-2 text-base text-white/90 transition-opacity hover:opacity-70 md:text-lg"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {viewProjectLabel}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Dot indicators */}
      {total > 1 && (
        <div className="mt-5 flex items-center justify-center gap-3">
          {projects.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => goTo(i)}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: i === current ? 32 : 8,
                backgroundColor:
                  i === current
                    ? "var(--gold)"
                    : "color-mix(in srgb, var(--gold) 30%, transparent)",
              }}
            />
          ))}
        </div>
      )}

      {/* View all link */}
      <div className="mt-8 text-center">
        <Link
          href={viewAllHref}
          className="editorial-link inline-flex items-center gap-3 text-2xl text-gold transition-opacity hover:opacity-80"
        >
          {viewAllLabel}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
