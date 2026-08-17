// ============================================
// NEXT.JS MIDDLEWARE - AUTHENTICATION & ROUTE PROTECTION
// Production-ready with enhanced security and error handling
// ============================================

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware runs on every request before the page is rendered
 * Protects admin routes, handles authentication, and adds security headers
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Add security headers to all responses
  addSecurityHeaders(response);

  // Only check authentication for admin routes (except login page)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    // Check for authentication cookie
    const isAuthenticated = request.cookies.get('isAuthenticated');
    const rememberMe = request.cookies.get('rememberMe');

    if (!isAuthenticated || isAuthenticated.value !== 'true') {
      // Not authenticated, redirect to admin login
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check if session has expired (only for non-remember-me sessions)
    if (rememberMe?.value !== 'true') {
      const sessionExpiry = request.cookies.get('sessionExpiry');
      if (sessionExpiry) {
        const expiryTime = parseInt(sessionExpiry.value);
        if (Date.now() > expiryTime) {
          // Session expired, redirect to login
          const loginUrl = new URL('/admin/login', request.url);
          loginUrl.searchParams.set('redirect', pathname);
          loginUrl.searchParams.set('expired', 'true');
          
          const expiredResponse = NextResponse.redirect(loginUrl);
          expiredResponse.cookies.delete('isAuthenticated');
          expiredResponse.cookies.delete('sessionExpiry');
          expiredResponse.cookies.delete('username');
          addSecurityHeaders(expiredResponse);
          return expiredResponse;
        }
      }
    }
  }

  // Add Content Security Policy for API routes
  if (pathname.startsWith('/api')) {
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'none'; object-src 'none';"
    );
  }

  // Allow request to proceed
  return response;
}

/**
 * Add comprehensive security headers to response
 */
function addSecurityHeaders(response: NextResponse): void {
  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  
  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // Enable XSS protection (legacy browsers)
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Control referrer information
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // DNS prefetch control
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  
  // Permissions Policy (formerly Feature Policy)
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );

  // Strict Transport Security (HTTPS only)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }
}

/**
 * Configure which paths the middleware should run on
 */
export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
