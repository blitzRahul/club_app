import { NextResponse, NextRequest } from 'next/server'
 
export { default } from 'next-auth/middleware'
 
export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*', '/internal/:path*', '/recruitment/:path*', '/tokencity/internal'],
}