"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { locales } from "@/data/navigation";

type Props = {
  locale: string;
};

export default function LanguageSwitcher({ locale }: Props) {
  const pathname = usePathname();

  const pathWithoutLocale = pathname.replace(/^\/(pt|en|fr|es)/, "") || "/";

  return (
    <div className="flex items-center gap-3 text-sm">
      <Globe className="h-4 w-4 text-gold" />
      {locales.map((lang) => {
        const href = `/${lang}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
        const isActive = locale === lang;

        return (
          <Link
            key={lang}
            href={href}
            className={`uppercase transition-colors ${
              isActive ? "text-gold" : "text-white/70 hover:text-gold"
            }`}
          >
            {lang}
          </Link>
        );
      })}
    </div>
  );
}
