import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This middleware runs on every request
export function middleware(_request: NextRequest) {
  // Allow all requests - disable any access restrictions
  const response = NextResponse.next()
  
  // Add CORS headers for NAS access
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  return response
}

// Configure which routes use this middleware
export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}