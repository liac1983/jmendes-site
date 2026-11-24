import createMiddleware from "next-intl/middleware";
import { locales } from "./data/navigation";

export default createMiddleware({
  locales,
  defaultLocale: "pt",
});

export const config = {
  // Tudo menos a API, o painel, os ficheiros internos e os ficheiros com extensão.
  // Um endereço sem língua (ex.: /portfolio) é encaminhado para a versão com língua.
  matcher: ["/((?!api|studio|_next|_vercel|.*\\..*).*)"],
};
