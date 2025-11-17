"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, GripVertical, Sparkles, AlertTriangle, CheckCircle } from "lucide-react";

export default function HeroSplitScreen() {
  const [isDragging, setIsDragging] = useState(false);
  const dividerPosition = useMotionValue(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    if (!containerRef.current) return;
    
    const containerWidth = containerRef.current.offsetWidth;
    const newPosition = (info.point.x / containerWidth) * 100;
    
    // Constrain between 20% and 80%
    const constrainedPosition = Math.max(20, Math.min(80, newPosition));
    dividerPosition.set(constrainedPosition);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Split Screen Container */}
      <div className="absolute inset-0 flex">
        {/* Left Side - "Before AI" */}
        <motion.div
          style={{
            width: useTransform(dividerPosition, (pos) => `${pos}%`),
          }}
          className="relative overflow-hidden"
        >
          {/* Chaotic Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-gray-900 to-black">
            {/* Animated chaos particles */}
            <div className="absolute inset-0 opacity-30">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-red-500/50 rounded-full"
                  initial={{
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                  }}
                  animate={{
                    x: [
                      Math.random() * 100 + "%",
                      Math.random() * 100 + "%",
                      Math.random() * 100 + "%",
                    ],
                    y: [
                      Math.random() * 100 + "%",
                      Math.random() * 100 + "%",
                      Math.random() * 100 + "%",
                    ],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6 max-w-lg"
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-900/30 border border-red-500/50 rounded-full backdrop-blur-sm">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-sm text-red-300">Without AI</span>
              </div>

              <h3 className="text-4xl md:text-5xl font-bold text-red-100 font-serif">
                Manual Chaos
              </h3>

              <ul className="space-y-3 text-left">
                {[
                  "❌ Hours wasted on repetitive tasks",
                  "❌ Human errors costing thousands",
                  "❌ Slow decision-making processes",
                  "❌ Inability to scale operations",
                  "❌ Data buried in spreadsheets",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="text-gray-300 flex items-start"
                  >
                    <span className="text-red-400 mr-2">{item.split(" ")[0]}</span>
                    <span>{item.substring(2)}</span>
                  </motion.li>
                ))}
              </ul>

              <p className="text-gray-400 italic">
                "We're drowning in data but starving for insights..."
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - "After AI" */}
        <motion.div
          style={{
            width: useTransform(dividerPosition, (pos) => `${100 - pos}%`),
          }}
          className="relative overflow-hidden"
        >
          {/* Streamlined Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-brand-green-dark/20">
            {/* Organized particles */}
            <div className="absolute inset-0 opacity-40">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-brand-green rounded-full"
                  style={{
                    left: `${(i % 6) * 16}%`,
                    top: `${Math.floor(i / 6) * 16}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6 max-w-lg"
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-green/10 border border-brand-green/50 rounded-full backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-brand-green" />
                <span className="text-sm text-brand-green-light">With SaindLabs AI</span>
              </div>

              <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-green-light to-brand-green-dark bg-clip-text text-transparent font-serif">
                Intelligent Automation
              </h3>

              <ul className="space-y-3 text-left">
                {[
                  "✓ 90% time saved on routine tasks",
                  "✓ 99.7% accuracy in predictions",
                  "✓ Real-time insights & analytics",
                  "✓ Infinite scalability built-in",
                  "✓ AI-powered decision engine",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="text-gray-200 flex items-start"
                  >
                    <CheckCircle className="w-5 h-5 text-brand-green mr-2 flex-shrink-0" />
                    <span>{item.substring(2)}</span>
                  </motion.li>
                ))}
              </ul>

              <p className="text-brand-green-light italic">
                "Our AI transformed our business overnight."
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Draggable Divider */}
      <motion.div
        drag="x"
        dragConstraints={containerRef}
        dragElastic={0}
        dragMomentum={false}
        onDrag={handleDrag}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        style={{
          left: useTransform(dividerPosition, (pos) => `${pos}%`),
        }}
        className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-brand-green-light via-brand-green to-brand-green-dark cursor-ew-resize z-20 -ml-0.5"
      >
        {/* Draggable Handle */}
        <motion.div
          animate={{
            scale: isDragging ? 1.2 : 1,
            boxShadow: isDragging
              ? "0 0 30px rgba(251, 191, 36, 0.8)"
              : "0 0 20px rgba(251, 191, 36, 0.5)",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-brand-green rounded-full flex items-center justify-center shadow-glow-lg"
        >
          <GripVertical className="w-6 h-6 text-black" />
        </motion.div>

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-green-light via-brand-green to-brand-green-dark blur-sm opacity-50" />
      </motion.div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center space-y-6 bg-black/80 backdrop-blur-xl rounded-2xl p-8 border border-brand-green/20"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif">
              Transform Your Business with
              <br />
              <span className="bg-gradient-to-r from-brand-green-light to-brand-green-dark bg-clip-text text-transparent">
                AI-Powered Intelligence
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Drag the divider to see the transformation. Experience the difference SaindLabs AI makes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
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
            </div>

            {/* Drag Hint */}
            {!isDragging && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-sm text-gray-400 flex items-center justify-center gap-2"
              >
                <GripVertical className="w-4 h-4" />
                <span>Drag the divider to compare</span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
    </section>
  );
}
