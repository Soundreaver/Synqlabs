"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HeroTerminal from "@/components/home/v2/HeroTerminal";
import HeroNeuralNetwork from "@/components/home/v2/HeroNeuralNetwork";
import HeroSplitScreen from "@/components/home/v2/HeroSplitScreen";
import MetricsDashboard from "@/components/interactive/v2/MetricsDashboard";

const heroOptions = [
  {
    id: "terminal",
    name: "Terminal Interface",
    component: HeroTerminal,
    description: "Matrix-style coding interface with interactive terminal",
  },
  {
    id: "neural",
    name: "Neural Network",
    component: HeroNeuralNetwork,
    description: "Interactive particle network with mouse reactivity",
  },
  {
    id: "split",
    name: "Split Screen",
    component: HeroSplitScreen,
    description: "Before/After comparison with draggable divider",
  },
];

export default function V2DemoPage() {
  const [selectedHero, setSelectedHero] = useState(0);

  const CurrentHero = heroOptions[selectedHero].component;

  const nextHero = () => {
    setSelectedHero((prev) => (prev + 1) % heroOptions.length);
  };

  const prevHero = () => {
    setSelectedHero((prev) => (prev - 1 + heroOptions.length) % heroOptions.length);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Selector */}
      <div className="fixed top-20 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/80 backdrop-blur-xl border border-brand-green/30 rounded-lg p-4 shadow-glow pointer-events-auto"
          >
            <div className="flex items-center justify-between gap-4">
              {/* Previous Button */}
              <button
                onClick={prevHero}
                className="p-2 hover:bg-brand-green/10 rounded-lg transition-colors"
                aria-label="Previous hero"
              >
                <ChevronLeft className="w-6 h-6 text-brand-green" />
              </button>

              {/* Hero Info */}
              <div className="flex-1 text-center">
                <div className="text-sm text-gray-400 mb-1">
                  Hero {selectedHero + 1} of {heroOptions.length}
                </div>
                <div className="text-lg font-semibold text-white">
                  {heroOptions[selectedHero].name}
                </div>
                <div className="text-xs text-gray-500">
                  {heroOptions[selectedHero].description}
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={nextHero}
                className="p-2 hover:bg-brand-green/10 rounded-lg transition-colors"
                aria-label="Next hero"
              >
                <ChevronRight className="w-6 h-6 text-brand-green" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-3">
              {heroOptions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedHero(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === selectedHero
                      ? "bg-brand-green w-8"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to hero ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Current Hero Section */}
      <motion.div
        key={selectedHero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CurrentHero />
      </motion.div>

      {/* Metrics Dashboard */}
      <MetricsDashboard />

      {/* Info Section */}
      <section className="relative py-24 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h2 className="text-4xl font-bold text-white font-serif">
              V2 Component Demo
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {heroOptions.map((hero, index) => (
                <motion.div
                  key={hero.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedHero(index)}
                  className={`p-6 rounded-lg border cursor-pointer transition-all ${
                    selectedHero === index
                      ? "border-brand-green bg-brand-green/5 shadow-glow"
                      : "border-gray-800 hover:border-brand-green/50 bg-gray-900/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white">
                      {hero.name}
                    </h3>
                    {selectedHero === index && (
                      <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    {hero.description}
                  </p>
                  <div className="text-xs text-brand-green">
                    Click to preview →
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 border-t border-gray-800">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Implementation Notes
              </h3>
              <div className="max-w-3xl mx-auto text-gray-300 space-y-4 text-left">
                <p>
                  <strong className="text-brand-green">Location:</strong> All v2 components are in separate folders 
                  (<code className="text-sm bg-gray-800 px-2 py-1 rounded">src/components/home/v2/</code> and 
                  <code className="text-sm bg-gray-800 px-2 py-1 rounded ml-1">src/components/interactive/v2/</code>)
                </p>
                <p>
                  <strong className="text-brand-green">Preserved:</strong> Original components remain untouched. 
                  All color schemes maintained with burnt orange/gold (#FBBF24) as primary.
                </p>
                <p>
                  <strong className="text-brand-green">Features:</strong> Interactive animations, mouse tracking, 
                  Canvas-based effects, live data simulations, and glassmorphism design.
                </p>
                <p>
                  <strong className="text-brand-green">Performance:</strong> Optimized for 60fps with 
                  requestAnimationFrame, proper cleanup, and responsive design.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <motion.a
                href="/docs/phase1-v2-implementation-summary.md"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-4 bg-gradient-to-r from-brand-green-dark via-brand-green to-brand-green-light text-black font-semibold rounded-lg shadow-glow-lg"
              >
                View Full Documentation
              </motion.a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
