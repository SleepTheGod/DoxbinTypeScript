# Doxbin TypeScript - Production Deployment Guide

Complete guide for deploying Doxbin TypeScript to production on Vercel with Neon PostgreSQL.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [Deploy to Vercel](#deploy-to-vercel)
4. [Environment Variables](#environment-variables)
5. [Domain Configuration](#domain-configuration)
6. [Post-Deployment](#post-deployment)
7. [Troubleshooting](#troubleshooting)
8. [Maintenance](#maintenance)

## Prerequisites

Before deploying, ensure you have:

- [GitHub account](https://github.com)
- [Vercel account](https://vercel.com) (free tier works)
- [Neon account](https://neon.tech) (free tier works) or any PostgreSQL provider
- Git installed locally
- Node.js 18+ or Bun 1.0+

## Database Setup

### Option 1: Neon (Recommended)

Neon provides serverless PostgreSQL perfect for Next.js applications.

1. **Create Neon Project**
   - Go to [Neon Console](https://console.neon.tech)
   - Click "Create Project"
   - Choose a region close to your users
   - Note your project ID and database name

2. **Get Connection String**
   - In project dashboard, click "Connection Details"
   - Copy the connection string (it looks like):
     \`\`\`
     postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
     \`\`\`
   - Save this - you'll need it for Vercel

3. **Initialize Database Schema**
   
   Option A - Automatic (recommended):
   - The schema will be created automatically on first deployment
   
   Option B - Manual:
   \`\`\`bash
   # Install psql if you don't have it
   # macOS: brew install postgresql
   # Ubuntu: sudo apt-get install postgresql-client
   
   # Run the schema
   psql "your-neon-connection-string" -f scripts/001_init_doxbin_schema.sql
   \`\`\`

### Option 2: Other PostgreSQL Providers

You can also use:
- **Supabase**: Free tier with 500MB database
- **Railway**: $5/month with 1GB database
- **PlanetScale**: MySQL-compatible (requires schema modifications)
- **Self-hosted**: Any PostgreSQL 12+ instance

For other providers, get your connection string and run the schema migration manually.

## Deploy to Vercel

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/new)
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Vercel auto-detects Next.js settings

3. **Configure Build Settings** (usually auto-detected)
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `bun run build` or `npm run build`
   - Output Directory: `.next`
   - Install Command: `bun install` or `npm install`

4. **Add Environment Variables** (see next section)

5. **Click "Deploy"**
   - First deployment takes 2-3 minutes
   - Vercel provides a preview URL

### Method 2: Vercel CLI

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow prompts to link project
\`\`\`

### Method 3: Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SleepTheGod/DoxbinTypeScript)

## Environment Variables

Add these in Vercel project settings → Environment Variables.

### Required Variables

\`\`\`env
# Database connection string from Neon
DATABASE_URL=postgresql://user:password@host:5432/database
\`\`\`

### Optional Variables

\`\`\`env
# Your production domain (important for OAuth, emails, etc.)
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Node environment (Vercel sets this automatically)
NODE_ENV=production
\`\`\`

### How to Add Variables in Vercel

1. Go to project settings
2. Click "Environment Variables"
3. Add each variable:
   - Name: `DATABASE_URL`
   - Value: `your-connection-string`
   - Environment: Production (check all that apply)
4. Click "Save"
5. Redeploy for changes to take effect

## Domain Configuration

### Add Custom Domain

1. **In Vercel Dashboard**
   - Go to Project Settings → Domains
   - Click "Add Domain"
   - Enter your domain (e.g., `doxbin.com`)

2. **Configure DNS**
   
   For root domain (doxbin.com):
   \`\`\`
   Type: A
   Name: @
   Value: 76.76.21.21
   \`\`\`
   
   For www subdomain:
   \`\`\`
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   \`\`\`

3. **Wait for SSL**
   - SSL certificate provisioning takes 5-10 minutes
   - Vercel auto-renews certificates

### Domain Providers

Instructions for popular providers:
- **Cloudflare**: Use CNAME flattening for root domain
- **Namecheap**: Advanced DNS → Add records
- **GoDaddy**: DNS Management → Add records
- **Google Domains**: DNS → Custom records

## Post-Deployment

### Verification Checklist

Test these after deployment:

- [ ] Homepage loads correctly
- [ ] Can create a new paste
- [ ] Can view existing paste
- [ ] Search functionality works
- [ ] Mobile responsive (test on phone)
- [ ] SSL certificate is active (https://)
- [ ] No console errors in browser
- [ ] Database connection working

### Enable Analytics

1. **Vercel Analytics** (free)
   - Project Settings → Analytics
   - Toggle "Enable Analytics"
   - No code changes needed

2. **Vercel Speed Insights** (free)
   - Automatically enabled
   - View in Analytics dashboard

### Monitor Errors

1. **Vercel Logs**
   - Deployments → Select deployment → Functions
   - Real-time logs of server errors
   - Filter by function and time

2. **Database Monitoring**
   - Neon Dashboard → Monitoring
   - Track query performance
   - Monitor connection usage

## Troubleshooting

### Build Failures

**Issue**: Build fails with TypeScript errors

**Solution**:
\`\`\`bash
# Run type check locally
bun run type-check

# Fix errors and redeploy
\`\`\`

**Issue**: Missing dependencies

**Solution**:
\`\`\`bash
# Clear node_modules and reinstall
rm -rf node_modules
bun install

# Clear Vercel cache in project settings
\`\`\`

### Database Connection Issues

**Issue**: "Unable to connect to database"

**Solution**:
1. Verify `DATABASE_URL` is correctly set in Vercel
2. Check connection string format:
   \`\`\`
   postgresql://user:pass@host:5432/db?sslmode=require
   \`\`\`
3. Test connection locally:
   \`\`\`bash
   psql "$DATABASE_URL" -c "SELECT 1"
   \`\`\`
4. Ensure Neon project is not paused (free tier auto-pauses)

**Issue**: SSL connection errors

**Solution**: Add `?sslmode=require` to end of DATABASE_URL

### Runtime Errors

**Issue**: 500 Internal Server Error

**Solution**:
1. Check Vercel function logs
2. Look for specific error message
3. Common causes:
   - Missing environment variables
   - Database schema not initialized
   - Rate limit storage issues

**Issue**: 404 on dynamic routes

**Solution**:
1. Verify `next.config.mjs` is correct
2. Check file structure matches routes
3. Redeploy to rebuild routes

### Performance Issues

**Issue**: Slow page loads

**Solution**:
1. Check database query performance in Neon dashboard
2. Verify indexes exist (run schema migration)
3. Enable Vercel caching
4. Use Vercel Speed Insights to identify bottlenecks

**Issue**: High database usage

**Solution**:
1. Add database connection pooling
2. Implement better caching
3. Optimize queries (indexes help)

## Maintenance

### Regular Updates

\`\`\`bash
# Update dependencies
bun update

# Test locally
bun dev

# Commit and push (triggers auto-deploy)
git add package.json bun.lockb
git commit -m "Update dependencies"
git push
\`\`\`

### Database Backups

**Neon Automatic Backups**:
- Free tier: 7 days of point-in-time recovery
- Pro tier: 30 days of retention
- Configure in project settings

**Manual Backup**:
\`\`\`bash
# Export database
pg_dump "$DATABASE_URL" > backup-$(date +%Y%m%d).sql

# Restore from backup
psql "$DATABASE_URL" < backup-20240101.sql
\`\`\`

### Monitoring Checklist

Weekly:
- [ ] Check Vercel analytics
- [ ] Review error logs
- [ ] Monitor database size
- [ ] Check uptime

Monthly:
- [ ] Update dependencies
- [ ] Review and rotate secrets
- [ ] Check for security updates
- [ ] Backup database manually

### Scaling Considerations

**When to upgrade**:
- **Vercel Pro** ($20/mo): More bandwidth, faster builds, team features
- **Neon Pro** ($19/mo): More storage, better performance, longer backups
- **CDN**: Add Cloudflare for DDoS protection

**Performance tips**:
- Use database indexes (already in schema)
- Enable HTTP caching headers (already configured)
- Implement Redis for rate limiting (optional)
- Use edge functions for reads (current setup)

## Production Checklist

Before going live:

- [ ] Database schema deployed and indexed
- [ ] Environment variables configured
- [ ] Custom domain configured with SSL
- [ ] Analytics enabled
- [ ] Error monitoring set up
- [ ] Rate limiting tested
- [ ] Security headers verified
- [ ] Mobile responsiveness tested
- [ ] Search functionality working
- [ ] Terms of Service updated
- [ ] Backup strategy in place
- [ ] Monitoring configured

## Security Best Practices

1. **Never commit `.env` files**
   \`\`\`bash
   # Already in .gitignore
   .env*
   \`\`\`

2. **Rotate database credentials** periodically
   - Generate new password in Neon
   - Update DATABASE_URL in Vercel
   - Redeploy

3. **Monitor logs** for suspicious activity
   - Unusual paste patterns
   - Rate limit hits
   - Failed database connections

4. **Keep dependencies updated**
   \`\`\`bash
   bun update
   \`\`\`

5. **Enable Vercel security features**
   - Attack Challenge Mode
   - IP blocking (Pro tier)
   - DDoS protection

## Support Resources

- **Documentation**: This guide and README.md
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Neon Docs**: [neon.tech/docs](https://neon.tech/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **GitHub Issues**: Report bugs and request features
- **Telegram**: [https://t.me/doxbin](https://t.me/doxbin)

## Need Help?

1. Check [Troubleshooting](#troubleshooting) section
2. Search [GitHub Issues](https://github.com/SleepTheGod/DoxbinTypeScript/issues)
3. Ask in [Telegram group](https://t.me/doxbin)
4. Open a new issue with:
   - Error message
   - Steps to reproduce
   - Environment details
   - Screenshots if applicable

---

**Congratulations!** Your production Doxbin instance should now be live. Monitor the first few days closely and adjust rate limits as needed.
