"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Sparkles, Terminal, CheckCircle2 } from "lucide-react";
import Beams from "@/components/shared/Beams";
import { fadeInUp } from "@/lib/animations";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import assistantBotAnimation from "@/../public/Assistant-Bot.json";

interface TerminalLine {
  id: number;
  text: string;
  type: "command" | "output" | "success" | "prompt";
  delay: number;
}

const terminalSequence: TerminalLine[] = [
  { id: 1, text: "$ initializing AI integration system...", type: "command", delay: 0 },
  { id: 2, text: "Loading custom SaaS architecture...", type: "output", delay: 800 },
  { id: 3, text: "✓ Enterprise AI framework initialized", type: "success", delay: 1600 },
  { id: 4, text: "$ configuring intelligent automation...", type: "command", delay: 2400 },
  { id: 5, text: "Optimizing business processes...", type: "output", delay: 3200 },
  { id: 6, text: "Process efficiency: 98.7%", type: "output", delay: 4000 },
  { id: 7, text: "✓ AI consultancy strategies deployed", type: "success", delay: 4800 },
  { id: 8, text: "$ integrating with enterprise systems...", type: "command", delay: 5600 },
  { id: 9, text: "Connecting to APIs... [PostgreSQL, Redis, AWS]", type: "output", delay: 6400 },
  { id: 10, text: "✓ All systems operational", type: "success", delay: 7200 },
  { id: 11, text: "$ saindlabs --ready", type: "command", delay: 8000 },
  { id: 12, text: "🚀 Custom AI Solutions Ready for Your Business", type: "success", delay: 8800 },
];

