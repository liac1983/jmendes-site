// components/layout/header.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl"; // Importar isto
import { navigation } from "@/data/navigation";
import LanguageSwitcher from "./language-switcher";
import MobileMenu from "./mobile-menu";

type Props = {
  locale: string;
};

export default function Header({ locale }: Props) {
  const pathname = usePathname();
  const t = useTranslations("Nav"); // "Nav" corresponde à chave no JSON
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-700 ease-out ${
        scrolled
          ? "border-[var(--border)] bg-black/95 shadow-[0_18px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl"
          : "border-transparent bg-black/70 backdrop-blur-sm"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1280px] items-center justify-between px-6 transition-[height] duration-700 ease-out ${
          scrolled ? "h-20" : "h-24"
        }`}
      >
        <Link href={`/${locale}`} className="shrink-0">
          <img
            src="/images/logo/logo.jpg"
            alt="Logo"
            className={`w-auto object-contain transition-[height] duration-700 ease-out ${
              scrolled ? "h-12" : "h-14"
            }`}
          />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {navigation.map((item) => {
            const href = `/${locale}${item.href}`;
            const isHome = item.href === "";
            const isActive = isHome ? pathname === `/${locale}` : pathname === href;

            return (
              <Link
                key={item.label}
                href={href}
                className={`text-[17px] transition-colors ${
                  isActive ? "text-gold" : "text-white hover:text-gold"
                }`}
              >
                {t(item.label)} {/* Tradução acontece aqui */}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <LanguageSwitcher locale={locale} />
        </div>
        <MobileMenu locale={locale} />
      </div>
    </header>
  );
}
