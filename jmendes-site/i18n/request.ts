// i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { locales } from '@/data/navigation';

export default getRequestConfig(async ({ requestLocale }) => {
  // Esperar pelo locale
  const locale = await requestLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});