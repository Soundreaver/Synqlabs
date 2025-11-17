"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Compare } from "@/components/ui/compare";

export default function HeroCompare() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-green/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-green/10 border border-brand-green/30 rounded-full backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-brand-green" />
              <span className="text-sm text-brand-green-light">
                See The Transformation
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif">
              Transform Your Business with
              <br />
              <span className="bg-gradient-to-r from-brand-green-light to-brand-green-dark bg-clip-text text-transparent">
                AI-Powered Intelligence
              </span>
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hover over the comparison to see the dramatic difference our AI consultancy
              and custom SaaS solutions make for enterprises.
            </p>
          </motion.div>

          {/* Compare Component */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="p-4 border rounded-3xl bg-gray-900/50 border-brand-green/20 backdrop-blur-sm">
              <Compare
                firstImage="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop"
                secondImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                firstImageClassName="object-cover object-center"
                secondImageClassname="object-cover object-center"
                className="h-[300px] w-[300px] md:h-[600px] md:w-[800px]"
                slideMode="hover"
              />
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-8"
          >
            {/* Before */}
            <div className="p-6 rounded-xl border border-red-500/30 bg-red-950/20 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-red-300 mb-4">
                Before SaindLabs
              </h3>
              <ul className="space-y-3 text-left text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>Hours wasted on repetitive tasks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>Costly manual processes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>Slow decision-making</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>Limited scalability</span>
                </li>
              </ul>
            </div>

            {/* After */}
            <div className="p-6 rounded-xl border border-brand-green/30 bg-brand-green/5 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-brand-green-light mb-4">
                With SaindLabs AI
              </h3>
              <ul className="space-y-3 text-left text-gray-200">
                <li className="flex items-start">
                  <span className="text-brand-green mr-2">✓</span>
                  <span>90% time saved through automation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-green mr-2">✓</span>
                  <span>99.7% accuracy in operations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-green mr-2">✓</span>
                  <span>Real-time insights & analytics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-green mr-2">✓</span>
                  <span>Infinite scalability built-in</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <Link href="#contact">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(251, 191, 36, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-brand-green-dark via-brand-green to-brand-green-light text-black font-semibold rounded-lg overflow-hidden shadow-glow-lg"
              >
                <span className="flex items-center">
                  Start Your Transformation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </span>
              </motion.button>
            </Link>

            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-brand-green text-brand-green-light font-semibold rounded-lg hover:bg-brand-green/10 transition-all"
              >
                See How It Works
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
    </section>
  );
}
