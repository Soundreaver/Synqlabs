"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import Beams from "@/components/shared/Beams";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Beams Background */}
      <div className="absolute inset-0 opacity-50">
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#5c5c5cff"
          // lightColor="#22c55e"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-80" />
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />

      {/* Radial Gradient Accent */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-green/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
              },
            },
          }}
          className="text-center space-y-8"
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-green/10 border border-brand-green/30 rounded-full backdrop-blur-sm group hover:bg-brand-green/15 transition-all duration-300"
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="w-4 h-4 text-brand-green-light drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            </motion.div>
            <span className="text-sm text-gray-300">
              Elegant AI Solutions for Modern Enterprises
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white font-serif leading-tight"
          >
            <TextGenerateEffect
              words="Elevate Your Business"
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white font-serif leading-tight inline-block"
              duration={0.6}
            />
          </motion.div>

          {/* Second Line with Typewriter */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white font-serif leading-tight"
          >
            <TypewriterEffectSmooth
              words={[
                { text: "with", className: "gradient-text" },
                { text: "Elegant", className: "gradient-text" },
                { text: "AI", className: "gradient-text" },
                { text: "Solutions", className: "gradient-text" },
              ]}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold font-serif justify-center"
              cursorClassName="bg-brand-green"
            />
          </motion.div>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-300 leading-relaxed"
          >
            Bespoke AI consulting and SaaS development for enterprises that
            demand excellence. Transform your vision into intelligent solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            {/* Primary CTA */}
            <Link href="/services">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(34, 197, 94, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-brand-green-dark via-brand-green to-brand-green-light text-white font-semibold rounded-lg overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all"
              >
                <span className="relative z-10 flex items-center">
                  Explore Services
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Animated Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatDelay: 1.5,
                  }}
                />
                {/* Pulsing Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-brand-green-light via-brand-green to-brand-green-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.button>
            </Link>

            {/* Secondary CTA */}
            <Link href="#contact">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(34, 197, 94, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-transparent border-2 border-brand-green text-white font-semibold rounded-lg hover:bg-brand-green/10 transition-all overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Schedule Consultation
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    →
                  </motion.span>
                </span>
                {/* Border Shimmer */}
                <motion.div
                  className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-transparent via-brand-green-light/50 to-transparent rounded-lg"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatDelay: 2,
                  }}
                />
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="pt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400"
          >
            <div className="flex items-center space-x-2 group cursor-default">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-green-light rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-2 h-2 bg-gradient-to-br from-brand-green-light to-brand-green rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
              </div>
              <span className="group-hover:text-gray-300 transition-colors">
                Enterprise-Grade Security
              </span>
            </div>
            <div className="flex items-center space-x-2 group cursor-default">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-green-light rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-2 h-2 bg-gradient-to-br from-brand-green-light to-brand-green rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
              </div>
              <span className="group-hover:text-gray-300 transition-colors">
                Bespoke Solutions
              </span>
            </div>
            <div className="flex items-center space-x-2 group cursor-default">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-green-light rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-2 h-2 bg-gradient-to-br from-brand-green-light to-brand-green rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
              </div>
              <span className="group-hover:text-gray-300 transition-colors">
                24/7 Support
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 left-0 right-0 z-20 flex items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="flex items-center justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2 text-gray-400 cursor-pointer hover:text-brand-green transition-colors"
          >
            <span className="text-xs uppercase tracking-wider">
              Scroll to explore
            </span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
