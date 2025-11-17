"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Terminal, Play, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import Beams from "@/components/shared/Beams";

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


export default function HeroTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [showInteractive, setShowInteractive] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
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
      {/* Beams Background */}
      <div className="absolute inset-0 opacity-50">
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          // lightColor="#FBBF24"
          lightColor="#ffffffff"
          speed={2}
          noiseIntensity={0}
          scale={0.2}
          rotation={30}
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-90" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-green/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Headline */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-green/10 border border-brand-green/30 rounded-full backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-brand-green" />
              <span className="text-sm text-gray-300">AI-Powered Enterprise Solutions</span>
            </motion.div>

            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-white font-serif leading-tight">
                Deploying{" "}
                <span className="bg-gradient-to-r from-brand-green-light via-brand-green to-brand-green-dark bg-clip-text text-transparent">
                  Intelligence
                </span>
              </h1>
              <h2 className="text-4xl lg:text-6xl font-bold text-white font-serif leading-tight">
                at Enterprise Scale
              </h2>
            </div>

            <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
              Watch us build, deploy, and scale AI solutions in real-time. 
              Custom ML pipelines, intelligent automation, and enterprise SaaS—built with precision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="#contact">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(251, 191, 36, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-brand-green-dark via-brand-green to-brand-green-light text-black font-semibold rounded-lg overflow-hidden shadow-glow-lg"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start Your Project
                    <Play className="ml-2 w-5 h-5" />
                  </span>
                </motion.button>
              </Link>

              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-brand-green text-brand-green-light font-semibold rounded-lg hover:bg-brand-green/10 transition-all"
                >
                  Explore Capabilities
                </motion.button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-800">
              {[
                { value: "98.7%", label: "Accuracy" },
                { value: "< 2s", label: "Response Time" },
                { value: "24/7", label: "Uptime" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-brand-green-light">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Terminal Window */}
            <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-lg border border-brand-green/30 shadow-[0_0_50px_rgba(251,191,36,0.3)] overflow-hidden">
              {/* Terminal Header */}
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

              {/* Terminal Body */}
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

                {/* Interactive Prompt */}
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

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green/5 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-green/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-brand-green/10 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
    </section>
  );
}
