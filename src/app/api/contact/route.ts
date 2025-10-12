import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  company: z.string().max(100).optional(),
  service_interest: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

// Simple rate limiting check (in production, use Redis or similar)
const recentSubmissions = new Map<string, number>();

function checkRateLimit(email: string): boolean {
  const now = Date.now();
  const lastSubmission = recentSubmissions.get(email);
  
  // Allow one submission per email every 5 minutes
  if (lastSubmission && now - lastSubmission < 5 * 60 * 1000) {
    return false;
  }
  
  recentSubmissions.set(email, now);
  
  // Clean up old entries (older than 1 hour)
  for (const [key, timestamp] of recentSubmissions.entries()) {
    if (now - timestamp > 60 * 60 * 1000) {
      recentSubmissions.delete(key);
    }
  }
  
  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input data
    const validationResult = contactSchema.safeParse(body);
    
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

    // Check rate limiting
    if (!checkRateLimit(data.email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please wait a few minutes before submitting again",
        },
        { status: 429 }
      );
    }

    // Insert into Supabase
    const supabase = await createClient();
    
    const { error } = await supabase.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      company: data.company || null,
      service_interest: data.service_interest,
      message: data.message,
      status: "new",
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to submit contact form. Please try again.",
        },
        { status: 500 }
      );
    }

    // TODO: Optional - Send notification email using Resend/SendGrid
    // await sendNotificationEmail(data);

    return NextResponse.json({
      success: true,
      message: "Thank you for contacting us. We'll be in touch within 24 hours.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
