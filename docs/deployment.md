# SynQ Labs Deployment Guide

## Overview

This guide covers deploying the SynQ Labs website to Vercel with Supabase backend integration.

---

## Prerequisites

- GitHub account (for Vercel deployment)
- Supabase account and project
- Domain name (optional, e.g., synqlabs.ai)
- Environment variables ready

---

## Part 1: Supabase Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details:
   - **Name**: synqlabs-production
   - **Database Password**: (generate strong password)
   - **Region**: Choose closest to your users
4. Wait for project to initialize (~2 minutes)

### 2. Set Up Database Schema

1. Open Supabase Dashboard → **SQL Editor**
2. Copy SQL from `docs/supabase-schema.md`
3. Execute the following in order:
   - Create `contact_submissions` table + RLS policies
   - Create `blog_posts` table + RLS policies + trigger
   - Create `newsletter_subscribers` table + RLS policies
4. Verify tables exist in **Table Editor**

### 3. Get Supabase Credentials

Navigate to **Project Settings** → **API**:

```
NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]
```

⚠️ **Important**: Keep `SUPABASE_SERVICE_ROLE_KEY` secret!

### 4. Configure Row Level Security

Verify RLS policies are active:
1. Go to **Authentication** → **Policies**
2. Check each table has appropriate policies:
   - `contact_submissions`: Public inserts allowed
   - `blog_posts`: Public reads for published posts only
   - `newsletter_subscribers`: Public inserts allowed

---

## Part 2: Vercel Deployment

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Connect GitHub Repository**
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   ```
   Framework Preset: Next.js
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

3. **Add Environment Variables**
   
   In Vercel Dashboard → Project Settings → Environment Variables:
   
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
   SUPABASE_SERVICE_ROLE_KEY=[service-role-key]
   
   # Blog API (generate secure key)
   BLOG_API_KEY=[generate-random-string]
   
   # Site URL (for sharing links)
   NEXT_PUBLIC_SITE_URL=https://synqlabs.vercel.app
   
   # Optional: Analytics
   NEXT_PUBLIC_GA_ID=[google-analytics-id]
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your site will be live at `https://[project-name].vercel.app`

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow prompts to configure project
```

---

## Part 3: Custom Domain Setup

### 1. Add Domain to Vercel

1. Go to Project Settings → **Domains**
2. Click "Add Domain"
3. Enter your domain: `synqlabs.ai`
4. Vercel will provide DNS configuration

### 2. Configure DNS

**Option A: Use Vercel Nameservers (Recommended)**
1. At your domain registrar, update nameservers to:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
2. Vercel will handle all DNS automatically

**Option B: Use Custom DNS**
Add these records at your DNS provider:

```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

### 3. Enable SSL

- SSL certificate is automatically provisioned by Vercel
- May take 24-48 hours for DNS propagation
- Force HTTPS redirect is enabled by default

### 4. Update Environment Variables

Update `NEXT_PUBLIC_SITE_URL` in Vercel:
```
NEXT_PUBLIC_SITE_URL=https://synqlabs.ai
```

---

## Part 4: Post-Deployment Configuration

### 1. Verify Functionality

**Test Checklist:**
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] About page displays properly
- [ ] Services page interactive accordions work
- [ ] Blog list page loads (empty state if no posts)
- [ ] Contact form submits successfully
- [ ] Check Supabase for contact submission
- [ ] Mobile responsive on all pages
- [ ] Images load properly

### 2. Set Up Analytics

**Google Analytics (Optional)**
1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to Vercel environment variables:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
4. Deploy to apply changes

**Vercel Analytics (Recommended)**
1. In Vercel Dashboard → **Analytics**
2. Click "Enable Analytics"
3. Free tier includes:
   - Web Vitals
   - Visitor insights
   - Page performance

### 3. Configure Error Tracking

**Sentry (Optional)**
```bash
npm install @sentry/nextjs

# Initialize
npx @sentry/wizard@latest -i nextjs
```

Add Sentry DSN to environment variables:
```
NEXT_PUBLIC_SENTRY_DSN=[your-dsn]
```

### 4. Set Up Monitoring

**Vercel Monitoring**
- Vercel provides built-in monitoring
- Check **Deployment** tab for build logs
- Monitor **Analytics** for errors

