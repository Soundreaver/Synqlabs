# Blog Automation Guide for SynQ Labs

## Overview

This guide explains how to automate blog publishing for SynQ Labs using AI-generated content, the Blog API, and efficient workflows.

---

## Automation Workflow

```
1. Generate Content (AI) 
   ↓
2. Review & Edit
   ↓
3. Optimize for SEO
   ↓
4. Publish via API
   ↓
5. (Future) Share on Social Media
```

---

## Prerequisites

### Required Setup

1. **Environment Variables**
   ```bash
   # In .env.local
   BLOG_API_KEY=your_secure_api_key_here
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

2. **Supabase Database**
   - Ensure `blog_posts` table exists (see `docs/supabase-schema.md`)
   - RLS policies configured correctly

3. **API Access**
   - OpenAI API key (for content generation)
   - or Anthropic API key (Claude)

---

## Step 1: Generate Blog Content with AI

### Using Claude (Recommended)

Create a prompt template:

```
You are a technical content writer for SynQ Labs, a luxury AI consulting 
and SaaS development firm. Write a blog post about [TOPIC].

Brand Voice Guidelines:
- Professional, confident, sophisticated
- Technical depth with business value
- Thought leadership position
- Words to use: bespoke, craft, excellence, transform, intelligent
- Avoid: cheap, quick fix, template, basic, hack

Structure:
- Compelling headline (6-10 words)
- Engaging introduction (hook + why it matters)
- 3-4 main sections with H2 headings
- Concrete examples and actionable insights
- Conclusion with key takeaways
- Target length: 1200-1800 words

Format as markdown with:
- H1 for title
- H2 for main sections
- H3 for subsections
- Code blocks where appropriate
- Bullet points for lists

Topic: [YOUR TOPIC HERE]
Target Audience: [Enterprise CTOs, Tech Leads, etc.]
Keywords to include: [keyword1, keyword2, keyword3]
```

### Using GPT-4

Similar prompt structure, but emphasize:
- Technical accuracy
- Business context
- SynQ Labs brand voice (see `docs/content-guidelines.md`)

### Content Quality Checklist

Before proceeding, ensure AI-generated content:
- [ ] Aligns with brand voice
- [ ] Provides actionable value
- [ ] Includes specific examples
- [ ] Has proper structure (H1, H2, H3)
- [ ] Is 1200+ words
- [ ] Contains no factual errors
- [ ] Reads naturally (not obviously AI)

---

## Step 2: Review & Edit Content

### Manual Review Process

1. **Fact-Check**
   - Verify all technical claims
   - Check for outdated information
   - Validate code examples

2. **Brand Alignment**
   - Review against content guidelines
   - Ensure tone matches SynQ Labs voice
   - Check for prohibited words/phrases

3. **Readability**
   - Read aloud for flow
   - Simplify overly complex sentences
   - Add transitions between sections

4. **Add Personal Touch**
   - Include real examples from projects (anonymized)
   - Add unique insights from team experience
   - Inject personality where appropriate

### SEO Optimization

1. **Title Optimization**
   - Include primary keyword
   - Keep under 60 characters
   - Make it compelling and click-worthy
   
2. **Meta Description**
   - 150-160 characters
   - Include primary and secondary keywords
   - Clear value proposition
   
3. **Slug Creation**
   - Lowercase only
   - Hyphens for spaces
   - Include primary keyword
   - Keep concise
   - Example: `ai-strategy-enterprise-guide`

4. **Keyword Integration**
   - Primary keyword in first paragraph
   - Secondary keywords in H2 headings
   - Natural placement (avoid keyword stuffing)
   - Use variations and synonyms

5. **Internal Linking**
   - Link to relevant service pages
   - Reference other blog posts
   - Use descriptive anchor text

---

## Step 3: Prepare Blog Post Data

### Required Fields

```typescript
{
  title: string;           // SEO-optimized title
  slug: string;            // URL-friendly slug
  excerpt: string;         // 150 chars max, compelling summary
  content: string;         // Full markdown content
  author: string;          // Default: "SynQ Labs"
  author_bio?: string;     // Optional author description
  featured_image?: string; // URL to header image
  tags: string[];          // 3-5 relevant tags
  is_published: boolean;   // true to publish immediately
  published_at?: string;   // ISO timestamp, defaults to now
  seo_title?: string;      // Optional, defaults to title
  seo_description?: string;// Optional, defaults to excerpt
}
```

### Example Post Data

```json
{
  "title": "Strategic AI Implementation: A Guide for Enterprise CTOs",
  "slug": "strategic-ai-implementation-enterprise-ctos",
  "excerpt": "Discover how forward-thinking enterprises are implementing AI strategically, avoiding common pitfalls, and achieving measurable ROI.",
  "content": "# Strategic AI Implementation...\n\n## Introduction\n\n...",
  "author": "SynQ Labs",
  "tags": ["AI Strategy", "Enterprise", "Technology Leadership"],
  "featured_image": "https://images.unsplash.com/photo-...",
  "is_published": true
}
```

---

## Step 4: Publish via API

### Method 1: Using cURL

```bash
curl -X POST https://yourdomain.com/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "title": "Your Blog Title",
    "slug": "your-blog-slug",
    "excerpt": "Compelling excerpt...",
    "content": "# Full markdown content...",
    "tags": ["AI", "Technology"],
    "is_published": true
  }'
```

### Method 2: Using Node.js Script

Create `scripts/publish-blog.js`:

```javascript
const fs = require('fs');
const path = require('path');

