import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from "better-auth/cookies"
import React from 'react'

export function middlewareAuth(request: NextRequest) {
  
  const sessionCookie = getSessionCookie(request);
  
  // Define las rutas protegidas
  if(request.nextUrl.pathname.startsWith('/dashboard')) {
    if(!sessionCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Si ya está logueado, evitar que vuelva a la página de login
  if(request.nextUrl.pathname.startsWith('login')) {
    if(sessionCookie) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "login"]
}
