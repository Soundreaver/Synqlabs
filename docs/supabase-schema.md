# Supabase Database Schema

## Overview
This document outlines the database schema for the SynQ Labs landing page, including all tables, columns, and Row Level Security (RLS) policies.

---

## Tables

### 1. contact_submissions

Stores contact form submissions from the website.

```sql
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service_interest TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted'))
);

-- Create index for faster queries
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
```

**RLS Policies:**
```sql
-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone (for contact form)
CREATE POLICY "Allow public inserts" ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can view/update (future admin dashboard)
CREATE POLICY "Allow authenticated read" ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated update" ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true);
```

---

### 2. blog_posts

Stores blog posts with full metadata for SEO and content management.

```sql
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT,
  author TEXT NOT NULL,
  author_bio TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT false,
  read_time_minutes INTEGER,
  seo_title TEXT,
  seo_description TEXT
);

-- Create indexes for better query performance
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC) WHERE is_published = true;
CREATE INDEX idx_blog_posts_tags ON blog_posts USING GIN(tags);
CREATE INDEX idx_blog_posts_is_published ON blog_posts(is_published);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**RLS Policies:**
```sql
-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read published posts
CREATE POLICY "Allow public read published" ON blog_posts
  FOR SELECT
  TO anon
  USING (is_published = true);

-- Allow authenticated users to read all posts
CREATE POLICY "Allow authenticated read all" ON blog_posts
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated write" ON blog_posts
  FOR ALL
  TO authenticated
  USING (true);
```

---

### 3. newsletter_subscribers

Stores email addresses for newsletter subscriptions.

```sql
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  is_active BOOLEAN DEFAULT true
);

-- Create index for email lookups
CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_subscribers_active ON newsletter_subscribers(is_active);
```

**RLS Policies:**
```sql
-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone (for newsletter signup)
CREATE POLICY "Allow public inserts" ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can view/manage subscribers
CREATE POLICY "Allow authenticated read" ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated update" ON newsletter_subscribers
  FOR UPDATE
  TO authenticated
  USING (true);
```

---

## Setup Instructions

### 1. Create Tables

Run the SQL statements above in your Supabase SQL Editor in the following order:
1. `contact_submissions` table
2. `blog_posts` table (including trigger function)
3. `newsletter_subscribers` table

### 2. Enable RLS

All RLS policies are included in the statements above. Ensure they are executed after creating each table.

### 3. Verify Setup

After running the SQL, verify:
- All tables exist
- Indexes are created
- RLS is enabled on all tables
- Policies are active

You can check this in the Supabase Dashboard:
- **Database** → **Tables** (view tables)
- **Database** → **Indexes** (verify indexes)
- **Authentication** → **Policies** (verify RLS policies)

---

## API Access

### Environment Variables

Ensure these are set in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Client Usage Example

```typescript
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

// Insert contact form
const { data, error } = await supabase
  .from('contact_submissions')
  .insert({
    name: 'John Doe',
    email: 'john@example.com',
    service_interest: 'AI Consulting',
    message: 'Interested in learning more...'
  });
```

### Server Usage Example

```typescript
import { createClient } from '@/lib/supabase/server';

const supabase = await createClient();

// Fetch published blogs
const { data, error } = await supabase
  .from('blog_posts')
  .select('*')
  .eq('is_published', true)
  .order('published_at', { ascending: false });
```

---

## Future Enhancements

Consider adding these tables for expanded functionality:

### Case Studies
```sql
CREATE TABLE case_studies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  client_name TEXT NOT NULL,
  industry TEXT,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  results TEXT NOT NULL,
  metrics JSONB,
  featured_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Testimonials
```sql
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  company TEXT,
  role TEXT,
  content TEXT NOT NULL,
  avatar_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Backup & Maintenance

### Regular Backups
Supabase automatically backs up your database. Configure backup schedules in:
**Project Settings** → **Database** → **Backups**

### Monitoring
Monitor database performance:
- **Database** → **Query Performance**
- Set up alerts for high query times
- Review slow queries regularly

---

*Last Updated: 2025-01-12*
