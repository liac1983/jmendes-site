import "./globals.css";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html
      lang={locale}
      className={`${headingFont.variable} ${bodyFont.variable}`}
    >
      <body className="bg-[var(--background)] text-[var(--foreground)]">
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}

