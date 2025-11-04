"use client";

import { motion } from "framer-motion";
import { Brain, Zap, Shield, Rocket, BarChart3, Code2, Database, Sparkles } from "lucide-react";
import { useState } from "react";

export default function BentoShowcase() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const cards = [
    {
      id: 1,
      title: "AI Automation",
      description: "End-to-end workflow automation powered by AI",
      icon: Brain,
      gradient: "from-brand-green/20 to-brand-green-dark/20",
      size: "col-span-2 row-span-2",
      stats: "247+ Projects Delivered",
    },
    {
      id: 2,
      title: "Custom Development",
      description: "Bespoke SaaS solutions tailored to your needs",
      icon: Code2,
      gradient: "from-brand-green-light/20 to-brand-green/20",
      size: "col-span-1 row-span-1",
      stats: "100% Client Satisfaction",
    },
    {
      id: 3,
      title: "Lightning Fast",
      description: "Optimized performance at enterprise scale",
      icon: Zap,
      gradient: "from-brand-green/20 to-brand-green-light/20",
      size: "col-span-1 row-span-1",
      stats: "<100ms Response",
    },
    {
      id: 4,
      title: "Enterprise Security",
      description: "SOC 2 compliant infrastructure",
      icon: Shield,
      gradient: "from-brand-green-dark/20 to-brand-green/20",
      size: "col-span-1 row-span-2",
      stats: "Bank-Level Security",
    },
    {
      id: 5,
      title: "Intelligent Analytics",
      description: "AI-powered insights from your business data",
      icon: BarChart3,
      gradient: "from-brand-green/20 to-brand-green-dark/20",
      size: "col-span-2 row-span-1",
      stats: "Real-time Dashboards",
    },
    {
      id: 6,
      title: "Seamless Integration",
      description: "Connect to any system or API effortlessly",
      icon: Rocket,
      gradient: "from-brand-green-light/20 to-brand-green-dark/20",
      size: "col-span-1 row-span-1",
      stats: "50+ Integrations",
    },
    {
      id: 7,
      title: "Data Pipeline",
      description: "Automated ETL and data processing",
      icon: Database,
      gradient: "from-brand-green/20 to-brand-green-light/20",
      size: "col-span-1 row-span-1",
      stats: "Petabyte Scale",
    },
  ];

  return (
    <section className="relative py-24 bg-black overflow-hidden section-fade">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl" />
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
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span className="text-sm text-brand-green-light font-medium">
              Powerful Capabilities
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif mb-6">
            Built for{" "}
            <span className="gradient-text">Scale & Performance</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Enterprise-grade AI infrastructure that grows with your business
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[240px]">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const isHovered = hoveredCard === card.id;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`${card.size} group relative`}
              >
                <div className="h-full bg-gradient-to-br from-black via-gray-900/50 to-black border border-brand-green/30 rounded-xl p-6 hover:border-brand-green transition-all duration-300 overflow-hidden cursor-pointer">
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-brand-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl" />

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-between p-2">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="p-4 bg-brand-green/10 border border-brand-green/30 rounded-xl group-hover:bg-brand-green/20 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-brand-green/10">
                          <Icon className="w-8 h-8 text-brand-green" />
                        </div>
                        
                        {/* Animated particles on hover */}
                        {isHovered && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute top-6 right-6"
                          >
                            <motion.div
                              animate={{
                                rotate: 360,
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="w-8 h-8 border-2 border-brand-green/50 border-t-brand-green rounded-full"
                            />
                          </motion.div>
                        )}
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-green-light transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-base text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                          {card.description}
                        </p>
                      </div>

                      {/* Feature highlights for larger cards */}
                      {card.id === 1 && (
                        <div className="space-y-2 mt-4">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <div className="w-1.5 h-1.5 bg-brand-green rounded-full" />
                            <span>Workflow Optimization</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <div className="w-1.5 h-1.5 bg-brand-green rounded-full" />
                            <span>Process Automation</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <div className="w-1.5 h-1.5 bg-brand-green rounded-full" />
                            <span>AI Integration</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="mt-auto pt-4">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/60 border border-brand-green/30 rounded-full backdrop-blur-sm">
                        <motion.div
                          className="w-2 h-2 bg-brand-green rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [1, 0.5, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                        <span className="text-sm font-semibold text-brand-green-light">
                          {card.stats}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-green/10 to-transparent rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6">
            Explore all capabilities in detail
          </p>
          <button className="group px-8 py-4 bg-transparent border-2 border-brand-green text-brand-green-light font-bold rounded-lg hover:bg-brand-green/10 transition-all relative overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              View Full Tech Stack
              <motion.span
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
          </button>
        </motion.div>
      </div>
    </section>
  );
}
