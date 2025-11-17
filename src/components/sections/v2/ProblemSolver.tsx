"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Target,
  Building2,
  ShoppingCart,
  HeartPulse,
  Factory,
  GraduationCap,
  Landmark,
  TrendingUp,
  Clock,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

interface Industry {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  problems: Problem[];
}

interface Problem {
  id: string;
  title: string;
  description: string;
  solution: {
    approach: string;
    technologies: string[];
    timeline: string;
    roi: string;
  };
  caseStudy: {
    metric: string;
    result: string;
  };
}

export default function ProblemSolver() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);

  const industries: Industry[] = [
    {
      id: "ecommerce",
      name: "E-Commerce",
      icon: <ShoppingCart className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      problems: [
        {
          id: "personalization",
          title: "Low Conversion Rates",
          description: "Generic product recommendations not resonating with customers",
          solution: {
            approach: "Build ML recommendation engine analyzing user behavior, purchase history, and browsing patterns for hyper-personalized product suggestions",
            technologies: ["Collaborative Filtering", "Neural Networks", "Real-time Processing"],
            timeline: "6-8 weeks",
            roi: "+127% conversion rate",
          },
          caseStudy: {
            metric: "Revenue Increase",
            result: "$8.5M/year",
          },
        },
        {
          id: "inventory",
          title: "Inventory Management",
          description: "Stockouts and overstock causing lost sales and high carrying costs",
          solution: {
            approach: "Implement predictive analytics to forecast demand, optimize stock levels, and automate reordering",
            technologies: ["Time Series Analysis", "Demand Forecasting", "Optimization Algorithms"],
            timeline: "4-6 weeks",
            roi: "38% cost reduction",
          },
          caseStudy: {
            metric: "Stockout Reduction",
            result: "92%",
          },
        },
      ],
    },
    {
      id: "healthcare",
      name: "Healthcare",
      icon: <HeartPulse className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      problems: [
        {
          id: "diagnostics",
          title: "Slow Diagnosis Turnaround",
          description: "Radiologists overwhelmed with scan backlog, critical cases delayed",
          solution: {
            approach: "Deploy computer vision AI to prioritize scans, detect anomalies, and assist with preliminary analysis",
            technologies: ["Convolutional Neural Networks", "Image Segmentation", "Anomaly Detection"],
            timeline: "8-10 weeks",
            roi: "95.8% accuracy",
          },
          caseStudy: {
            metric: "Diagnosis Time",
            result: "72hr → 4hr",
          },
        },
        {
          id: "admin",
          title: "Administrative Overload",
          description: "Manual insurance claim processing taking days, high error rates",
          solution: {
            approach: "Automate claim processing with NLP for document analysis and rule-based validation",
            technologies: ["Natural Language Processing", "OCR", "Workflow Automation"],
            timeline: "5-7 weeks",
            roi: "15 hrs saved/day",
          },
          caseStudy: {
            metric: "Processing Time",
            result: "3 days → 2 hrs",
          },
        },
      ],
    },
    {
      id: "manufacturing",
      name: "Manufacturing",
      icon: <Factory className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      problems: [
        {
          id: "quality",
          title: "Quality Control Issues",
          description: "Manual inspection leading to high defect rates and costly recalls",
          solution: {
            approach: "Implement computer vision for real-time quality inspection on production lines",
            technologies: ["Computer Vision", "Real-time Processing", "Edge Computing"],
            timeline: "6-8 weeks",
            roi: "8% → 0.3% defect rate",
          },
          caseStudy: {
            metric: "Recall Reduction",
            result: "96%",
          },
        },
        {
          id: "predictive",
          title: "Equipment Downtime",
          description: "Unexpected machinery failures causing production delays",
          solution: {
            approach: "Deploy IoT sensors with predictive maintenance AI to forecast failures before they occur",
            technologies: ["Predictive Analytics", "IoT Integration", "Time Series Forecasting"],
            timeline: "7-9 weeks",
            roi: "67% uptime increase",
          },
          caseStudy: {
            metric: "Cost Savings",
            result: "$2.1M/year",
          },
        },
      ],
    },
    {
      id: "finance",
      name: "Financial Services",
      icon: <Landmark className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      problems: [
        {
          id: "fraud",
          title: "Fraud Detection",
          description: "Traditional rules missing sophisticated fraud patterns, high false positives",
          solution: {
            approach: "Build ML models analyzing transaction patterns, user behavior, and network graphs for real-time fraud detection",
            technologies: ["Anomaly Detection", "Graph Neural Networks", "Real-time Scoring"],
            timeline: "8-10 weeks",
            roi: "94% fraud caught",
          },
          caseStudy: {
            metric: "False Positives",
            result: "45% → 2%",
          },
        },
        {
          id: "lending",
          title: "Loan Processing",
          description: "Manual approval process taking days, inconsistent decisions",
          solution: {
            approach: "Automate creditworthiness assessment with AI analyzing credit history, financials, and alternative data",
            technologies: ["Credit Scoring Models", "Document Processing", "Risk Assessment"],
            timeline: "6-8 weeks",
            roi: "5 days → 15 min",
          },
          caseStudy: {
            metric: "Approval Rate",
            result: "+23%",
          },
        },
      ],
    },
  ];

  const selectedIndustryData = industries.find(i => i.id === selectedIndustry);
  const selectedProblemData = selectedIndustryData?.problems.find(p => p.id === selectedProblem);

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-green/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.03),transparent_70%)]" />
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
            <Target className="w-4 h-4 text-brand-green" />
            <span className="text-sm text-brand-green-light">
              Find Your Solution
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif">
            Problem{" "}
            <span className="bg-gradient-to-r from-brand-green-light to-brand-green-dark bg-clip-text text-transparent">
              Solver
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Select your industry and challenge to see how we can help transform your business with AI.
          </p>
        </motion.div>

        {/* Industry Selection */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-white mb-6 text-center">
            Choose Your Industry
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((industry, index) => (
              <motion.button
                key={industry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  setSelectedIndustry(industry.id);
                  setSelectedProblem(null);
                }}
                className={`relative p-6 rounded-2xl border transition-all duration-300 ${
                  selectedIndustry === industry.id
                    ? "bg-brand-green/10 border-brand-green shadow-[0_0_20px_rgba(251,191,36,0.2)]"
                    : "bg-gray-900/50 border-gray-800 hover:border-gray-700"
                }`}
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${industry.color} flex items-center justify-center text-white`}>
                  {industry.icon}
                </div>
                <p className={`text-sm font-medium ${
                  selectedIndustry === industry.id ? "text-brand-green-light" : "text-white"
                }`}>
                  {industry.name}
                </p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Problem Selection */}
        <AnimatePresence mode="wait">
          {selectedIndustryData && (
            <motion.div
              key={selectedIndustry}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              <h3 className="text-lg font-semibold text-white mb-6 text-center">
                Select Your Challenge
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {selectedIndustryData.problems.map((problem) => (
                  <button
                    key={problem.id}
                    onClick={() => setSelectedProblem(problem.id)}
                    className={`text-left p-6 rounded-2xl border transition-all duration-300 ${
                      selectedProblem === problem.id
                        ? `bg-gradient-to-br ${selectedIndustryData.color} bg-opacity-10 border-brand-green`
                        : "bg-gray-900/50 border-gray-800 hover:border-gray-700"
                    }`}
                  >
                    <h4 className="text-xl font-bold text-white mb-2">{problem.title}</h4>
                    <p className="text-gray-400 text-sm">{problem.description}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Solution Display */}
        <AnimatePresence mode="wait">
          {selectedProblemData && selectedIndustryData && (
            <motion.div
              key={selectedProblem}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-8 md:p-12 bg-gradient-to-br from-gray-900 to-gray-900/50 border border-brand-green/30 rounded-3xl"
            >
              {/* Solution Header */}
              <div className="flex items-start gap-4 mb-8">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedIndustryData.color} flex items-center justify-center text-white flex-shrink-0`}>
                  <Zap className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    AI-Powered Solution
                  </h3>
                  <p className="text-gray-400">
                    {selectedIndustryData.name} • {selectedProblemData.title}
                  </p>
                </div>
              </div>

              {/* Solution Details */}
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Approach */}
                <div>
                  <h4 className="text-sm font-semibold text-brand-green mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    OUR APPROACH
                  </h4>
                  <p className="text-gray-300 mb-6">{selectedProblemData.solution.approach}</p>

                  <h4 className="text-sm font-semibold text-brand-green mb-3">TECHNOLOGIES USED</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProblemData.solution.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-brand-green/10 border border-brand-green/30 rounded-full text-xs text-brand-green-light"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-4">
                  <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                      <Clock className="w-5 h-5" />
                      <span className="text-sm">Timeline</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{selectedProblemData.solution.timeline}</p>
                  </div>

                  <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                      <TrendingUp className="w-5 h-5" />
                      <span className="text-sm">Expected ROI</span>
                    </div>
                    <p className="text-2xl font-bold text-brand-green-light">{selectedProblemData.solution.roi}</p>
                  </div>

                  <div className="p-6 bg-brand-green/5 border border-brand-green/20 rounded-xl">
                    <div className="flex items-center gap-2 text-brand-green mb-2">
                      <Shield className="w-5 h-5" />
                      <span className="text-sm font-semibold">Real Case Study</span>
                    </div>
                    <p className="text-lg font-bold text-white">{selectedProblemData.caseStudy.result}</p>
                    <p className="text-xs text-gray-400">{selectedProblemData.caseStudy.metric}</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-gradient-to-r from-brand-green-dark to-brand-green rounded-lg text-black font-semibold hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all duration-300 inline-flex items-center justify-center gap-2">
                  Get Custom Solution
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="px-6 py-3 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-brand-green/50 text-white rounded-lg transition-all duration-300">
                  Schedule Consultation
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prompt if nothing selected */}
        {!selectedProblemData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-500 text-lg">
              {!selectedIndustry 
               ? "Select an industry to see relevant challenges and solutions"
                : "Choose a challenge to see our AI-powered solution"}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
