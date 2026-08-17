# Production Configuration Guide

This document provides comprehensive information about the production configuration for the Robotics Portfolio Platform.

## Table of Contents

1. [Environment Variables](#environment-variables)
2. [Error Handling](#error-handling)
3. [Rate Limiting](#rate-limiting)
4. [Security Headers](#security-headers)
5. [Caching Strategy](#caching-strategy)
6. [Production Build](#production-build)
7. [Deployment](#deployment)
8. [Monitoring & Logging](#monitoring--logging)

---

## Environment Variables

### Required Variables

The following environment variables are **required** for production:

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
SESSION_SECRET=your-super-secret-session-key-change-this-in-production
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change-this-secure-password
```

### Generate Secure Session Secret

```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Full Environment Configuration

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

For Vercel deployment, set environment variables in the Vercel dashboard under:
**Project Settings → Environment Variables**

See [.env.example](./.env.example) for all available configuration options.

---

## Error Handling

### Server-Side Error Handling

The application includes a comprehensive error handling system:

- **Location**: `lib/utils/error-handler.ts`
- **Features**:
  - Centralized error codes and messages
  - Production-safe error responses (no stack traces in production)
  - Logging to console and external error tracking services
  - Type-safe error handling with TypeScript

#### Usage Example

```typescript
import { AppError, ErrorCode, handleError, Logger } from '@/lib/utils/error-handler';

// Throwing custom errors
throw new AppError(
  ErrorCode.VALIDATION_ERROR,
  'Invalid input provided',
  400
);

// Handling errors in API routes
export async function POST(request: Request) {
  try {
    // Your logic here
  } catch (error) {
    const handledError = handleError(error);
    return NextResponse.json(handledError.error, {
      status: handledError.status,
    });
  }
}

// Logging errors
Logger.error('An error occurred', error, { userId: '123' });
```

### Client-Side Error Handling

#### Error Boundaries

- **Component**: `components/error-boundary.tsx`
- **Usage**: Wrap components to catch React errors

```tsx
import { ErrorBoundary } from '@/components/error-boundary';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

#### Next.js Error Pages

The application includes custom error pages:

1. **`app/error.tsx`** - Catches errors in pages and components
2. **`app/global-error.tsx`** - Catches critical errors in root layout
3. **`app/not-found.tsx`** - Custom 404 page

These pages:
- Display user-friendly error messages
- Log errors for debugging
- Provide recovery options (retry, go home)
- Show error details in development mode only

---

## Rate Limiting

### Overview

Rate limiting prevents API abuse and ensures fair usage.

- **Location**: `lib/utils/rate-limiter.ts`
- **Implementation**: Token bucket algorithm with in-memory storage
- **IP Detection**: Supports Vercel, Cloudflare, and standard proxy headers

### Default Limits

| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| API Routes | 100 requests | 15 minutes |
| Contact Form | 5 submissions | 1 hour |
| Health Check | 60 requests | 1 minute |

### Configuration

Set in environment variables:

```env
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_SECONDS=900
CONTACT_RATE_LIMIT=5
```

### Usage in API Routes

```typescript
import { rateLimit } from '@/lib/utils/rate-limiter';

export async function POST(request: Request) {
  try {
    // Apply rate limiting
    await rateLimit(request, {
      maxRequests: 50,
      windowSeconds: 60,
      identifier: 'custom-endpoint',
    });

    // Your logic here
  } catch (error) {
    // Rate limit errors are handled automatically
    const handledError = handleError(error);
    return NextResponse.json(handledError.error, {
      status: handledError.status,
    });
  }
}
```

### Rate Limit Headers

Responses include informative headers:

- `X-RateLimit-Remaining`: Requests remaining in current window
- `X-RateLimit-Reset`: Timestamp when the limit resets
- `Retry-After`: Seconds until retry (on rate limit exceeded)

### Production Considerations

⚠️ **Note**: The current implementation uses in-memory storage. For production with multiple server instances, consider:

- **Redis**: For distributed rate limiting
- **Vercel Edge Config**: For edge-based rate limiting
- **Upstash**: Serverless Redis for rate limiting

---

## Security Headers

### Configured Headers

The application sets comprehensive security headers via `next.config.ts`:

```typescript
{
  'X-DNS-Prefetch-Control': 'on',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload' // Production only
}
```

### Content Security Policy

Additional CSP headers are set in `middleware.ts` for API routes:

```typescript
'Content-Security-Policy': "default-src 'self'; script-src 'none'; object-src 'none';"
```

### Authentication Middleware

- **Location**: `middleware.ts`
- **Protected Routes**: All `/admin/*` routes (except `/admin/login`)
- **Session Management**: Cookie-based with expiration
- **Features**:
  - Automatic redirect to login for unauthenticated users
  - Session expiry checking
  - Remember me functionality

---

## Caching Strategy

### Static Assets

Aggressive caching for optimal performance:

| Asset Type | Cache Duration | Header |
|------------|----------------|--------|
| Media files (`/media/*`) | 1 year | `public, max-age=31536000, immutable` |
| Images (`/images/*`) | 1 year | `public, max-age=31536000, immutable` |
| Documents (`/documents/*`) | 1 week | `public, max-age=604800, must-revalidate` |
| JSON data (`/data/*.json`) | 5 minutes | `public, max-age=300, stale-while-revalidate=60` |

### Next.js Image Optimization

```typescript
{
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  minimumCacheTTL: 2592000, // 30 days
}
```

### Rendering Strategy

- **Static Generation**: Used for public pages where possible
- **Dynamic Rendering**: Used for admin dashboard and personalized content
- **Incremental Static Regeneration**: Can be enabled for frequently updated content

---

## Production Build

### Build Optimizations

Configured in `next.config.ts`:

1. **Compression**: gzip/brotli enabled
2. **Console Removal**: Removes `console.log` in production (keeps `error`, `warn`)
3. **CSS Optimization**: Experimental CSS optimization enabled
4. **Package Optimization**: Optimized imports for `lucide-react`, `framer-motion`
5. **Standalone Output**: Creates optimized standalone build
6. **React Strict Mode**: Enabled for catching potential issues

### Build Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Run tests
npm test

# Verify production configuration
npm run verify:production

# Quick verification (skip build)
npm run verify:production:quick
```

### Build Verification

The `verify-production-build.js` script checks:

- ✓ Required files present
- ✓ Environment variable template complete
- ✓ Required npm scripts configured
- ✓ Next.js configuration optimized
- ✓ TypeScript type checking passes
- ✓ Production build succeeds
- ✓ Build output directory created

Run verification before deployment:

```bash
npm run verify:production
```

### TypeScript Configuration

Strict mode enabled in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

---

## Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click "New Project"
   - Import your Git repository

2. **Configure Project**
   - Framework Preset: **Next.js**
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

3. **Set Environment Variables**
   - Go to **Project Settings → Environment Variables**
   - Add all variables from `.env.example`
   - Set appropriate values for production

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy

### Automatic Deployments

- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

### Custom Domain

1. Go to **Project Settings → Domains**
2. Add your custom domain
3. Follow DNS configuration instructions

### Environment-Specific Variables

Set different values for:
- **Production**: Used in production deployment
- **Preview**: Used in preview deployments
- **Development**: Used locally (not synced)

---

## Monitoring & Logging

### Log Levels

Configure via `LOG_LEVEL` environment variable:

- `error` (default): Only errors
- `warn`: Warnings and errors
- `info`: Informational messages, warnings, and errors
- `debug`: All messages (verbose)

### Production Logging

```typescript
import { Logger } from '@/lib/utils/error-handler';

// Error logging (always logged in production)
Logger.error('Critical error occurred', error, {
  userId: '123',
  action: 'create-project',
});

// Warning logging
Logger.warn('Rate limit approaching', {
  ip: '192.168.1.1',
  remaining: 10,
});

// Info logging (if LOG_LEVEL=info)
Logger.info('User logged in', { userId: '123' });

// Debug logging (if LOG_LEVEL=debug)
Logger.debug('Cache hit', { key: 'projects-list' });
```

### Error Tracking Integration

Set up external error tracking (optional):

```env
ERROR_TRACKING_URL=https://your-error-tracking-service.com/api
NEXT_PUBLIC_ERROR_TRACKING_URL=https://your-error-tracking-service.com/api/client
```

Supports services like:
- [Sentry](https://sentry.io)
- [LogRocket](https://logrocket.com)
- [Bugsnag](https://bugsnag.com)
- Custom endpoints

### Vercel Analytics

Automatically enabled on Vercel:

```env
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=auto-generated
```

No configuration needed - analytics are automatically collected.

### Health Check Endpoint

Monitor application health:

```bash
# Check application status
curl https://your-domain.com/api/health

# Response
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production",
  "version": "1.0.0"
}
```

---

## Production Checklist

Before deploying to production:

- [ ] Copy `.env.example` to Vercel environment variables
- [ ] Generate secure `SESSION_SECRET`
- [ ] Set strong `ADMIN_PASSWORD`
- [ ] Configure `NEXT_PUBLIC_APP_URL` with production domain
- [ ] Set `LOG_LEVEL=error` for production
- [ ] Review and configure rate limits
- [ ] Set up error tracking service (optional)
- [ ] Configure SMTP for contact form (optional)
- [ ] Run `npm run verify:production` locally
- [ ] Test build succeeds: `npm run build`
- [ ] Test production server: `npm run build && npm start`
- [ ] Configure custom domain in Vercel
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Test all critical user flows
- [ ] Verify rate limiting works
- [ ] Verify error pages display correctly
- [ ] Check Lighthouse scores (aim for 95+)
- [ ] Monitor error logs after deployment

---

## Troubleshooting

### Build Fails

1. Check TypeScript errors: `npx tsc --noEmit`
2. Check for missing dependencies: `npm install`
3. Review build logs for specific errors
4. Ensure Node.js version matches (18+)

### Rate Limiting Not Working

1. Verify `RATE_LIMIT_MAX_REQUESTS` is set
2. Check IP detection is working (logs will show)
3. Consider Redis for multi-instance deployments

### Environment Variables Not Loading

1. Ensure variables are set in Vercel dashboard
2. Prefix public variables with `NEXT_PUBLIC_`
3. Redeploy after adding new variables

### Images Not Loading

1. Check image paths are correct
2. Verify images are in `public/` directory
3. Check Next.js image configuration in `next.config.ts`

### Session Expires Immediately

1. Verify `SESSION_SECRET` is set
2. Check `SESSION_EXPIRE_TIME` value
3. Ensure cookies are enabled in browser

---

## Performance Optimization

### Current Optimizations

- ✓ Image optimization (AVIF, WebP)
- ✓ Automatic code splitting
- ✓ Server components for reduced JavaScript
- ✓ Static generation where possible
- ✓ Aggressive asset caching
- ✓ Compression enabled
- ✓ Console.log removal in production
- ✓ Package import optimization

### Future Optimizations

Consider implementing:

- Database caching layer (Redis)
- CDN for static assets
- Service Worker for offline support
- Progressive Web App (PWA) features
- Image lazy loading optimizations
- Font optimization with next/font

---

## Security Best Practices

### Implemented

- ✓ Comprehensive security headers
- ✓ CSRF protection via SameSite cookies
- ✓ Rate limiting on all API routes
- ✓ Input validation with Zod
- ✓ SQL injection prevention (file-based DB)
- ✓ XSS protection
- ✓ Secure session management
- ✓ HTTPS enforcement in production

### Recommendations

- Regularly update dependencies
- Monitor security advisories
- Implement 2FA for admin access
- Regular security audits
- Penetration testing
- Log monitoring and alerts
- Backup strategy

---

## Support & Resources

- **Documentation**: See README.md and DEPLOYMENT.md
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **TypeScript Docs**: https://www.typescriptlang.org/docs

---

*Last Updated: 2024*
