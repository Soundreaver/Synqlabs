"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Sparkles,
  FileText,
  Loader2,
  CheckCircle,
  Upload,
  Zap,
  ArrowRight,
  AlertCircle,
  Building2,
  Calendar,
  DollarSign,
  Tag,
  Clock,
  Play,
} from "lucide-react";

type ProcessingStep = "upload" | "extract" | "validate" | "categorize" | "approve" | "complete";

interface InvoiceData {
  invoiceNumber: string;
  vendor: string;
  date: string;
  amount: number;
  category: string;
  paymentTerms: string;
  lineItems: { description: string; amount: number }[];
}

interface ValidationResult {
  passed: boolean;
  issues: string[];
  warnings: string[];
}

interface AutomationResult {
  step: ProcessingStep;
  data?: InvoiceData;
  validation?: ValidationResult;
  decision?: {
    action: "approve" | "review" | "reject";
    reason: string;
    confidence: number;
  };
}

export default function AIPlayground() {
  const [currentStep, setCurrentStep] = useState<ProcessingStep>("upload");
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [automationResult, setAutomationResult] = useState<AutomationResult | null>(null);

  const steps: { step: ProcessingStep; label: string; icon: React.ReactNode }[] = [
    { step: "upload", label: "Upload", icon: <Upload className="w-4 h-4" /> },
    { step: "extract", label: "Extract", icon: <FileText className="w-4 h-4" /> },
    { step: "validate", label: "Validate", icon: <CheckCircle className="w-4 h-4" /> },
    { step: "categorize", label: "Categorize", icon: <Tag className="w-4 h-4" /> },
    { step: "approve", label: "Approve", icon: <Zap className="w-4 h-4" /> },
    { step: "complete", label: "Complete", icon: <CheckCircle className="w-4 h-4" /> },
  ];

  const invoiceData: InvoiceData = {
    invoiceNumber: "INV-2025-001",
    vendor: "TechSupply Corp",
    date: "2025-01-15",
    amount: 15420.00,
    category: "IT Equipment",
    paymentTerms: "Net 30",
    lineItems: [
      { description: "Laptop - Dell XPS 15", amount: 8500.00 },
      { description: "Monitor - 27\" 4K", amount: 3200.00 },
      { description: "Docking Station", amount: 1850.00 },
      { description: "Accessories Bundle", amount: 1870.00 },
    ],
  };

  const handleStartAutomation = async () => {
    setIsProcessing(true);
   setCurrentStep("upload");
    setHasRun(false);
    setAutomationResult(null);

    const workflow: ProcessingStep[] = ["upload", "extract", "validate", "categorize", "approve", "complete"];
    
    for (let i = 0; i < workflow.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setCurrentStep(workflow[i]);

      if (workflow[i] === "extract") {
        setAutomationResult({
          step: "extract",
          data: invoiceData,
        });
      } else if (workflow[i] === "validate") {
        setAutomationResult({
          step: "validate",
          validation: {
            passed: true,
            issues: [],
            warnings: ["Payment terms exceed standard 15-day policy"],
          },
          data: invoiceData,
        });
      } else if (workflow[i] === "approve") {
        setAutomationResult({
          step: "approve",
          decision: {
            action: "approve",
            reason: "Amount within approval limits, vendor verified, budget available",
            confidence: 96.5,
          },
          data: invoiceData,
          validation: {
            passed: true,
            issues: [],
            warnings: ["Payment terms exceed standard 15-day policy"],
          },
        });
      } else if (workflow[i] === "complete") {
        setAutomationResult({
          step: "complete",
          decision: {
            action: "approve",
            reason: "Amount within approval limits, vendor verified, budget available",
            confidence: 96.5,
          },
          data: invoiceData,
          validation: {
            passed: true,
            issues: [],
            warnings: ["Payment terms exceed standard 15-day policy"],
          },
        });
      }
    }

    setIsProcessing(false);
    setHasRun(true);
  };

  const getStepStatus = (step: ProcessingStep) => {
    const stepIndex = steps.findIndex(s => s.step === step);
    const currentIndex = steps.findIndex(s => s.step === currentStep);
    
    if (stepIndex < currentIndex) return "complete";
    if (stepIndex === currentIndex) return "active";
    return "pending";
  };

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
            <Zap className="w-4 h-4 text-brand-green" />
            <span className="text-sm font-medium text-brand-green-light">
              AI Automation Demo
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Watch AI Process Invoices in{" "}
            <span className="bg-gradient-to-r from-brand-green-light via-brand-green to-yellow-500 bg-clip-text text-transparent">
              Real-Time
            </span>
          </h2>

          <p className="text-lg text-gray-400">
            From upload to approval in 15 seconds. See how AI transforms manual 
            invoice processing into an automated workflow.
          </p>
        </motion.div>

        {/* Main Content - Split Layout */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Side - Process Flow (2 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Start Button */}
            <motion.button
              onClick={handleStartAutomation}
              disabled={isProcessing}
              whileHover={{ scale: isProcessing ? 1 : 1.02 }}
              whileTap={{ scale: isProcessing ? 1 : 0.98 }}
              className="w-full px-8 py-4 bg-gradient-to-r from-brand-green-dark to-brand-green rounded-xl text-black font-semibold text-lg hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  {hasRun ? "Run Again" : "Start Demo"}
                </>
              )}
            </motion.button>

            {/* Steps */}
            <div className="space-y-3">
              {steps.map((step, index) => {
                const status = getStepStatus(step.step);
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative p-4 rounded-xl border transition-all duration-300 ${
                      status === "complete"
                        ? "bg-brand-green/10 border-brand-green"
                        : status === "active"
                        ? "bg-brand-green/5 border-brand-green/50 shadow-lg shadow-brand-green/20"
                        : "bg-gray-900/50 border-gray-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2.5 rounded-lg ${
                          status === "complete"
                            ? "bg-brand-green text-black"
                            : status === "active"
                            ? "bg-brand-green/20 text-brand-green"
                            : "bg-gray-800 text-gray-600"
                        }`}
                      >
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`font-medium ${
                            status === "pending" ? "text-gray-600" : "text-white"
                          }`}
                        >
                          {step.label}
                        </p>
                      </div>
                      {status === "active" && (
                        <Loader2 className="w-4 h-4 text-brand-green animate-spin" />
                      )}
                      {status === "complete" && (
                        <CheckCircle className="w-4 h-4 text-brand-green" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
                <div className="flex items-center gap-2 text-brand-green mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-2xl font-bold">15s</span>
                </div>
                <p className="text-xs text-gray-500">Process Time</p>
              </div>
              <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-2xl font-bold">99.8%</span>
                </div>
                <p className="text-xs text-gray-500">Accuracy</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Results Display (3 columns) */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {automationResult ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Extracted Data */}
                  {automationResult.data && (
                    <div className="p-6 bg-gradient-to-br from-gray-900/90 via-gray-800/50 to-gray-900/90 border border-brand-green/30 rounded-2xl backdrop-blur-sm">
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-brand-green" />
                        Extracted Invoice Data
                      </h3>

                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-gray-800/50 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Invoice #</p>
                            <p className="text-sm font-semibold text-brand-green-light">
                              {automationResult.data.invoiceNumber}
                            </p>
                          </div>
                          <div className="p-3 bg-gray-800/50 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Date</p>
                            <p className="text-sm font-semibold text-white flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {automationResult.data.date}
                            </p>
                          </div>
                        </div>

                        <div className="p-3 bg-gray-800/50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Vendor</p>
                          <p className="text-sm font-semibold text-white flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            {automationResult.data.vendor}
                          </p>
                        </div>

                        <div className="p-4 bg-brand-green/5 border border-brand-green/20 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                          <p className="text-2xl font-bold text-brand-green-light flex items-center gap-1">
                            <DollarSign className="w-5 h-5" />
                            {automationResult.data.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Validation & Decision */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Validation */}
                    {automationResult.validation && (
                      <div className="p-6 bg-gradient-to-br from-gray-900/90 to-gray-900/50 border border-gray-800 rounded-2xl">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          Validation
                        </h3>

                        <div className="space-y-3">
                          {automationResult.validation.passed && (
                            <div className="flex items-start gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-semibold text-green-400">All Checks Passed</p>
                                <p className="text-xs text-gray-400 mt-1">
                                  Format, amounts, vendor validated
                                </p>
                              </div>
                            </div>
                          )}

                          {automationResult.validation.warnings.length > 0 && (
                            <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                              <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-gray-400">
                                  {automationResult.validation.warnings[0]}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Decision */}
                    {automationResult.decision && (
                      <div className="p-6 bg-gradient-to-br from-brand-green/10 to-transparent border border-brand-green/30 rounded-2xl">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                          <Zap className="w-5 h-5 text-brand-green" />
                          AI Decision
                        </h3>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-brand-green/5 rounded-lg">
                            <span className="text-sm text-gray-300">Action:</span>
                            <span className="px-3 py-1 bg-brand-green text-black rounded-full text-xs font-semibold uppercase">
                              {automationResult.decision.action}
                            </span>
                          </div>

                          <div className="p-3 bg-gray-800/50 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">Confidence:</p>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${automationResult.decision.confidence}%` }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                  className="h-full bg-gradient-to-r from-brand-green-dark to-brand-green"
                                />
                              </div>
                              <span className="text-brand-green-light font-bold text-sm">
                                {automationResult.decision.confidence}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8 bg-gray-900/20 border border-gray-800 border-dashed rounded-2xl">
                  <Upload className="w-16 h-16 text-gray-700 mb-4" />
                  <p className="text-gray-400 mb-2 text-lg font-medium">
                    Ready to see AI in action?
                  </p>
                  <p className="text-gray-600 text-sm">
                    Click "Start Demo" to watch the automation process
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
