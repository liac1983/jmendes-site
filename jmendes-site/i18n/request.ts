// i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { locales, type AppLocale } from '@/data/navigation';
import { withSiteContent } from '@/lib/site-content';

const defaultLocale: AppLocale = 'pt';

function isAppLocale(locale: string | undefined): locale is AppLocale {
  return locales.includes(locale as AppLocale);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale = isAppLocale(requestedLocale) ? requestedLocale : defaultLocale;

  return {
    locale,
    // Textos e imagens alterados no painel sobrepõem-se aos do código.
    messages: await withSiteContent(
      locale,
      (await import(`../messages/${locale}.json`)).default
    )
  };
});