async function publishBlog(filePath) {
  // Read markdown file
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extract frontmatter and content
  // (implement frontmatter parsing)
  
  // Prepare blog post data
  const blogPost = {
    title: extractedTitle,
    slug: generateSlug(extractedTitle),
    excerpt: extractedExcerpt,
    content: content,
    tags: extractedTags,
    is_published: true
  };
  
  // Send to API
  const response = await fetch('http://localhost:3000/api/blogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.BLOG_API_KEY}`
    },
    body: JSON.stringify(blogPost)
  });
  
  const result = await response.json();
  console.log('Published:', result);
}

// Usage: node scripts/publish-blog.js path/to/post.md
publishBlog(process.argv[2]);
```

### Method 3: Using Python Script

Create `scripts/publish_blog.py`:

```python
import requests
import os
import json
from datetime import datetime

def publish_blog(blog_data):
    url = "https://yourdomain.com/api/blogs"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.getenv('BLOG_API_KEY')}"
    }
    
    response = requests.post(url, headers=headers, json=blog_data)
    return response.json()

# Example usage
blog_post = {
    "title": "Your Title",
    "slug": "your-slug",
    "excerpt": "Excerpt...",
    "content": "# Content...",
    "tags": ["AI", "Technology"],
    "is_published": True
}

result = publish_blog(blog_post)
print(f"Published: {result}")
```

---

## Step 5: Automation Scripts

### Weekly Blog Generation Script

Create `scripts/weekly-blog.sh`:

```bash
#!/bin/bash

# Generate blog post with AI
echo "Generating blog post..."
python scripts/ai_generate_blog.py \
  --topic "Weekly AI trends" \
  --keywords "AI,Enterprise,Innovation" \
  --output blog-draft.md

# Review prompt
echo "Review the generated content in blog-draft.md"
echo "Edit as needed, then press Enter to publish..."
read

# Publish to API
node scripts/publish-blog.js blog-draft.md

echo "Blog published successfully!"
```

### Scheduled Publishing with Cron

```bash
# Add to crontab (every Monday at 9 AM)
0 9 * * 1 /path/to/synqlabs/scripts/weekly-blog.sh
```

---

## Best Practices

### Content Strategy

1. **Publishing Frequency**
   - Aim for 1-2 posts per week
   - Consistency over quantity
   - Build content calendar

2. **Topic Selection**
   - Industry trends and analysis
   - Technical deep-dives
   - Case study insights
   - How-to guides
   - Thought leadership pieces

3. **Keyword Research**
   - Use tools: Ahrefs, SEMrush, Google Trends
   - Focus on long-tail keywords
   - Monitor competitor content
   - Track keyword rankings

### Image Optimization

1. **Featured Images**
   - Recommended size: 1200x630px
   - Format: WebP or JPEG
   - Compress before uploading
   - Use Unsplash for free stock photos
   - Add proper alt text

2. **In-Content Images**
   - Use diagrams for complex concepts
   - Screenshots for tutorials
   - Charts for data visualization
   - Optimize all images < 200KB

### Quality Control

1. **Pre-Publish Checklist**
   - [ ] Fact-checked all claims
   - [ ] Proofread for errors
   - [ ] SEO optimized (title, description, keywords)
   - [ ] Internal links added
   - [ ] Featured image set
   - [ ] Tags appropriate
   - [ ] Reads well on mobile
   - [ ] Code examples tested

2. **Post-Publish Tasks**
   - Share on LinkedIn
   - Share on Twitter
   - Email newsletter (if applicable)
   - Monitor analytics
   - Respond to comments

---

## Monitoring & Analytics

### Key Metrics to Track

1. **Traffic**
   - Page views
   - Unique visitors
   - Time on page
   - Bounce rate

2. **Engagement**
   - Comments
   - Social shares
   - Backlinks
   - Return visitors

3. **SEO Performance**
   - Keyword rankings
   - Organic traffic growth
   - Click-through rate (CTR)
   - Domain authority

### Tools

- **Google Analytics** - Traffic and behavior
- **Google Search Console** - SEO performance
- **Plausible/Fathom** - Privacy-friendly analytics
- **Ahrefs** - Backlinks and keyword tracking

---

## Troubleshooting

### Common Issues

**Problem:** API returns 401 Unauthorized
- **Solution:** Check `BLOG_API_KEY` in environment variables
- Ensure header format: `Authorization: Bearer YOUR_KEY`

**Problem:** Duplicate slug error
- **Solution:** Slugs must be unique. Append date or number
- Example: `ai-strategy-2025-01`

**Problem:** Content not appearing
- **Solution:** Check `is_published` is `true`
- Verify `published_at` is not in future
- Check Supabase RLS policies

**Problem:** Images not loading
- **Solution:** Ensure image URLs are publicly accessible
- Use absolute URLs, not relative paths
- Check CORS if hosting images separately

---

## Future Enhancements

### Planned Features

1. **Social Media Auto-Posting**
   - Auto-share to LinkedIn
   - Twitter thread generation
   - Facebook business page

2. **Email Integration**
   - Notify subscribers of new posts
   - Weekly digest compilation
   - Personalized recommendations

3. **Advanced Analytics**
   - Reading progress tracking
   - Heatmaps
   - A/B testing headlines

4. **Content Suggestions**
   - AI-powered topic recommendations
   - Trending keyword alerts
   - Competitor analysis

---

## Resources

- [Content Guidelines](./content-guidelines.md)
- [Supabase Schema](./supabase-schema.md)
- [Blog API Documentation](../src/app/api/blogs/route.ts)
- [Markdown Guide](https://www.markdownguide.org/)

---

*Last Updated: 2025-01-12*  
*Version: 1.0*
