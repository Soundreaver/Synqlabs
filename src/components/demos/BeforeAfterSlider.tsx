"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { TrendingUp, Clock, DollarSign, Target } from "lucide-react";

interface CaseStudy {
  title: string;
  industry: string;
  before: {
    image: string;
    metrics: { label: string; value: string }[];
    description: string;
  };
  after: {
    image: string;
    metrics: { label: string; value: string }[];
    description: string;
  };
  impact: {
    icon: typeof TrendingUp;
    label: string;
    value: string;
    trend: "up" | "down";
  }[];
}

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);

  const caseStudies: CaseStudy[] = [
    {
      title: "E-Commerce Order Processing",
      industry: "Retail",
      before: {
        image: "processing-before",
        metrics: [
          { label: "Processing Time", value: "2.4 hours" },
          { label: "Error Rate", value: "8.3%" },
          { label: "Manual Steps", value: "23" },
        ],
        description: "Manual order processing with multiple handoffs and frequent errors",
      },
      after: {
        image: "processing-after",
        metrics: [
          { label: "Processing Time", value: "4.2 minutes" },
          { label: "Error Rate", value: "0.2%" },
          { label: "Automated Steps", value: "23" },
        ],
        description: "AI-powered automation with real-time validation and routing",
      },
      impact: [
        { icon: Clock, label: "Time Saved", value: "97%", trend: "up" },
        { icon: DollarSign, label: "Cost Reduction", value: "$847K/year", trend: "down" },
        { icon: Target, label: "Accuracy", value: "99.8%", trend: "up" },
        { icon: TrendingUp, label: "Throughput", value: "+340%", trend: "up" },
      ],
    },
    {
      title: "Customer Support Automation",
      industry: "SaaS",
      before: {
        image: "support-before",
        metrics: [
          { label: "Response Time", value: "4.7 hours" },
          { label: "Resolution Rate", value: "62%" },
          { label: "Support Cost", value: "$12/ticket" },
        ],
        description: "Traditional support queue with high wait times and inconsistent quality",
      },
      after: {
        image: "support-after",
        metrics: [
          { label: "Response Time", value: "12 seconds" },
          { label: "Resolution Rate", value: "94%" },
          { label: "Support Cost", value: "$1.80/ticket" },
        ],
        description: "AI-driven support with instant responses and intelligent routing",
      },
      impact: [
        { icon: Clock, label: "Faster Response", value: "99.6%", trend: "up" },
        { icon: DollarSign, label: "Cost Savings", value: "$2.3M/year", trend: "down" },
        { icon: Target, label: "CSAT Score", value: "4.8/5", trend: "up" },
        { icon: TrendingUp, label: "Ticket Volume", value: "+180%", trend: "up" },
      ],
    },
  ];

  const currentCase = caseStudies[activeCaseStudy];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  return (
    <section className="relative py-24 bg-black overflow-hidden section-fade">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/10 border border-brand-green/30 rounded-full mb-6">
            <TrendingUp className="w-4 h-4 text-brand-green" />
            <span className="text-sm text-brand-green-light font-medium">
              Real Results
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif mb-6">
            The <span className="gradient-text">Transformation</span> in Numbers
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See the dramatic before-and-after impact of AI implementation
          </p>
        </motion.div>

        {/* Case Study Selector */}
        <div className="flex justify-center gap-4 mb-12">
          {caseStudies.map((study, index) => (
            <button
              key={index}
              onClick={() => setActiveCaseStudy(index)}
              className={`px-6 py-3 rounded-lg border-2 transition-all ${
                activeCaseStudy === index
                  ? "bg-brand-green/20 border-brand-green shadow-[0_0_20px_rgba(251,191,36,0.3)]"
                  : "bg-black/50 border-brand-green/30 hover:border-brand-green/60"
              }`}
            >
              <div className="text-sm font-semibold text-white">{study.title}</div>
              <div className="text-xs text-gray-400">{study.industry}</div>
            </button>
          ))}
        </div>

        {/* Before/After Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Before */}
          <div className="bg-black/60 border border-red-500/30 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="px-3 py-1 bg-red-500/20 border border-red-500/50 rounded text-sm font-semibold text-red-400">
                Before AI
              </div>
            </div>
            <p className="text-gray-300 mb-6">{currentCase.before.description}</p>
            <div className="space-y-3">
              {currentCase.before.metrics.map((metric, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-gray-800">
                  <span className="text-gray-400">{metric.label}</span>
                  <span className="font-semibold text-red-400">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* After */}
          <div className="bg-black/60 border border-brand-green/30 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="px-3 py-1 bg-brand-green/20 border border-brand-green/50 rounded text-sm font-semibold text-brand-green-light">
                After AI
              </div>
            </div>
            <p className="text-gray-300 mb-6">{currentCase.after.description}</p>
            <div className="space-y-3">
              {currentCase.after.metrics.map((metric, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-gray-800">
                  <span className="text-gray-400">{metric.label}</span>
                  <span className="font-semibold text-brand-green-light">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Impact Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {currentCase.impact.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-brand-green/30 rounded-lg p-6 hover:border-brand-green/60 transition-all cursor-pointer">
                  <div className="absolute inset-0 bg-brand-green/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <Icon className="w-8 h-8 text-brand-green mb-3" />
                    <div className="text-3xl font-bold gradient-text mb-2">
                      {item.value}
                    </div>
                    <div className="text-sm text-gray-400">{item.label}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-300 mb-6">
            Ready to see similar results for your business?
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-brand-green-dark to-brand-green text-black font-bold rounded-lg hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-all">
            Schedule Your Free Assessment
          </button>
        </motion.div>
      </div>
    </section>
  );
}
