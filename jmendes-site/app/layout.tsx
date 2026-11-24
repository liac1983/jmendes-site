import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import "./globals.css";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SITE_URL, business } from "@/lib/site";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "J. Mendes Mobiliário — Mobiliário por Medida",
    template: "%s · J. Mendes Mobiliário",
  },
  description:
    "Mobiliário por medida com precisão, design e excelência. Cozinhas, roupeiros, projetos 3D e obra completa em Paços de Ferreira.",
  applicationName: business.name,
  openGraph: {
    type: "website",
    siteName: business.name,
    images: [{ url: business.ogImage, width: 1200, height: 630, alt: business.name }],
  },
  twitter: {
    card: "summary_large_image",
    images: [business.ogImage],
  },
  // Código do Google Search Console (opção «etiqueta HTML»).
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${headingFont.variable} ${bodyFont.variable} h-full`}
    >
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}