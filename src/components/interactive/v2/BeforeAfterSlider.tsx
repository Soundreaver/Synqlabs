"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeftRight, Check, X } from "lucide-react";

interface BeforeAfterItem {
  label: string;
  icon?: React.ReactNode;
}

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeItems?: BeforeAfterItem[];
  afterItems?: BeforeAfterItem[];
  title?: string;
  subtitle?: string;
  description?: string;
  mode?: "image" | "list";
}

export default function BeforeAfterSlider({
  beforeImage = "/placeholder-before.jpg",
  afterImage = "/placeholder-after.jpg",
  beforeLabel = "Before AI",
  afterLabel = "After AI",
  beforeItems = [],
  afterItems = [],
  title = "See the Transformation",
  subtitle = "Real Results, Real Impact",
  description = "Drag the slider to see how AI transforms your workflow",
  mode = "list",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-green/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 space-y-4"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-green/10 border border-brand-green/30 rounded-full backdrop-blur-sm">
            <ArrowLeftRight className="w-4 h-4 text-brand-green" />
            <span className="text-sm text-brand-green-light">{subtitle}</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif">
            {title.split(" ").map((word, i) =>
              i === title.split(" ").length - 1 ? (
                <span
                  key={i}
                  className="bg-gradient-to-r from-brand-green-light to-brand-green-dark bg-clip-text text-transparent"
                >
                  {" "}
                  {word}
                </span>
              ) : (
                <span key={i}> {word}</span>
              )
            )}
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Comparison Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          {mode === "image" ? (
            /* Image Mode */
            <div
              className="relative h-[500px] rounded-2xl overflow-hidden cursor-ew-resize select-none"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onTouchMove={handleTouchMove}
            >
              {/* After Image (Full) */}
              <div className="absolute inset-0">
                <div className="relative w-full h-full bg-gray-900">
                  <div className="absolute top-4 right-4 px-4 py-2 bg-brand-green text-black font-semibold rounded-lg shadow-lg z-10">
                    {afterLabel}
                  </div>
                  {/* Placeholder for after image */}
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    After Image
                  </div>
                </div>
              </div>

              {/* Before Image (Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <div className="relative w-full h-full bg-gray-800">
                  <div className="absolute top-4 left-4 px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-lg z-10">
                    {beforeLabel}
                  </div>
                  {/* Placeholder for before image */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Before Image
                  </div>
                </div>
              </div>

              {/* Slider Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-brand-green shadow-[0_0_20px_rgba(251,191,36,0.5)] cursor-ew-resize"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-brand-green rounded-full flex items-center justify-center shadow-glow">
                  <ArrowLeftRight className="w-6 h-6 text-black" />
                </div>
              </div>
            </div>
          ) : (
            /* List Mode */
            <div
              className="relative rounded-2xl overflow-hidden border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-900/50 cursor-ew-resize select-none"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onTouchMove={handleTouchMove}
            >
              <div className="grid md:grid-cols-2 min-h-[500px]">
                {/* Before Side */}
                <div
                  className="relative p-8 space-y-6 overflow-hidden"
                  style={{
                    clipPath: `inset(0 0 0 ${
                      sliderPosition > 50 ? (sliderPosition - 50) * 2 : 0
                    }%)`,
                  }}
                >
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full">
                      <X className="w-4 h-4 text-red-400" />
                      <span className="text-sm text-red-400 font-medium">
                        {beforeLabel}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Traditional Workflow
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {beforeItems.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-4 bg-red-500/5 border border-red-500/20 rounded-lg"
                      >
                        <div className="mt-1">
                          {item.icon || <X className="w-5 h-5 text-red-400" />}
                        </div>
                        <span className="text-gray-300">{item.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* After Side */}
                <div
                  className="relative p-8 space-y-6 overflow-hidden bg-gradient-to-br from-brand-green/5 to-transparent"
                  style={{
                    clipPath: `inset(0 ${
                      sliderPosition < 50 ? (50 - sliderPosition) * 2 : 0
                    }% 0 0)`,
                  }}
                >
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green/10 border border-brand-green/30 rounded-full">
                      <Check className="w-4 h-4 text-brand-green" />
                      <span className="text-sm text-brand-green font-medium">
                        {afterLabel}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      AI-Powered Solution
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {afterItems.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-4 bg-brand-green/5 border border-brand-green/20 rounded-lg"
                      >
                        <div className="mt-1">
                          {item.icon || (
                            <Check className="w-5 h-5 text-brand-green" />
                          )}
                        </div>
                        <span className="text-gray-300">{item.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Vertical Slider Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-brand-green shadow-[0_0_20px_rgba(251,191,36,0.5)] cursor-ew-resize md:block hidden"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-brand-green rounded-full flex items-center justify-center shadow-glow">
                    <ArrowLeftRight className="w-6 h-6 text-black" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Instruction */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isDragging ? 0 : 1 }}
            className="text-center mt-8"
          >
            <p className="text-gray-400 flex items-center justify-center gap-2">
              <ArrowLeftRight className="w-4 h-4" />
              Drag the slider to compare
            </p>
          </motion.div>
        </motion.div>

        {/* Stats */}
        {mode === "list" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: "10x", label: "Faster Processing" },
              { value: "95%", label: "Error Reduction" },
              { value: "$250K", label: "Annual Savings" },
              { value: "24/7", label: "Uptime" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-green-light mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
