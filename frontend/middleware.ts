import createMiddleware from "next-intl/middleware"
import { locales, defaultLocale } from "./lib/i18n"

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
  localeDetection: true,
})

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
