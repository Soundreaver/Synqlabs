import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

/**
 * BLOG API AUTOMATION WORKFLOW
 * 
 * This API supports automated blog publishing for SynQ Labs.
 * 
 * WORKFLOW:
 * 1. Generate blog content using AI (Claude/GPT-4)
 * 2. Review and edit content for quality and accuracy
 * 3. POST to this API with API key authentication
 * 4. Content is validated, processed, and stored in Supabase
 * 5. Auto-publish with proper formatting and SEO optimization
 * 6. (Future) Auto-generate social media snippets
 * 
 * AUTHENTICATION:
 * - POST requests require API key in Authorization header
 * - Format: "Bearer YOUR_API_KEY"
 * - Set BLOG_API_KEY in environment variables
 * 
 * EXAMPLE POST REQUEST:
 * ```
 * fetch('/api/blogs', {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json',
 *     'Authorization': 'Bearer YOUR_API_KEY'
 *   },
 *   body: JSON.stringify({
 *     title: 'My Blog Post',
 *     slug: 'my-blog-post',
 *     excerpt: 'A brief description...',
 *     content: 'Full markdown content...',
 *     author: 'John Doe',
 *     tags: ['AI', 'Technology'],
 *     featured_image: 'https://...',
 *     is_published: true
 *   })
 * })
 * ```
 */

// Validation schemas
const blogPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200),
  slug: z.string().min(3, "Slug must be at least 3 characters").max(200).regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters").max(500),
  content: z.string().min(100, "Content must be at least 100 characters"),
  author: z.string().min(2).max(100).optional(),
  author_bio: z.string().max(500).optional(),
  featured_image: z.string().url().optional(),
  tags: z.array(z.string()).min(1, "At least one tag is required").max(10),
  is_published: z.boolean().default(false),
  published_at: z.string().datetime().optional(),
  seo_title: z.string().max(60).optional(),
  seo_description: z.string().max(160).optional(),
});

// Calculate read time based on content length
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Authentication middleware
function authenticateRequest(request: Request): boolean {
  const authHeader = request.headers.get("Authorization");
  const apiKey = process.env.BLOG_API_KEY;

  if (!apiKey) {
    console.warn("BLOG_API_KEY not set in environment variables");
    return false;
  }

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }

  const token = authHeader.substring(7);
  return token === apiKey;
}

// GET: Fetch blog posts with pagination and filtering
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const tag = searchParams.get("tag");
    const search = searchParams.get("search");
    const published = searchParams.get("published") !== "false"; // Default to true

    const supabase = await createClient();
    
    // Build query
    let query = supabase
      .from("blog_posts")
      .select("*", { count: "exact" })
      .order("published_at", { ascending: false });

    // Apply filters
    if (published) {
      query = query.eq("is_published", true);
    }

    if (tag) {
      query = query.contains("tags", [tag]);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
    }

    // Apply pagination
    const start = (page - 1) * limit;
    query = query.range(start, start + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch blog posts",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error("Blog API GET error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

// POST: Create new blog post (requires authentication)
export async function POST(request: Request) {
  try {
    // Authenticate request
    if (!authenticateRequest(request)) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Valid API key required.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate input data
    const validationResult = blogPostSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Calculate read time
    const readTime = calculateReadTime(data.content);

    // Prepare blog post data
    const blogPost = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      author: data.author || "SynQ Labs",
      author_bio: data.author_bio || null,
      featured_image: data.featured_image || null,
      tags: data.tags,
      is_published: data.is_published,
      published_at: data.published_at || (data.is_published ? new Date().toISOString() : null),
      read_time_minutes: readTime,
      seo_title: data.seo_title || data.title.substring(0, 60),
      seo_description: data.seo_description || data.excerpt.substring(0, 160),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Insert into Supabase
    const supabase = await createClient();
    
    const { data: insertedData, error } = await supabase
      .from("blog_posts")
      .insert(blogPost)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      
      // Check for duplicate slug
      if (error.code === "23505") {
        return NextResponse.json(
          {
            success: false,
            message: "A blog post with this slug already exists",
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: "Failed to create blog post",
        },
        { status: 500 }
      );
    }

    // TODO: Future enhancements
    // - Generate and upload optimized featured image
    // - Generate social media snippets (Twitter, LinkedIn)
    // - Send notification to team
    // - Trigger sitemap regeneration

    return NextResponse.json({
      success: true,
      message: "Blog post created successfully",
      data: insertedData,
    });
  } catch (error) {
    console.error("Blog API POST error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

// PUT: Update existing blog post (requires authentication)
export async function PUT(request: Request) {
  try {
    // Authenticate request
    if (!authenticateRequest(request)) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Valid API key required.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog post ID is required",
        },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    
    // Calculate read time if content changed
    if (updateData.content) {
      updateData.read_time_minutes = calculateReadTime(updateData.content);
    }

    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("blog_posts")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update blog post",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog post updated successfully",
      data,
    });
  } catch (error) {
    console.error("Blog API PUT error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