export default function HeroWithTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [showInteractive, setShowInteractive] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate terminal lines
    const timeouts: NodeJS.Timeout[] = [];

    terminalSequence.forEach((line) => {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, line]);
      }, line.delay);
      timeouts.push(timeout);
    });

    // Show interactive terminal after sequence
    const finalTimeout = setTimeout(() => {
      setIsTyping(false);
      setShowInteractive(true);
    }, 9500);
    timeouts.push(finalTimeout);

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom - only scroll within the terminal container, not the page
    if (terminalEndRef.current) {
      const terminalBody = terminalEndRef.current.parentElement;
      if (terminalBody) {
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    }
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const responses: Record<string, string> = {
      help: "Available commands: about, services, pricing, demo, contact",
      about: "SaindLabs: Elite AI consulting & custom SaaS development for enterprises",
      services: "AI Strategy | Custom ML Models | Process Automation | SaaS Development",
      pricing: "Custom pricing based on your needs. Let's schedule a consultation.",
      demo: "Redirecting to demo booking...",
      contact: "Email: hello@saindlabs.com | Let's build something amazing together",
    };

    const input = userInput.toLowerCase();
    const response = responses[input] || `Command '${userInput}' executed successfully. Try 'help' for available commands.`;

    setLines((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: `$ ${userInput}`,
        type: "command",
        delay: 0,
      },
      {
        id: Date.now() + 1,
        text: response,
        type: "output",
        delay: 0,
      },
    ]);

    setUserInput("");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Beams Background - EXACT SAME AS ORIGINAL HERO */}
      <div className="absolute inset-0 opacity-50">
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#5c5c5cff"
          speed={2}
          noiseIntensity={0}
          scale={0.2}
          rotation={30}
        />
      </div>

      {/* Gradient Overlay - EXACT SAME AS ORIGINAL HERO */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-80" />

      {/* Bottom Fade - EXACT SAME AS ORIGINAL HERO */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

      {/* Radial Gradient Accent - EXACT SAME AS ORIGINAL HERO */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-green/10 rounded-full blur-3xl" />
      </div>

      {/* Content - SPLIT INTO TWO COLUMNS */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT SIDE - EXACT ORIGINAL HERO TEXT */}
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
            className="space-y-8"
          >
            {/* Badge - EXACT SAME */}
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
                <Sparkles className="w-4 h-4 text-brand-green-light" />
              </motion.div>
              <span className="text-sm text-gray-300">
                Elegant AI Solutions for Modern Enterprises
              </span>
            </motion.div>

            {/* Main Headline - EXACT SAME */}
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

            {/* Second Line with Typewriter - EXACT SAME */}
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
                className="text-5xl sm:text-6xl lg:text-7xl font-bold font-serif justify-start"
                cursorClassName="bg-brand-green"
              />
            </motion.div>

            {/* Subheadline - EXACT SAME */}
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="max-w-3xl text-lg sm:text-xl text-gray-300 leading-relaxed"
            >
              Bespoke AI consulting and SaaS development for enterprises that
              demand excellence. Transform your vision into intelligent solutions.
            </motion.p>

            {/* CTA Buttons - EXACT SAME */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row items-start gap-4 pt-4"
            >
              <Link href="/services">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(251, 191, 36, 0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-brand-green-dark via-brand-green to-brand-green-light text-black font-semibold rounded-lg overflow-hidden shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-all"
                >
                  <span className="relative z-10 flex items-center">
                    Explore Services
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ["-200%", "200%"],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 1.5,
                    }}
                  />
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-brand-green-light via-brand-green to-brand-green-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </Link>

              <Link href="#contact">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(251, 191, 36, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-transparent border-2 border-brand-green text-brand-green-light font-semibold rounded-lg hover:bg-brand-green/10 transition-all overflow-hidden"
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
                  <motion.div
                    className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-transparent via-brand-green-light/50 to-transparent rounded-lg"
                    animate={{
                      x: ["-200%", "200%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 2,
                    }}
                  />
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust Indicators - EXACT SAME */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="pt-12 flex flex-wrap items-center gap-8 text-sm text-gray-400"
            >
              <div className="flex items-center space-x-2 group cursor-default">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-green-light rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative w-2 h-2 bg-gradient-to-br from-brand-green-light to-brand-green rounded-full animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.6)]" />
                </div>
                <span className="group-hover:text-gray-300 transition-colors">
                  Enterprise-Grade Security
                </span>
              </div>
              <div className="flex items-center space-x-2 group cursor-default">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-green-light rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative w-2 h-2 bg-gradient-to-br from-brand-green-light to-brand-green rounded-full animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.6)]" />
                </div>
                <span className="group-hover:text-gray-300 transition-colors">
                  Bespoke Solutions
                </span>
              </div>
              <div className="flex items-center space-x-2 group cursor-default">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-green-light rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative w-2 h-2 bg-gradient-to-br from-brand-green-light to-brand-green rounded-full animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.6)]" />
                </div>
                <span className="group-hover:text-gray-300 transition-colors">
                  24/7 Support
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - LOTTIE ANIMATION */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Lottie Animation - No Container */}
            <div className="relative h-[500px] flex items-center justify-center">
              <Lottie
                animationData={assistantBotAnimation}
                loop={true}
                className="w-full h-full"
              />
            </div>

            {/* COMMENTED OUT VIDEO IMPLEMENTATION */}
            {/* 
            <div className="relative h-[500px] rounded-lg overflow-hidden border border-brand-green/20 shadow-[0_0_40px_rgba(251,191,36,0.15)]">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/videos/6-Step Process Animation _ Clean & Structured Workflow Reveal.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green/10 via-transparent to-transparent pointer-events-none" />
            </div>
            */}

            {/* COMMENTED OUT TERMINAL IMPLEMENTATION */}
            {/* 
            <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-lg border border-brand-green/30 shadow-[0_0_50px_rgba(251,191,36,0.3)] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-800/90 border-b border-brand-green/20">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-brand-green" />
                  <span className="text-xs text-gray-400 font-mono">saindlabs-ai-terminal</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
              </div>

              <div className="p-6 font-mono text-sm h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-brand-green/30 scrollbar-track-transparent">
                <AnimatePresence>
                  {lines.map((line) => (
                    <motion.div
                      key={line.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`mb-2 ${
                        line.type === "command"
                          ? "text-brand-green-light"
                          : line.type === "success"
                          ? "text-green-400"
                          : "text-gray-300"
                      }`}
                    >
                      {line.type === "command" && (
                        <span className="text-brand-green mr-2">→</span>
                      )}
                      {line.type === "success" && line.text.startsWith("✓") && (
                        <CheckCircle2 className="inline w-4 h-4 mr-2 text-green-400" />
                      )}
                      {line.text}
                      {line.id === lines[lines.length - 1]?.id && isTyping && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="inline-block ml-1 w-2 h-4 bg-brand-green"
                        />
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {showInteractive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mt-6 pt-4 border-t border-gray-700"
                  >
                    <div className="text-brand-green-light mb-3 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Try it! Type 'help' for commands
                    </div>
                    <form onSubmit={handleSubmit} className="flex items-center">
                      <span className="text-brand-green mr-2">$</span>
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Enter command..."
                        className="flex-1 bg-transparent border-none outline-none text-gray-200 placeholder-gray-500"
                        autoFocus
                      />
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-2 h-4 bg-brand-green ml-1"
                      />
                    </form>
                  </motion.div>
                )}

                <div ref={terminalEndRef} />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-brand-green/5 via-transparent to-transparent pointer-events-none" />
            </div>
            */}

            {/* Decorative Elements - EXACT SAME */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-green/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-brand-green/10 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - EXACT SAME AS ORIGINAL HERO */}
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
