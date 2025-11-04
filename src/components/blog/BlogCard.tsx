"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative rounded-2xl overflow-hidden border border-[#2A1810]/20 hover:border-[#2A1810]/50 transition-all duration-300 bg-gradient-to-br from-[#2A1810]/5 to-transparent"
    >
      <Link href={`/blogs/${post.slug}`} className="block">
        {/* Featured Image */}
        {post.featured_image && (
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#2A1810]/20 to-black">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${post.featured_image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-[#2A1810]/20 text-xs font-medium text-[#FF6B35] border border-[#FF6B35]/30"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-2xl font-bold mb-3 group-hover:text-[#FF6B35] transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-400 leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            {post.published_at && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.published_at}>
                  {new Date(post.published_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
            )}
            {post.read_time_minutes && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.read_time_minutes} min read</span>
              </div>
            )}
          </div>

          {/* Author */}
          {post.author && (
            <div className="flex items-center justify-between pt-4 border-t border-[#2A1810]/20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B35]/30 to-[#FF6B35]/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-[#FF6B35]">
                    {post.author.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-gray-400">{post.author}</span>
              </div>
              
              <div className="flex items-center gap-1 text-[#FF6B35] font-medium text-sm group-hover:gap-2 transition-all duration-300">
                Read more
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
