"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  FlaskConical,
  Sparkles,
  Brain,
  Cpu,
  Zap,
  FileSearch,
  BarChart3,
  MessageSquare,
  Image as ImageIcon,
  TrendingUp,
} from "lucide-react";

interface Experiment {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  metrics: {
    label: string;
    value: string;
  }[];
  status: "active" | "completed" | "research";
}

export default function AILab() {
  const [activeExperiment, setActiveExperiment] = useState<string | null>(null);

  const experiments: Experiment[] = [
    {
      id: "nlp",
      title: "Natural Language Processing",
      description: "Advanced text understanding and generation models for document analysis, sentiment detection, and automated content creation.",
      icon: <MessageSquare className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      metrics: [
        { label: "Accuracy", value: "98.7%" },
        { label: "Languages", value: "95+" },
        { label: "Processing Speed", value: "2.1s" },
      ],
      status: "active",
    },
    {
      id: "cv",
      title: "Computer Vision",
      description: "Image recognition, object detection, and visual analysis for quality control, security, and automated inspections.",
      icon: <ImageIcon className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      metrics: [
        { label: "Detection Rate", value: "99.2%" },
        { label: "Real-time FPS", value: "60" },
        { label: "Objects Tracked", value: "250+" },
      ],
      status: "active",
    },
    {
      id: "predictive",
      title: "Predictive Analytics",
      description: "ML models for forecasting trends, demand prediction, and risk assessment from historical data patterns.",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      metrics: [
        { label: "Forecast Accuracy", value: "94.5%" },
        { label: "Lead Time", value: "90 days" },
        { label: "Variables Tracked", value: "500+" },
      ],
      status: "active",
    },
    {
      id: "recommendation",
      title: "Recommendation Engine",
      description: "Personalization algorithms for product suggestions, content matching, and user experience optimization.",
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      metrics: [
        { label: "Match Rate", value: "87.3%" },
        { label: "CTR Increase", value: "+240%" },
        { label: "Users Served", value: "5M+" },
      ],
      status: "completed",
    },
    {
      id: "anomaly",
      title: "Anomaly Detection",
      description: "Real-time monitoring systems to identify unusual patterns, fraud detection, and system health monitoring.",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "from-yellow-500 to-amber-500",
      metrics: [
        { label: "Detection Speed", value: "<100ms" },
        { label: "False Positives", value: "0.3%" },
        { label: "Threats Blocked", value: "50K+" },
      ],
      status: "active",
    },
    {
      id: "optimization",
      title: "Process Optimization",
      description: "AI-driven workflow analysis and optimization for supply chain, logistics, and operational efficiency.",
      icon: <Cpu className="w-8 h-8" />,
      color: "from-brand-green-dark to-brand-green",
      metrics: [
        { label: "Efficiency Gain", value: "+67%" },
        { label: "Cost Reduction", value: "42%" },
        { label: "Time Saved", value: "15hrs/day" },
      ],
      status: "active",
    },
  ];

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Background - Lab Theme */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-green/10 border border-brand-green/30 rounded-full backdrop-blur-sm">
            <FlaskConical className="w-4 h-4 text-brand-green" />
            <span className="text-sm text-brand-green-light">
              Research & Development
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif">
            The AI{" "}
            <span className="bg-gradient-to-r from-brand-green-light to-brand-green-dark bg-clip-text text-transparent">
              Laboratory
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our active AI experiments and capabilities. Hover over each experiment
            to see real-world applications and performance metrics.
          </p>
        </motion.div>

        {/* Experiments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiments.map((experiment, index) => (
            <motion.div
              key={experiment.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setActiveExperiment(experiment.id)}
              onHoverEnd={() => setActiveExperiment(null)}
              className="relative group cursor-pointer"
            >
              {/* Experiment Card */}
              <div className="relative h-full p-6 bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden transition-all duration-500 hover:border-brand-green/50 hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]">
                {/* Status Indicator */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      experiment.status === "active"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : experiment.status === "completed"
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      experiment.status === "active" ? "bg-green-400 animate-pulse" : "bg-current"
                    }`} />
                    {experiment.status}
                  </div>
                </div>

                {/* Icon with Glow */}
                <div className="relative mb-4">
                  <motion.div
                    animate={{
                      scale: activeExperiment === experiment.id ? 1.1 : 1,
                    }}
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${experiment.color} flex items-center justify-center text-white relative overflow-hidden`}
                  >
                    {experiment.icon}
                    
                    {/* Animated glow */}
                    {activeExperiment === experiment.id && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className={`absolute inset-0 bg-gradient-to-br ${experiment.color} rounded-xl`}
                      />
                    )}
                  </motion.div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-green-light transition-colors">
                  {experiment.title}
                </h3>

                <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                  {experiment.description}
                </p>

                {/* Metrics - Show on Hover */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: activeExperiment === experiment.id ? "auto" : 0,
                    opacity: activeExperiment === experiment.id ? 1 : 0,
                  }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-gray-800 space-y-2">
                    {experiment.metrics.map((metric, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">{metric.label}:</span>
                        <span className="text-brand-green-light font-semibold">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 border-2 rounded-2xl pointer-events-none transition-opacity duration-500 ${
                  activeExperiment === experiment.id 
                    ? `opacity-100 bg-gradient-to-br ${experiment.color}`
                    : 'opacity-0'
                } p-[1px]`}>
                  <div className="w-full h-full bg-gray-900 rounded-2xl" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lab Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { icon: <Brain className="w-6 h-6" />, value: "50+", label: "AI Models Trained" },
            { icon: <Cpu className="w-6 h-6" />, value: "1.5B", label: "Parameters" },
            { icon: <Zap className="w-6 h-6" />, value: "99.1%", label: "Avg Accuracy" },
            { icon: <FileSearch className="w-6 h-6" />, value: "24/7", label: "Active Research" },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gray-900/30 rounded-xl border border-gray-800">
              <div className="inline-flex p-3 bg-brand-green/10 rounded-lg text-brand-green mb-3">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-brand-green-light mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4">
            Want to leverage these AI capabilities for your business?
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-brand-green-dark to-brand-green rounded-lg text-black font-semibold hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all duration-300">
            Discuss Your AI Project
          </button>
        </motion.div>
      </div>
    </section>
  );
}
