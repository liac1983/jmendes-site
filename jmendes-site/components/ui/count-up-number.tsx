"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type CountUpNumberProps = {
  value: string;
  delay?: number;
  duration?: number;
};

function parseStatValue(value: string) {
  const match = value.trim().match(/^([^0-9]*)([0-9]+)(.*)$/);

  if (!match) {
    return {
      prefix: "",
      target: 0,
      suffix: value,
    };
  }

  return {
    prefix: match[1],
    target: Number(match[2]),
    suffix: match[3],
  };
}

export default function CountUpNumber({
  value,
  delay = 0,
  duration = 1700,
}: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { prefix, target, suffix } = useMemo(() => parseStatValue(value), [value]);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    if (shouldReduceMotion) return;

    const start = () => setHasStarted(true);

    if (!("IntersectionObserver" in window)) {
      start();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [shouldReduceMotion, target]);

  useEffect(() => {
    if (!hasStarted || shouldReduceMotion) return;

    let frameId = 0;
    let startTime: number | null = null;
    const timeoutId = window.setTimeout(() => {
      const animate = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;

        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        setDisplayValue(Math.round(target * easedProgress));

        if (progress < 1) {
          frameId = window.requestAnimationFrame(animate);
        }
      };

      frameId = window.requestAnimationFrame(animate);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      window.cancelAnimationFrame(frameId);
    };
  }, [delay, duration, hasStarted, shouldReduceMotion, target]);

  const visibleValue = shouldReduceMotion ? target : displayValue;

  return (
    <span ref={ref} aria-label={value}>
      {prefix}
      {visibleValue}
      {suffix}
    </span>
  );
}
