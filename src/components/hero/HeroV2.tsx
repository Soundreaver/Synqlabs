"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Brain, Zap, Terminal, ChevronDown } from "lucide-react";
import NeuralNetwork from "./NeuralNetwork";
import LiveMetrics from "./LiveMetrics";
import { useEffect, useRef, useState } from "react";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";

export default function HeroV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);

  const words = [
    { text: "AI Journey", className: "gradient-text" },
  ];

  useEffect(() => {
    const lines = [
      "$ initializing AI deployment...",
      "$ connecting to automation framework...",
      "$ loading SaindLabs platform...",
      "✓ 247 projects delivered",
      "✓ 15,240+ hours saved",
      "✓ 99.8% client success rate",
      "$ ready to transform your business",
    ];

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setTerminalLines((prev) => [...prev, lines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 600);

    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-black"
    >
      {/* Neural Network Background */}
      <div className="absolute inset-0 opacity-30">
        <NeuralNetwork nodeCount={60} connectionDistance={180} />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-green-dark/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 flex-1 flex items-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Main Content */}
            <div className="space-y-8">
              {/* AI Badge */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-brand-green/20 to-brand-green-dark/20 border border-brand-green/40 rounded-full backdrop-blur-md group hover:border-brand-green transition-all duration-300"
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Brain className="w-5 h-5 text-brand-green" />
                </motion.div>
                <span className="text-sm font-semibold bg-gradient-to-r from-brand-green-light to-brand-green bg-clip-text text-transparent">
                  AI-Powered Enterprise Solutions
                </span>
                <Zap className="w-4 h-4 text-brand-green-light animate-pulse" />
              </motion.div>

              {/* Main Headline - Not Centered! */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4"
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif leading-tight">
                  <span className="block text-white mb-2">Your</span>
                  <TypewriterEffectSmooth
                    words={words}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif"
                    cursorClassName="bg-brand-green"
                  />
                  <span className="block text-white mt-2">Starts Here</span>
                </h1>
                <div className="h-1 w-32 bg-gradient-to-r from-brand-green to-transparent rounded-full" />
              </motion.div>

              {/* Subheader */}
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-300 leading-relaxed max-w-xl"
              >
                Don't just adopt AI—master it. We build bespoke AI solutions
                that prove ROI, not promises. Your competitors are still
                talking. We're deploying.
              </motion.p>

              {/* Live Processing Indicator */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center gap-3 text-sm text-gray-400"
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-3 h-3 bg-brand-green rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <span className="text-brand-green-light font-medium">
                    AI Systems Active
                  </span>
                </div>
                <span className="text-gray-600">|</span>
                <span>Real-time deployment ready</span>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link href="/services">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-gradient-to-r from-brand-green-dark via-brand-green to-brand-green-light text-black font-bold rounded-lg overflow-hidden shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-all"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Deploy Your AI Solution
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ["-200%", "200%"] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                  </motion.button>
                </Link>

                <Link href="#demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-8 py-4 bg-transparent border-2 border-brand-green text-brand-green-light font-bold rounded-lg hover:bg-brand-green/10 transition-all relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Terminal className="w-5 h-5" />
                      See Live Demo
                    </span>
                  </motion.button>
                </Link>
              </motion.div>

              {/* Trust Pills */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                {[
                  "SOC 2 Certified",
                  "Enterprise Grade",
                  "24/7 Support",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 bg-black/50 border border-brand-green/30 rounded-full text-sm text-gray-300 backdrop-blur-sm hover:border-brand-green/60 transition-colors"
                  >
                    {item}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Side - Terminal Interface */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <div className="relative bg-black/80 border border-brand-green/30 rounded-lg overflow-hidden backdrop-blur-xl shadow-[0_0_50px_rgba(251,191,36,0.2)]">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-brand-green/10 border-b border-brand-green/30">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs text-gray-400 ml-2">
                    SaindLabs AI Terminal
                  </span>
                </div>

                {/* Terminal Content */}
                <div className="p-6 font-mono text-sm space-y-2 min-h-[400px]">
                  {terminalLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`${
                        line?.startsWith("✓")
                          ? "text-brand-green"
                          : "text-gray-300"
                      }`}
                    >
                      {line}
                    </motion.div>
                  ))}
                  {terminalLines.length < 7 && (
                    <motion.span
                      className="inline-block w-2 h-4 bg-brand-green ml-1"
                      animate={{
                        opacity: cursorVisible ? 1 : 0,
                      }}
                    />
                  )}
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green/5 to-transparent pointer-events-none" />
              </div>

            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
