// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from "next/navigation";
import { locales } from "@/data/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HtmlLang from "@/components/seo/html-lang";
import JsonLd from "@/components/seo/json-ld";
import GoogleAnalytics from "@/components/seo/google-analytics";
import CookieBanner from "@/components/legal/cookie-banner";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(locales as readonly string[]).includes(locale)) notFound();
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <HtmlLang locale={locale} />
      <JsonLd />
      <Header locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
      <CookieBanner locale={locale} />
      <GoogleAnalytics />
    </NextIntlClientProvider>
  );
}