**UptimeRobot (Free Alternative)**
1. Sign up at [uptimerobot.com](https://uptimerobot.com)
2. Add new monitor:
   - Type: HTTPS
   - URL: https://synqlabs.ai
   - Interval: 5 minutes
3. Get alerts if site goes down

---

## Part 5: CI/CD Setup

### Automatic Deployments

**Production Branch (main)**
```yaml
# Vercel automatically deploys on push to main
# No configuration needed
```

**Preview Deployments**
- Every pull request gets a preview URL
- Test changes before merging
- URL format: `https://synqlabs-[pr-id].vercel.app`

### GitHub Actions (Optional)

Create `.github/workflows/quality-check.yml`:

```yaml
name: Quality Check

on:
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run lint
      - run: npm run build
```

---

## Part 6: Database Backups

### Supabase Backups

**Automatic Backups:**
- Free tier: Daily backups (7-day retention)
- Pro tier: Point-in-time recovery

**Configure in Supabase:**
1. Go to **Database** → **Backups**
2. Verify backup schedule
3. Test restore process

**Manual Backup:**
```bash
# Use pg_dump for manual backups
pg_dump -h [db-host] -U postgres -d postgres > backup.sql
```

### Environment Variables Backup

Store in secure location (1Password, LastPass):
```
# Production Environment Variables
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
BLOG_API_KEY=...
NEXT_PUBLIC_SITE_URL=...
```

---

## Part 7: Performance Optimization

### Vercel Configuration

Create `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/(.*)\\.(jpg|jpeg|png|gif|svg|webp)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Image Optimization

```javascript
// next.config.ts
const config = {
  images: {
    formats: ['image/webp'],
    domains: ['images.unsplash.com'], // Add your image domains
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
};
```

### Bundle Analysis

```bash
# Install analyzer
npm install --save-dev @next/bundle-analyzer

# Add to next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(config);

# Run analysis
ANALYZE=true npm run build
```

---

## Part 8: Security Checklist

- [ ] Environment variables secured (not in code)
- [ ] SUPABASE_SERVICE_ROLE_KEY kept secret
- [ ] RLS policies enabled on all tables
- [ ] CORS configured correctly
- [ ] Rate limiting on contact form
- [ ] API routes authenticated (blog API)
- [ ] HTTPS enabled (force redirect)
- [ ] Security headers configured
- [ ] Dependencies updated regularly
- [ ] No sensitive data in logs

---

## Part 9: SEO Configuration

### 1. Sitemap

Create `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://synqlabs.ai</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://synqlabs.ai/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://synqlabs.ai/services</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://synqlabs.ai/blogs</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

### 2. Robots.txt

Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://synqlabs.ai/sitemap.xml
```

### 3. Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property for `synqlabs.ai`
3. Verify ownership (via DNS or HTML file)
4. Submit sitemap
5. Monitor indexing status

---

## Troubleshooting

### Build Failures

**Error:** Module not found
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

**Error:** Environment variable not found
- Check variables in Vercel Dashboard
- Ensure all required variables are set
- Redeploy after adding variables

### Database Connection Issues

**Error:** Could not connect to Supabase
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check Supabase project is active
- Confirm RLS policies aren't blocking requests

### Domain Issues

**Problem:** Domain not loading
- Wait 24-48 hours for DNS propagation
- Check DNS records are correct
- Verify SSL certificate is issued

### Performance Issues

**Slow page loads:**
- Check bundle size with analyzer
- Optimize images (WebP format, proper sizes)
- Enable Vercel Analytics to identify bottlenecks
- Review Lighthouse report

---

## Maintenance Schedule

### Daily
- Monitor error logs
- Check uptime status

### Weekly
- Review analytics
- Check for security updates
- Monitor blog post performance

### Monthly
- Review and update dependencies
- Check Supabase usage/limits
- Review SEO rankings
- Backup environment variables

### Quarterly
- Full site audit
- Performance optimization
- Content review and updates
- Security audit

---

## Support Resources

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Community Support**: [GitHub Issues](https://github.com/vercel/next.js/discussions)

---

*Last Updated: 2025-01-12*  
*Version: 1.0*
