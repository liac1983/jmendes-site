// i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { locales, type AppLocale } from '@/data/navigation';

const defaultLocale: AppLocale = 'pt';

function isAppLocale(locale: string | undefined): locale is AppLocale {
  return locales.includes(locale as AppLocale);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale = isAppLocale(requestedLocale) ? requestedLocale : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
