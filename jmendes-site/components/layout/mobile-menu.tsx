"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navigation } from "@/data/navigation";

type Props = {
  locale: string;
};

export default function MobileMenu({ locale }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Abrir menu"
        className="text-white"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && (
        <div className="absolute left-0 top-full w-full border-t border-[var(--border)] bg-black px-6 py-6">
          <nav className="flex flex-col gap-4">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={`/${locale}${item.href}`}
                className="text-white/80 transition-colors hover:text-gold"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

