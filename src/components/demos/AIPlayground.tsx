"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, Upload, ChevronRight, Check, Loader2 } from "lucide-react";

interface DemoResult {
  input: string;
  output: string;
  metrics: {
    processingTime: string;
    accuracy: string;
    confidence: string;
  };
}

export default function AIPlayground() {
  const [activeDemo, setActiveDemo] = useState<"text" | "image" | "data">("text");
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<DemoResult | null>(null);

  const demos = [
    {
      id: "text" as const,
      name: "Text Analysis",
      icon: Sparkles,
      description: "Sentiment analysis & entity extraction",
      placeholder: "Enter text to analyze...",
    },
    {
      id: "image" as const,
      name: "Image Recognition",
      icon: Upload,
      description: "Object detection & classification",
      placeholder: "Upload an image or enter URL...",
    },
    {
      id: "data" as const,
      name: "Data Prediction",
      icon: ChevronRight,
      description: "Pattern recognition & forecasting",
      placeholder: "Enter data points (comma-separated)...",
    },
  ];

  const handleDemo = async () => {
    if (!input.trim()) return;

    setIsProcessing(true);
    setResult(null);

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock results based on demo type
    const mockResults: Record<typeof activeDemo, DemoResult> = {
      text: {
        input: input,
        output: "Sentiment: Positive (0.92) | Entities: Technology (0.88), Innovation (0.85)",
        metrics: {
          processingTime: "142ms",
          accuracy: "94.2%",
          confidence: "92.5%",
        },
      },
      image: {
        input: input,
        output: "Detected: Person (0.96), Office (0.89), Computer (0.87) | Objects: 12",
        metrics: {
          processingTime: "287ms",
          accuracy: "96.1%",
          confidence: "94.8%",
        },
      },
      data: {
        input: input,
        output: "Trend: Upward (+23%) | Forecast: Next value ~47.3 | Pattern: Seasonal",
        metrics: {
          processingTime: "193ms",
          accuracy: "91.7%",
          confidence: "89.2%",
        },
      },
    };

    setResult(mockResults[activeDemo]);
    setIsProcessing(false);
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-gray-900/50 to-black overflow-hidden section-fade">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/10 border border-brand-green/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span className="text-sm text-brand-green-light font-medium">
              Live AI Demonstration
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif mb-6">
            See AI in{" "}
            <span className="gradient-text">Action</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just read about it—experience it. Try our AI models live and see instant results.
          </p>
        </motion.div>

        {/* Demo Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {demos.map((demo) => {
            const Icon = demo.icon;
            return (
              <button
                key={demo.id}
                onClick={() => {
                  setActiveDemo(demo.id);
                  setResult(null);
                  setInput("");
                }}
                className={`group relative px-6 py-4 rounded-lg border-2 transition-all duration-300 ${
                  activeDemo === demo.id
                    ? "bg-brand-green/20 border-brand-green shadow-[0_0_30px_rgba(251,191,36,0.3)]"
                    : "bg-black/50 border-brand-green/30 hover:border-brand-green/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 ${
                      activeDemo === demo.id
                        ? "text-brand-green"
                        : "text-gray-400 group-hover:text-brand-green-light"
                    }`}
                  />
                  <div className="text-left">
                    <div
                      className={`font-semibold ${
                        activeDemo === demo.id
                          ? "text-brand-green-light"
                          : "text-gray-300 group-hover:text-white"
                      }`}
                    >
                      {demo.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {demo.description}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Demo Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-black/80 border border-brand-green/30 rounded-lg overflow-hidden backdrop-blur-xl shadow-[0_0_50px_rgba(251,191,36,0.2)]">
            {/* Input Section */}
            <div className="p-6 border-b border-brand-green/20">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Input
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={demos.find((d) => d.id === activeDemo)?.placeholder}
                  className="flex-1 px-4 py-3 bg-black/60 border border-brand-green/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-green transition-colors"
                  onKeyPress={(e) => e.key === "Enter" && handleDemo()}
                />
                <button
                  onClick={handleDemo}
                  disabled={isProcessing || !input.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-brand-green-dark to-brand-green text-black font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Process"
                  )}
                </button>
              </div>
            </div>

            {/* Processing Animation */}
            {isProcessing && (
              <div className="p-6 border-b border-brand-green/20">
                <div className="flex items-center gap-3 text-brand-green-light">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="font-medium">
                    Processing with AI models...
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  {["Loading neural network...", "Analyzing patterns...", "Generating insights..."].map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.3 }}
                      className="flex items-center gap-2 text-sm text-gray-400"
                    >
                      <Check className="w-4 h-4 text-brand-green" />
                      {step}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Results Section */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6"
              >
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  AI Output
                </label>
                <div className="p-4 bg-brand-green/5 border border-brand-green/30 rounded-lg mb-4">
                  <p className="text-brand-green-light font-medium">
                    {result.output}
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(result.metrics).map(([key, value]) => (
                    <div
                      key={key}
                      className="text-center p-3 bg-black/60 border border-brand-green/20 rounded-lg"
                    >
                      <div className="text-2xl font-bold gradient-text">
                        {value}
                      </div>
                      <div className="text-xs text-gray-400 capitalize mt-1">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Info Text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center text-sm text-gray-500 mt-6"
          >
            This is a simplified demo. Production models deliver enterprise-grade accuracy and performance.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
