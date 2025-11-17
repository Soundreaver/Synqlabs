"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Brain, Zap, ArrowRight, Sparkles } from "lucide-react";

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
  active: boolean;
}

const NeuralNetworkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize nodes
    const nodeCount = 80;
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: [],
        active: false,
      });
    }

    // Create connections (neural network-like structure)
    nodes.forEach((node, i) => {
      const connectionCount = Math.floor(Math.random() * 3) + 2;
      for (let j = 0; j < connectionCount; j++) {
        const targetId = Math.floor(Math.random() * nodes.length);
        if (targetId !== i && !node.connections.includes(targetId)) {
          node.connections.push(targetId);
        }
      }
    });

    nodesRef.current = nodes;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      nodes.forEach((node) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Mouse interaction
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        node.active = dist < 150;

        if (node.active) {
          // Attract to mouse
          node.x += dx * 0.01;
          node.y += dy * 0.01;
        }

        // Draw connections
        ctx.strokeStyle = node.active
          ? "rgba(251, 191, 36, 0.4)"
          : "rgba(251, 191, 36, 0.15)";
        ctx.lineWidth = node.active ? 2 : 1;

        node.connections.forEach((targetId) => {
          const target = nodes[targetId];
          if (!target) return;

          const distance = Math.sqrt(
            Math.pow(target.x - node.x, 2) + Math.pow(target.y - node.y, 2)
          );

          if (distance < 200) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();

            // Pulse effect on active connections
            if (node.active || target.active) {
              const pulse = Math.sin(Date.now() * 0.003) * 0.5 + 0.5;
              ctx.strokeStyle = `rgba(251, 191, 36, ${0.3 + pulse * 0.4})`;
              ctx.lineWidth = 2;
              ctx.stroke();
            }
          }
        });

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.active ? 4 : 2, 0, Math.PI * 2);
        ctx.fillStyle = node.active ? "#FBBF24" : "rgba(251, 191, 36, 0.6)";
        ctx.fill();

        // Glow effect for active nodes
        if (node.active) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#FBBF24";
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ opacity: 0.8 }}
    />
  );
};

const textOptions = ["SAINDLABS", "AI SOLUTIONS", "INNOVATION", "INTELLIGENCE"];

export default function HeroNeuralNetwork() {
  const [particleText, setParticleText] = useState("SAINDLABS");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % textOptions.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setParticleText(textOptions[currentIndex]);
  }, [currentIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Neural Network Background */}
      <NeuralNetworkCanvas />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-green/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
              },
            },
          }}
          className="text-center space-y-8"
        >
          {/* Badge */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-green/10 border border-brand-green/30 rounded-full backdrop-blur-sm group hover:bg-brand-green/15 transition-all duration-300"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Brain className="w-5 h-5 text-brand-green-light" />
            </motion.div>
            <span className="text-sm text-gray-300">
              Intelligent Systems Powering Enterprise Solutions
            </span>
          </motion.div>

          {/* Animated Text Particles */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
            className="relative"
          >
            <motion.h1
              key={particleText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-brand-green-light via-brand-green to-brand-green-dark bg-clip-text text-transparent font-serif"
              style={{
                textShadow: "0 0 80px rgba(251, 191, 36, 0.3)",
              }}
            >
              {particleText}
            </motion.h1>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-serif leading-tight max-w-4xl mx-auto"
          >
            Transforming Data into
            <br />
            <span className="bg-gradient-to-r from-brand-green-light to-brand-green-dark bg-clip-text text-transparent">
              Intelligent Decisions
            </span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-300 leading-relaxed"
          >
            Experience AI that thinks, learns, and evolves. We build custom
            neural networks and intelligent systems that drive real business
            transformation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="#contact">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(251, 191, 36, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-brand-green-dark via-brand-green to-brand-green-light text-black font-semibold rounded-lg overflow-hidden shadow-glow-lg"
              >
                <span className="relative z-10 flex items-center">
                  Experience Our AI
                  <Zap className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["-200%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 1,
                  }}
                />
              </motion.button>
            </Link>

            <Link href="/services">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(251, 191, 36, 1)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-transparent border-2 border-brand-green/50 text-brand-green-light font-semibold rounded-lg hover:bg-brand-green/10 transition-all"
              >
                <span className="flex items-center">
                  View Capabilities
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Live Stats */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { value: "500M+", label: "Data Points Processed", icon: "🔬" },
              { value: "99.2%", label: "Model Accuracy", icon: "🎯" },
              { value: "< 100ms", label: "Inference Time", icon: "⚡" },
              { value: "24/7", label: "AI Monitoring", icon: "🛡️" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative p-6 bg-gradient-to-br from-brand-green/5 to-transparent border border-brand-green/20 rounded-lg backdrop-blur-sm hover:border-brand-green/40 transition-all cursor-default"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-brand-green-light mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
                <div className="absolute inset-0 bg-gradient-to-br from-brand-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
              </motion.div>
            ))}
          </motion.div>

          {/* Interactive Indicator */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            className="pt-12"
          >
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-flex flex-col items-center gap-2 text-brand-green/60 hover:text-brand-green transition-colors cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-xs uppercase tracking-wider">
                Move your cursor to interact
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
    </section>
  );
}
