import { NextResponse } from 'next/server'
import { locales, defaultLocale } from './app/i18n/locales'

export function middleware(request) {
  const pathname = request.nextUrl.pathname

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Detect preferred locale from Accept-Language header
    const acceptLanguage = request.headers.get('accept-language') || ''
    const preferredLocale = locales.find((locale) => 
      acceptLanguage.includes(locale)
    ) || defaultLocale

    // e.g. incoming request is /products
    // The new URL is now /en/products
    return NextResponse.redirect(
      new URL(`/${preferredLocale}${pathname}`, request.url)
    )
  }
}

export const config = {
  // Match only pathnames that are not already prefixed with a locale
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
}
