"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Upload, Send, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

export default function ChallengeCTA() {
  const [file, setFile] = useState<File | null>(null);
  const [problem, setProblem] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    feasibility: number;
    timeline: string;
    complexity: string;
    approach: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      setResult({
        feasibility: 94,
        timeline: "6-8 weeks",
        complexity: "Medium",
        approach: "We'd use a combination of NLP for document processing and ML for pattern recognition, with a custom dashboard for real-time monitoring.",
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-green/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.03),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 space-y-4"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-green/10 border border-brand-green/30 rounded-full backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-brand-green" />
            <span className="text-sm text-brand-green-light">
              Free AI Feasibility Analysis
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif">
            Send Us Your{" "}
            <span className="bg-gradient-to-r from-brand-green-light to-brand-green-dark bg-clip-text text-transparent">
              Hardest Problem
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Think your challenge is too complex for AI? Challenge accepted. We'll analyze it for free and show you exactly how we'd solve it.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="p-8 md:p-12 bg-gradient-to-br from-gray-900 to-gray-900/50 border border-brand-green/30 rounded-3xl"
        >
          {!result ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Problem Description */}
              <div>
                <label className="block text-sm font-semibold text-brand-green mb-2">
                  Describe Your Challenge
                </label>
                <textarea
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="e.g., 'We process 10,000 invoices monthly, taking 5 days each. High error rate causing refunds and customer complaints.'"
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-green transition-colors"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-brand-green mb-2">
                  Upload Sample Data (Optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="file-upload"
                    accept=".csv,.xlsx,.pdf,.json"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center gap-3 w-full px-4 py-8 bg-gray-800 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-brand-green/50 transition-colors"
                  >
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-gray-400">
                      {file ? file.name : "Drop files here or click to upload"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={analyzing || !problem.trim()}
                className="w-full px-6 py-4 bg-gradient-to-r from-brand-green-dark to-brand-green rounded-lg text-black font-bold hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {analyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Get Free Analysis
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                ⚡ Instant AI analysis • No signup required • 100% confidential
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              {/* Feasibility Score */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <span className="text-sm font-semibold text-green-500">
                    HIGHLY FEASIBLE
                  </span>
                </div>
                <div className="relative w-48 h-48 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      fill="none"
                      stroke="#374151"
                      strokeWidth="12"
                    />
                    <motion.circle
                      cx="96"
                      cy="96"
                      r="88"
                      fill="none"
                      stroke="#FBBF24"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 88}
                      initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - result.feasibility / 100) }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-brand-green">
                        {result.feasibility}%
                      </div>
                      <div className="text-sm text-gray-400">Feasibility</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analysis Results */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                  <div className="text-sm text-gray-400 mb-2">Timeline</div>
                  <div className="text-2xl font-bold text-white">{result.timeline}</div>
                </div>
                <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                  <div className="text-sm text-gray-400 mb-2">Complexity</div>
                  <div className="text-2xl font-bold text-white">{result.complexity}</div>
                </div>
              </div>

              {/* Approach */}
              <div className="p-6 bg-brand-green/5 border border-brand-green/20 rounded-xl">
                <h4 className="text-sm font-semibold text-brand-green mb-3">
                  RECOMMENDED APPROACH
                </h4>
                <p className="text-gray-200 leading-relaxed">{result.approach}</p>
              </div>

              {/* Next Steps */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 px-6 py-4 bg-gradient-to-r from-brand-green-dark to-brand-green rounded-lg text-black font-bold hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all duration-300">
                  Schedule Detailed Consultation
                </button>
                <button
                  onClick={() => {
                    setResult(null);
                    setProblem("");
                    setFile(null);
                  }}
                  className="px-6 py-4 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-brand-green/50 text-white rounded-lg transition-all duration-300"
                >
                  Try Another Problem
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex items-center justify-center gap-8 flex-wrap text-sm text-gray-400"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green" />
            <span>Used by 150+ companies</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green" />
            <span>$45M+ in savings generated</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green" />
            <span>98% client satisfaction</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
