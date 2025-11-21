import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  response.headers.set("X-DNS-Prefetch-Control", "on")
  response.headers.set("X-Frame-Options", "SAMEORIGIN")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://code.jquery.com https://maxcdn.bootstrapcdn.com https://www.youtube.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://maxcdn.bootstrapcdn.com https://netdna.bootstrapcdn.com https://cdn.jsdelivr.net",
      "font-src 'self' https://fonts.gstatic.com https://netdna.bootstrapcdn.com",
      "img-src 'self' data: https:",
      "connect-src 'self'",
      "frame-src 'self' https://www.youtube.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
    ].join("; "),
  )

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
