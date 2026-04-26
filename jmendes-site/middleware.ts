// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { locales } from './data/navigation';

export default createMiddleware({
  locales: locales,
  defaultLocale: 'pt'
});

export const config = {
  // Ignorar ficheiros internos e estáticos
  matcher: ['/', '/(pt|en|fr|es)/:path*']
};
