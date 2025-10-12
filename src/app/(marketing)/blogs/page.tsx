"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import GradientText from "@/components/shared/GradientText";
import BlogCard from "@/components/blog/BlogCard";
import { BlogPost } from "@/types";
import { createClient } from "@/lib/supabase/client";

export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchQuery, selectedTag]);

  const fetchBlogPosts = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (error) {
        console.error("Error fetching blog posts:", error);
        setLoading(false);
        return;
      }

      setPosts(data || []);
      
      // Extract all unique tags
      const tags = new Set<string>();
      data?.forEach((post) => {
        post.tags?.forEach((tag: string) => tags.add(tag));
      });
      setAllTags(Array.from(tags).sort());
      
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = [...posts];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt?.toLowerCase().includes(query) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by selected tag
    if (selectedTag) {
      filtered = filtered.filter((post) =>
        post.tags?.includes(selectedTag)
      );
    }

    setFilteredPosts(filtered);
  };

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#152514]/20 via-black to-black" />
        
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#152514_1px,transparent_1px),linear-gradient(to_bottom,#152514_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <GradientText>Insights & Innovation</GradientText>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
              Exploring the frontier of AI, technology, and software engineering
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 border-b border-[#152514]/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search articles by title, content, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#0a0a0a] border border-[#152514]/20 text-white placeholder-gray-500 focus:border-[#152514] focus:outline-none transition-colors"
              />
            </div>

            {/* Tags Filter */}
            {allTags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-4 h-4 text-gray-500" />
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedTag === null
                      ? "bg-[#152514] text-white"
                      : "bg-[#152514]/10 text-gray-400 hover:bg-[#152514]/20"
                  }`}
                >
                  All
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedTag === tag
                        ? "bg-[#152514] text-white"
                        : "bg-[#152514]/10 text-gray-400 hover:bg-[#152514]/20"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              // Loading Skeleton
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-[#152514]/20 overflow-hidden animate-pulse"
                  >
                    <div className="h-48 bg-[#152514]/10" />
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-[#152514]/10 rounded w-2/3" />
                      <div className="h-8 bg-[#152514]/10 rounded" />
                      <div className="space-y-2">
                        <div className="h-3 bg-[#152514]/10 rounded" />
                        <div className="h-3 bg-[#152514]/10 rounded w-5/6" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              // Blog Posts
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>
            ) : (
              // Empty State
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-24"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#152514]/30 to-[#152514]/10 flex items-center justify-center">
                  <Search className="w-10 h-10 text-[#152514]" />
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  {searchQuery || selectedTag
                    ? "No articles found"
                    : "More insights coming soon"}
                </h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  {searchQuery || selectedTag
                    ? "Try adjusting your search or filter criteria"
                    : "We're crafting thoughtful content about AI, software engineering, and technology. Check back soon for new articles."}
                </p>
                {(searchQuery || selectedTag) && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedTag(null);
                    }}
                    className="mt-6 px-6 py-3 rounded-full bg-[#152514] text-white font-semibold hover:bg-[#1a2e1a] transition-all duration-300"
                  >
                    Clear Filters
                  </button>
                )}
              </motion.div>
            )}

            {/* Results Count */}
            {!loading && filteredPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 text-center text-gray-500"
              >
                Showing {filteredPosts.length} of {posts.length} article
                {posts.length !== 1 ? "s" : ""}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
