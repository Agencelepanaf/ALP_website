import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const COOKIE_NAME = 'admin_token'
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

function getJwtSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET
  if (!secret) throw new Error('ADMIN_JWT_SECRET manquant')
  return new TextEncoder().encode(secret)
}

/** Applique les headers de sécurité communs à toute réponse. */
function applySecurityHeaders(response: NextResponse): NextResponse {
  // HSTS — uniquement en production (évite des problèmes en dev avec HTTP)
  if (IS_PRODUCTION) {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    )
  }
  return response
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Routes non-admin : appliquer HSTS uniquement ──────────────────────────
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    const response = NextResponse.next()
    return applySecurityHeaders(response)
  }

  // ── Routes API admin : vérifier le token JWT dans le header Authorization
  //    ou dans le cookie (appels fetch() côté client depuis le panel admin) ──
  if (pathname.startsWith('/api/admin')) {
    const token = request.cookies.get(COOKIE_NAME)?.value
    if (!token) {
      return applySecurityHeaders(
        NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
      )
    }
    try {
      await jwtVerify(token, getJwtSecret())
      const response = NextResponse.next()
      return applySecurityHeaders(response)
    } catch {
      return applySecurityHeaders(
        NextResponse.json({ error: 'Session expirée' }, { status: 401 })
      )
    }
  }

  // ── Routes pages admin ────────────────────────────────────────────────────

  // Injecter le header x-is-admin pour que le layout racine masque Header/Footer
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-is-admin', '1')

  // La page de login est accessible sans authentification
  if (pathname === '/admin/login') {
    const response = NextResponse.next({ request: { headers: requestHeaders } })
    return applySecurityHeaders(response)
  }

  // Vérifier le token pour toutes les autres routes /admin/*
  const token = request.cookies.get(COOKIE_NAME)?.value

  if (!token) {
    return applySecurityHeaders(
      NextResponse.redirect(new URL('/admin/login', request.url))
    )
  }

  try {
    await jwtVerify(token, getJwtSecret())
    const response = NextResponse.next({ request: { headers: requestHeaders } })
    return applySecurityHeaders(response)
  } catch {
    return applySecurityHeaders(
      NextResponse.redirect(new URL('/admin/login', request.url))
    )
  }
}

export const config = {
  // Matcher étendu : pages admin + API admin + toutes les routes publiques (pour HSTS)
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    // Toutes les routes sauf fichiers statiques et métadonnées
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
