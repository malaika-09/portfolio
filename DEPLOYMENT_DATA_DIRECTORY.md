# Data Directory Configuration for Deployments

This document explains how the data directory is configured and how to troubleshoot issues related to project detail pages returning 404 errors.

## Overview

The application stores content data (projects, blog posts, achievements, etc.) in JSON files located in the `data/` directory. For the application to work correctly in production, this directory must be accessible at runtime.

## How It Works

### Development Mode

In development mode (`npm run dev`), the application reads directly from `./data/` in the project root.

### Production Standalone Builds

When building with `output: 'standalone'` in `next.config.ts`, Next.js creates a self-contained deployment package in `.next/standalone/`. The application is configured to:

1. **Automatically include data directory**: The `experimental.outputFileTracingIncludes` configuration ensures the data directory is copied to the standalone build.

2. **Smart path resolution**: The BaseRepository automatically checks multiple locations:
   - Environment variable `DATA_DIR` (highest priority)
   - Development: `process.cwd()/data`
   - Standalone build: `.next/standalone/data`
   - Fallback: `process.cwd()/data`

## Configuration

### Next.js Configuration (next.config.ts)

```typescript
experimental: {
  outputFileTracingIncludes: {
    '/api/**/*': ['./data/**/*'],
  },
}
```

This ensures all files in the `data/` directory are included in standalone builds.

### Environment Variable (Optional)

If your deployment environment requires a custom data directory path, set the `DATA_DIR` environment variable:

```bash
DATA_DIR=/custom/path/to/data
```

**Vercel:**
```bash
# In Vercel dashboard: Settings > Environment Variables
DATA_DIR=/var/task/data
```

**Docker:**
```dockerfile
ENV DATA_DIR=/app/data
COPY ./data /app/data
```

**Traditional Node.js hosting:**
```bash
export DATA_DIR=/home/user/app/data
```

## Deployment Platforms

### Vercel

Vercel deployments should work automatically with the configured `outputFileTracingIncludes`. The data directory will be included in the deployment.

**Verification:**
1. Deploy to Vercel
2. Check build logs to ensure data directory is included
3. Access `/api/projects` to verify data is accessible
4. Navigate to a project detail page (e.g., `/projects/[id]`) to confirm it loads

### Docker

When deploying with Docker, ensure the data directory is copied to the container:

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy standalone build
COPY .next/standalone ./
COPY public ./public
COPY .next/static ./.next/static

# IMPORTANT: Copy data directory
COPY data ./data

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
```

### Traditional Node.js Hosting

For traditional hosting (VPS, shared hosting, etc.):

1. Build the application:
   ```bash
   npm run build
   ```

2. Copy the following to your server:
   - `.next/standalone/` directory
   - `public/` directory
   - `.next/static/` directory
   - `data/` directory ← **IMPORTANT**

3. Set environment variables if needed:
   ```bash
   export NODE_ENV=production
   export DATA_DIR=/path/to/data
   ```

4. Start the server:
   ```bash
   cd .next/standalone
   node server.js
   ```

## Troubleshooting

### Project Detail Pages Return 404

**Symptoms:**
- Projects list page (`/projects`) works
- Individual project pages (`/projects/[id]`) return 404
- API endpoint `/api/projects/[id]` returns 404 or 500 error

**Diagnosis:**

1. **Check if data directory exists:**
   ```bash
   ls -la data/projects.json
   ```

2. **Check application logs:**
   Look for messages like:
   ```
   [BaseRepository] Using data directory: /path/to/data
   [projects] Data file not found, returning empty array: /path/to/data/projects.json
   ```

3. **Verify API endpoint:**
   ```bash
   curl https://your-domain.com/api/projects
   ```
   Should return an array of projects.

   ```bash
   curl https://your-domain.com/api/projects/1785417576617-ggruvc3l8
   ```
   Should return a single project object.

**Solutions:**

1. **Standalone build missing data directory:**
   - Verify `experimental.outputFileTracingIncludes` is configured in `next.config.ts`
   - Rebuild the application: `npm run build`
   - Check that `.next/standalone/data/` exists after build

2. **Custom deployment environment:**
   - Set `DATA_DIR` environment variable to the correct path
   - Ensure the data directory is copied to the deployment location
   - Restart the application after setting environment variables

3. **File permissions:**
   - Ensure the Node.js process has read access to the data directory
   ```bash
   chmod -R 755 data/
   ```

4. **Path resolution issues:**
   - Check application logs for resolved DATA_DIR path
   - Verify `process.cwd()` returns the expected directory in production
   - Consider using absolute paths via `DATA_DIR` environment variable

### Data Not Persisting

**Symptoms:**
- Projects created in admin panel don't appear after application restart
- Changes to projects are lost

**Diagnosis:**

This typically happens in serverless or read-only filesystem environments.

**Solutions:**

1. **For serverless platforms (Vercel, AWS Lambda):**
   - Consider migrating to a database (PostgreSQL, MongoDB)
   - Use external storage (S3, Cloudinary) for persistent data
   - Note: JSON file storage is not suitable for serverless environments

2. **For container-based deployments (Docker, Kubernetes):**
   - Mount a persistent volume for the data directory
   ```yaml
   # docker-compose.yml
   volumes:
     - ./data:/app/data
   ```

3. **For traditional hosting:**
   - Ensure the data directory is writable
   ```bash
   chmod -R 775 data/
   ```

## Best Practices

1. **Backup data directory regularly:**
   ```bash
   cp -r data/ data_backup_$(date +%Y%m%d)/
   ```

2. **Version control:**
   - Include `data/*.json` in git for initial setup
   - Consider using `.gitignore` for user-generated data
   - Document any required seed data

3. **Monitoring:**
   - Set up alerts for API endpoint errors
   - Monitor application logs for data access issues
   - Implement health checks that verify data directory accessibility

4. **Migration path:**
   - Plan to migrate from JSON files to a proper database for production
   - The repository pattern makes this migration straightforward
   - Consider PostgreSQL, MySQL, or MongoDB depending on your needs

## Testing Data Directory Configuration

Run these tests to verify your deployment:

```bash
# 1. Check data directory exists
ls -la data/projects.json

# 2. Test API endpoint locally
npm run build
npm start
curl http://localhost:3000/api/projects

# 3. Test project detail page
curl http://localhost:3000/api/projects/1785417576617-ggruvc3l8

# 4. Run automated tests
npm test -- __tests__/bugfix/project-detail-404.test.ts
```

## Related Files

- `next.config.ts` - Data directory inclusion configuration
- `lib/data/base-repository.ts` - Path resolution logic
- `.env.example` - DATA_DIR environment variable documentation
- `data/projects.json` - Projects data file
- `app/api/projects/[id]/route.ts` - Project detail API endpoint

## Support

If you continue to experience issues after following this guide:

1. Check application logs for error messages
2. Verify data directory permissions and accessibility
3. Test API endpoints directly before testing web pages
4. Review Next.js build output for warnings or errors
5. Consider enabling debug logging by setting `LOG_LEVEL=debug` in environment variables
