import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2, Linkedin, Twitter, Tag } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { BlogPost } from "@/types";
import BlogContent from "@/components/blog/BlogContent";
import BlogCard from "@/components/blog/BlogCard";
import GradientText from "@/components/shared/GradientText";

interface PageProps {
  params: { slug: string };
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

async function getRelatedPosts(currentPostId: string, tags: string[]): Promise<BlogPost[]> {
  const supabase = await createClient();
  
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .neq("id", currentPostId)
    .limit(3);

  return data || [];
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.id, post.tags || []);
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ""}/blogs/${post.slug}`;

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#152514]/20 via-black to-black" />
        
        {/* Featured Image Background */}
        {post.featured_image && (
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${post.featured_image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
          </div>
        )}

        <div className="container mx-auto px-4 relative z-10">
          {/* Back Button */}
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#152514] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to all articles
          </Link>

          <div className="max-w-4xl mx-auto">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-[#152514]/20 text-sm font-medium text-[#152514] border border-[#152514]/30"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                {post.excerpt}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-500 pb-8 border-b border-[#152514]/20">
              {post.author && (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#152514]/30 to-[#152514]/10 flex items-center justify-center">
                    <span className="text-lg font-semibold text-[#152514]">
                      {post.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-medium">{post.author}</div>
                    {post.author_bio && (
                      <div className="text-sm text-gray-500">{post.author_bio}</div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-4">
                {post.published_at && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.published_at}>
                      {new Date(post.published_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                )}
                {post.read_time_minutes && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.read_time_minutes} min read</span>
                  </div>
                )}
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-4 mt-8">
              <span className="text-sm text-gray-500">Share:</span>
              <div className="flex gap-2">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#152514]/20 hover:bg-[#152514] border border-[#152514]/30 flex items-center justify-center transition-all duration-300"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#152514]/20 hover:bg-[#152514] border border-[#152514]/30 flex items-center justify-center transition-all duration-300"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <BlogContent content={post.content} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-[#152514]/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-[#152514]/20 via-black to-[#152514]/10 border border-[#152514]/30 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#152514,transparent)] opacity-20" />
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to <GradientText>Implement These Concepts?</GradientText>
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Let SynQ Labs help you turn insights into action. We specialize in
                  bringing cutting-edge AI and software solutions to life.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-[#152514] text-white font-semibold hover:bg-[#1a2e1a] transition-all duration-300 hover:scale-105"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-black to-[#0a0a0a]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Related <GradientText>Articles</GradientText>
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} index={index} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
