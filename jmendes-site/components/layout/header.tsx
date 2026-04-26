// components/layout/header.tsx
"use client";

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

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-black/95 backdrop-blur">
      <div className="mx-auto flex h-24 max-w-[1280px] items-center justify-between px-6">
        <Link href={`/${locale}`} className="shrink-0">
          <img src="/images/logo/logo.jpg" alt="Logo" className="h-14 w-auto object-contain" />
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
