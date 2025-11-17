"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Calculator,
  TrendingUp,
  DollarSign,
  Users,
  Clock,
  Zap,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface ROIMetrics {
  monthlySavings: number;
  yearlyROI: number;
  paybackMonths: number;
  productivityGain: number;
  errorReduction: number;
}

export default function ROICalculator() {
  const [employees, setEmployees] = useState(50);
  const [avgSalary, setAvgSalary] = useState(60000);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [errorRate, setErrorRate] = useState(15);

  const calculateROI = (): ROIMetrics => {
    const hourlyRate = avgSalary / 2080;
    const weeklyHoursSaved = hoursPerWeek * 0.7;
    const annualHoursSaved = weeklyHoursSaved * 52 * employees;
    const annualLaborSavings = annualHoursSaved * hourlyRate;

    const errorCostReduction = (avgSalary * employees * 0.05 * errorRate) / 100;
    const totalAnnualSavings = annualLaborSavings + errorCostReduction;
    const monthlySavings = totalAnnualSavings / 12;

    const implementationCost = 50000;
    const yearlyROI = ((totalAnnualSavings - implementationCost) / implementationCost) * 100;
    const paybackMonths = implementationCost / monthlySavings;

    const productivityGain = (weeklyHoursSaved / hoursPerWeek) * 100;
    const errorReduction = errorRate * 0.85;

    return {
      monthlySavings: Math.round(monthlySavings),
      yearlyROI: Math.round(yearlyROI),
      paybackMonths: Math.round(paybackMonths * 10) / 10,
      productivityGain: Math.round(productivityGain),
      errorReduction: Math.round(errorReduction),
    };
  };

  const metrics = calculateROI();

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/10 border border-brand-green/20 rounded-full backdrop-blur-sm mb-6"
          >
            <Calculator className="w-4 h-4 text-brand-green" />
            <span className="text-sm font-medium text-brand-green-light">
              ROI Calculator
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Calculate Your{" "}
            <span className="bg-gradient-to-r from-brand-green-light via-brand-green to-yellow-500 bg-clip-text text-transparent">
              Potential Savings
            </span>
          </h2>

          <p className="text-lg text-gray-400">
            See the financial impact AI automation could have on your business.
            Adjust the sliders to match your metrics.
          </p>
        </motion.div>

        {/* Main Content - Reversed Split Layout */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Side - Results (3 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Featured Metric - Monthly Savings */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative p-8 bg-gradient-to-br from-brand-green/20 via-brand-green/10 to-transparent border border-brand-green/30 rounded-3xl backdrop-blur-sm overflow-hidden"
            >
              <motion.div
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute top-0 right-0 w-64 h-64 bg-brand-green/20 rounded-full blur-3xl"
              />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-brand-green" />
                      Your Monthly Savings
                    </p>
                    <motion.div
                      key={metrics.monthlySavings}
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-5xl md:text-6xl font-bold text-brand-green-light"
                    >
                      ${metrics.monthlySavings.toLocaleString()}
                    </motion.div>
                  </div>
                  <div className="p-4 bg-brand-green/10 rounded-2xl">
                    <DollarSign className="w-8 h-8 text-brand-green" />
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  Based on {employees} employees × ${avgSalary.toLocaleString()}/year
                </p>
              </div>
            </motion.div>

            {/* Other Metrics Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  label: "Yearly ROI",
                  value: `${metrics.yearlyROI > 0 ? "+" : ""}${metrics.yearlyROI}%`,
                  icon: <TrendingUp className="w-5 h-5" />,
                  color: "from-green-500/20 to-emerald-500/20",
                  textColor: "text-green-400",
                },
                {
                  label: "Payback Period",
                  value: `${metrics.paybackMonths} months`,
                  icon: <Clock className="w-5 h-5" />,
                  color: "from-blue-500/20 to-cyan-500/20",
                  textColor: "text-blue-400",
                },
                {
                  label: "Productivity Gain",
                  value: `+${metrics.productivityGain}%`,
                  icon: <Zap className="w-5 h-5" />,
                  color: "from-purple-500/20 to-pink-500/20",
                  textColor: "text-purple-400",
                },
                {
                  label: "Error Reduction",
                  value: `-${metrics.errorReduction}%`,
                  icon: <CheckCircle className="w-5 h-5" />,
                  color: "from-yellow-500/20 to-orange-500/20",
                  textColor: "text-yellow-400",
                },
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <div className={`p-6 bg-gradient-to-br ${metric.color} border border-gray-800 rounded-2xl backdrop-blur-sm transition-all duration-300 group-hover:border-brand-green/30`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-2.5 rounded-lg bg-gray-900/80 ${metric.textColor}`}>
                        {metric.icon}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
                    <motion.p
                      key={metric.value}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className={`text-2xl md:text-3xl font-bold ${metric.textColor}`}
                    >
                      {metric.value}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Benefits List */}
            <div className="p-6 bg-gradient-to-br from-gray-900/90 to-gray-900/50 border border-gray-800 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4">What's Included:</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Custom AI solution design",
                  "Full implementation & training",
                  "24/7 monitoring & support",
                  "Continuous optimization",
                  "Guaranteed ROI",
                  "Scalable architecture",
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-400">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Input Controls (2 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="sticky top-24 space-y-6 p-8 bg-gradient-to-br from-gray-900/90 via-gray-800/50 to-gray-900/90 border border-gray-800 rounded-2xl backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Users className="w-5 h-5 text-brand-green" />
                Your Business Metrics
              </h3>

              {/* Employees Slider */}
              <div className="space-y-3">
                <label className="flex items-center justify-between text-gray-300">
                  <span className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-brand-green" />
                    Employees
                  </span>
                  <span className="text-brand-green-light font-bold text-lg">
                    {employees}
                  </span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="500"
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-green [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand-green [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>1</span>
                  <span>500</span>
                </div>
              </div>

              {/* Salary Slider */}
              <div className="space-y-3">
                <label className="flex items-center justify-between text-gray-300">
                  <span className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-brand-green" />
                    Avg. Salary
                  </span>
                  <span className="text-brand-green-light font-bold text-lg">
                    ${avgSalary.toLocaleString()}
                  </span>
                </label>
                <input
                  type="range"
                  min="30000"
                  max="150000"
                  step="5000"
                  value={avgSalary}
                  onChange={(e) => setAvgSalary(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-green [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand-green [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>$30K</span>
                  <span>$150K</span>
                </div>
              </div>

              {/* Hours Slider */}
              <div className="space-y-3">
                <label className="flex items-center justify-between text-gray-300">
                  <span className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-brand-green" />
                    Hours/Week
                  </span>
                  <span className="text-brand-green-light font-bold text-lg">
                    {hoursPerWeek}h
                  </span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-green [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand-green [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>1h</span>
                  <span>40h</span>
                </div>
              </div>

              {/* Error Rate Slider */}
              <div className="space-y-3">
                <label className="flex items-center justify-between text-gray-300">
                  <span className="flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-brand-green" />
                    Error Rate
                  </span>
                  <span className="text-brand-green-light font-bold text-lg">
                    {errorRate}%
                  </span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={errorRate}
                  onChange={(e) => setErrorRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-green [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand-green [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>0%</span>
                  <span>50%</span>
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-brand-green-dark to-brand-green rounded-xl text-black font-semibold text-lg hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-all duration-300 flex items-center justify-center gap-2"
              >
                Get Custom Proposal
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              {/* Disclaimer */}
              <p className="text-xs text-gray-600 leading-relaxed pt-4 border-t border-gray-800">
                * Estimates based on industry averages. Actual results vary by implementation.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
