import createMiddleware from "next-intl/middleware";
import { locales } from "./data/navigation";

export default createMiddleware({
  locales,
  defaultLocale: "pt",
});

export const config = {
  matcher: ["/", "/(pt|en|fr|es)/:path*"],
};
