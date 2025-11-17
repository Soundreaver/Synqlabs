"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Trophy,
  Building2,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Quote,
} from "lucide-react";

interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    icon: React.ReactNode;
    color: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    position: string;
  };
  logo: string;
  color: string;
}

export default function SuccessStories() {
  const [activeCase, setActiveCase] = useState<number>(0);

  const caseStudies: CaseStudy[] = [
    {
      id: "fintech",
      company: "FinTech Corp",
      industry: "Financial Services",
      challenge: "Manual loan approval process taking 5+ days with 15% error rate, causing customer frustration and lost opportunities.",
      solution: "Built an AI-powered loan approval system that analyzes creditworthiness, verifies documents, and auto-approves qualified applications in real-time.",
      results: [
        {
          metric: "Processing Time",
          value: "5d → 15m",
          icon: <Clock className="w-4 h-4" />,
          color: "text-blue-400",
        },
        {
          metric: "Error Rate",
          value: "15% → 0.8%",
          icon: <TrendingUp className="w-4 h-4" />,
          color: "text-green-400",
        },
        {
          metric: "Annual Savings",
          value: "$2.4M",
          icon: <DollarSign className="w-4 h-4" />,
          color: "text-brand-green",
        },
        {
          metric: "Satisfaction",
          value: "+45%",
          icon: <Users className="w-4 h-4" />,
          color: "text-purple-400",
        },
      ],
      testimonial: {
        quote: "The AI solution transformed our entire lending operation. We're now approving more loans, faster, with virtually zero errors. ROI in under 6 months.",
        author: "Sarah Johnson",
        position: "VP of Operations",
      },
      logo: "FC",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "healthcare",
      company: "HealthCare Plus",
      industry: "Healthcare",
      challenge: "Radiologists overwhelmed with scan backlog, averaging 72-hour diagnosis turnaround. Critical cases getting lost in queue.",
      solution: "Deployed computer vision AI to prioritize scans, detect anomalies, and assist radiologists with preliminary analysis.",
      results: [
        {
          metric: "Diagnosis Time",
          value: "72h → 4h",
          icon: <Clock className="w-4 h-4" />,
          color: "text-blue-400",
        },
        {
          metric: "Accuracy",
          value: "95.8%",
          icon: <TrendingUp className="w-4 h-4" />,
          color: "text-green-400",
        },
        {
          metric: "Lives Saved",
          value: "180+/yr",
          icon: <Users className="w-4 h-4" />,
          color: "text-red-400",
        },
        {
          metric: "Cost Reduction",
          value: "38%",
          icon: <DollarSign className="w-4 h-4" />,
          color: "text-brand-green",
        },
      ],
      testimonial: {
        quote: "This AI system is like having 10 extra radiologists working 24/7. We're catching critical cases earlier and saving lives.",
        author: "Dr. Michael Chen",
        position: "Chief Medical Officer",
      },
      logo: "HP",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "manufacturing",
      company: "Manufacturing Co",
      industry: "Manufacturing",
      challenge: "Quality control relying on manual inspection, leading to 8% defect rate reaching customers and expensive recalls.",
      solution: "Implemented computer vision AI for real-time quality inspection on production line with instant defect detection.",
      results: [
        {
          metric: "Defect Rate",
          value: "8% → 0.3%",
          icon: <TrendingUp className="w-4 h-4" />,
          color: "text-green-400",
        },
        {
          metric: "Speed",
          value: "100x faster",
          icon: <Clock className="w-4 h-4" />,
          color: "text-blue-400",
        },
        {
          metric: "Savings",
          value: "$3.2M/yr",
          icon: <DollarSign className="w-4 h-4" />,
          color: "text-brand-green",
        },
        {
          metric: "Recalls",
          value: "-96%",
          icon: <Users className="w-4 h-4" />,
          color: "text-purple-400",
        },
      ],
      testimonial: {
        quote: "The ROI was immediate. We eliminated costly recalls and our quality reputation has never been better.",
        author: "James Rodriguez",
        position: "Director of Quality",
      },
      logo: "MC",
      color: "from-orange-500 to-red-500",
    },
    {
      id: "ecommerce",
      company: "E-Commerce Giant",
      industry: "E-Commerce",
      challenge: "Generic product recommendations leading to low conversion rates and high cart abandonment (68%).",
      solution: "Built ML recommendation engine analyzing user behavior, preferences, and purchase patterns for hyper-personalization.",
      results: [
        {
          metric: "Conversion",
          value: "+127%",
          icon: <TrendingUp className="w-4 h-4" />,
          color: "text-green-400",
        },
        {
          metric: "Abandonment",
          value: "68% → 31%",
          icon: <Users className="w-4 h-4" />,
          color: "text-blue-400",
        },
        {
          metric: "Revenue",
          value: "+$8.5M",
          icon: <DollarSign className="w-4 h-4" />,
          color: "text-brand-green",
        },
        {
          metric: "LTV",
          value: "+89%",
          icon: <Users className="w-4 h-4" />,
          color: "text-purple-400",
        },
      ],
      testimonial: {
        quote: "Our customers are finding exactly what they want, faster. The personalization is uncanny and the numbers speak for themselves.",
        author: "Emily Zhang",
        position: "Head of E-Commerce",
      },
      logo: "EG",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const currentCase = caseStudies[activeCase];

  const nextCase = () => {
    setActiveCase((prev) => (prev + 1) % caseStudies.length);
  };

  const prevCase = () => {
    setActiveCase((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/10 border border-brand-green/20 rounded-full backdrop-blur-sm mb-6"
          >
            <Trophy className="w-4 h-4 text-brand-green" />
            <span className="text-sm font-medium text-brand-green-light">
              Client Success Stories
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Real Results,{" "}
            <span className="bg-gradient-to-r from-brand-green-light via-brand-green to-yellow-500 bg-clip-text text-transparent">
              Real Impact
            </span>
          </h2>

          <p className="text-lg text-gray-400">
            See how we've helped businesses achieve breakthrough results with AI
          </p>
        </motion.div>

        {/* Case Study Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            {/* Main Content - Asymmetric Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Company Info & Challenge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                {/* Company Card */}
                <div className="p-6 bg-gradient-to-br from-gray-900/90 to-gray-900/50 border border-gray-800 rounded-2xl">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${currentCase.color} flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}>
                      {currentCase.logo}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {currentCase.company}
                      </h3>
                      <p className="text-sm text-gray-400 flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {currentCase.industry}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Challenge Card */}
                <div className="p-6 bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 rounded-2xl">
                  <h4 className="text-sm font-semibold text-red-400 mb-3 uppercase tracking-wider">
                    The Challenge
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {currentCase.challenge}
                  </p>
                </div>

                {/* Solution Card */}
                <div className="p-6 bg-gradient-to-br from-brand-green/10 to-transparent border border-brand-green/20 rounded-2xl">
                  <h4 className="text-sm font-semibold text-brand-green mb-3 uppercase tracking-wider">
                    Our Solution
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {currentCase.solution}
                  </p>
                </div>
              </motion.div>

              {/* Middle & Right Columns - Results & Testimonial */}
              <div className="lg:col-span-2 space-y-6">
                {/* Results Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="text-sm font-semibold text-brand-green mb-4 uppercase tracking-wider">
                    Measurable Results
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {currentCase.results.map((result, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="relative group"
                      >
                        <div className="p-5 bg-gradient-to-br from-gray-900/90 to-gray-900/50 border border-gray-800 rounded-2xl transition-all duration-300 group-hover:border-brand-green/30 group-hover:shadow-lg group-hover:shadow-brand-green/10">
                          <div className={`${result.color} mb-3`}>
                            {result.icon}
                          </div>
                          <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                            {result.value}
                          </div>
                          <div className="text-xs text-gray-500">
                            {result.metric}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Testimonial Card - Full Width */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative p-8 bg-gradient-to-br from-brand-green/10 via-brand-green/5 to-transparent border border-brand-green/20 rounded-2xl overflow-hidden"
                >
                  {/* Quote Icon Background */}
                  <div className="absolute top-6 right-6 opacity-10">
                    <Quote className="w-24 h-24 text-brand-green" />
                  </div>

                  <div className="relative">
                    <p className="text-lg md:text-xl text-gray-200 italic mb-6 leading-relaxed">
                      "{currentCase.testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${currentCase.color} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                        {currentCase.testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-white">
                          {currentCase.testimonial.author}
                        </p>
                        <p className="text-sm text-gray-400">
                          {currentCase.testimonial.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-8 mt-12">
          <motion.button
            onClick={prevCase}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-brand-green/50 rounded-xl transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-brand-green transition-colors" />
          </motion.button>

          {/* Indicators */}
          <div className="flex gap-2">
            {caseStudies.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setActiveCase(idx)}
                whileHover={{ scale: 1.2 }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeCase
                    ? "w-8 bg-brand-green"
                    : "w-2 bg-gray-700 hover:bg-gray-600"
                }`}
              />
            ))}
          </div>

          <motion.button
            onClick={nextCase}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-brand-green/50 rounded-xl transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-brand-green transition-colors" />
          </motion.button>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-6">
            Ready to write your success story?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-brand-green-dark to-brand-green rounded-xl text-black font-semibold text-lg hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-all duration-300 inline-flex items-center gap-2"
          >
            Start Your Transformation
            <ArrowUpRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
