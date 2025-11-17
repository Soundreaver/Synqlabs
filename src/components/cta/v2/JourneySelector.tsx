"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Zap, Brain, TrendingUp, ArrowRight, CheckCircle } from "lucide-react";

interface Journey {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  benefits: string[];
  cta: string;
}

export default function JourneySelector() {
  const [selectedJourney, setSelectedJourney] = useState<string | null>(null);

  const journeys: Journey[] = [
    {
      id: "automate",
      title: "Automate Workflows",
      subtitle: "Eliminate repetitive tasks and human error",
      icon: <Zap className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      benefits: [
        "Save 15+ hours per week per employee",
        "Reduce errors by up to 95%",
        "24/7 processing with zero downtime",
        "ROI in 3-6 months",
      ],
      cta: "Start Automating",
    },
    {
      id: "analyze",
      title: "Analyze Data",
      subtitle: "Turn raw data into actionable insights",
      icon: <Brain className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      benefits: [
        "Discover hidden patterns and trends",
        "Predict customer behavior accurately",
        "Make data-driven decisions faster",
        "Increase revenue by 20-40%",
      ],
      cta: "Unlock Insights",
    },
    {
      id: "predict",
      title: "Predict Outcomes",
      subtitle: "Forecast trends and prevent problems",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      benefits: [
        "Prevent issues before they occur",
        "Optimize inventory and resources",
        "Forecast demand with 90%+ accuracy",
        "Reduce costs by 30-50%",
      ],
      cta: "See the Future",
    },
  ];

  const selected = journeys.find(j => j.id === selectedJourney);

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
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-brand-green-light to-brand-green-dark bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            What's your biggest challenge? Select your path and we'll show you how AI solves it.
          </p>
        </motion.div>

        {/* Journey Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {journeys.map((journey, index) => (
            <motion.button
              key={journey.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedJourney(selectedJourney === journey.id ? null : journey.id)}
              className={`relative p-8 rounded-2xl border transition-all duration-300 text-left ${
                selectedJourney === journey.id
                  ? "bg-brand-green/10 border-brand-green shadow-[0_0_30px_rgba(251,191,36,0.2)]"
                  : "bg-gray-900/50 border-gray-800 hover:border-gray-700"
              }`}
            >
              <div className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${journey.color} flex items-center justify-center text-white`}>
                {journey.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                {journey.title}
              </h3>
              <p className="text-gray-400 mb-6">{journey.subtitle}</p>

              <div className="flex items-center gap-2 text-brand-green font-semibold">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </div>

              {selectedJourney === journey.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-brand-green/20 to-transparent rounded-2xl pointer-events-none"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Selected Journey Details */}
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-8 md:p-12 bg-gradient-to-br from-gray-900 to-gray-900/50 border border-brand-green/30 rounded-3xl"
          >
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Benefits */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  What You'll Achieve
                </h3>
                <div className="space-y-4">
                  {selected.benefits.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-6 h-6 text-brand-green flex-shrink-0 mt-0.5" />
                      <p className="text-gray-200 text-lg">{benefit}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Box */}
              <div className="flex flex-col justify-center">
                <div className="p-8 bg-gradient-to-br from-brand-green/10 to-brand-green/5 border border-brand-green/30 rounded-2xl">
                  <h4 className="text-xl font-bold text-white mb-4">
                    Ready to Get Started?
                  </h4>
                  <p className="text-gray-300 mb-6">
                    Book a free consultation and we'll create a custom {selected.title.toLowerCase()} solution for your business.
                  </p>

                  <div className="space-y-3">
                    <button className="w-full px-6 py-4 bg-gradient-to-r from-brand-green-dark to-brand-green rounded-lg text-black font-bold hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all duration-300 flex items-center justify-center gap-2">
                      {selected.cta}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <button className="w-full px-6 py-4 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-brand-green/50 text-white rounded-lg transition-all duration-300">
                      See Case Study
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    ⚡ Average response time: 2 hours
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {!selected && (
          <p className="text-center text-gray-500 text-lg py-12">
            Select a journey above to see how we can help transform your business
          </p>
        )}
      </div>
    </section>
  );
}
