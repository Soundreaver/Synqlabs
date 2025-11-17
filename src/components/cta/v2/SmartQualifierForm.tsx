"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, CheckCircle, Building2, Users, DollarSign, Calendar } from "lucide-react";

interface FormData {
  industry: string;
  companySize: string;
  challenge: string;
  timeline: string;
  budget: string;
}

export default function SmartQualifierForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    industry: "",
    companySize: "",
    challenge: "",
    timeline: "",
    budget: "",
  });
  const [estimate, setEstimate] = useState<{
    cost: string;
    timeline: string;
    roi: string;
  } | null>(null);

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Calculate estimate based on selections
      const costMap: Record<string, string> = {
        small: "$15K - $30K",
        medium: "$30K - $60K",
        large: "$60K - $150K",
        enterprise: "$150K+",
      };

      const timelineMap: Record<string, string> = {
        urgent: "4-6 weeks",
        normal: "6-10 weeks",
        flexible: "10-16 weeks",
      };

      setEstimate({
        cost: costMap[formData.companySize] || "$30K - $60K",
        timeline: timelineMap[formData.timeline] || "6-10 weeks",
        roi: "245%",
      });
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.industry !== "";
      case 2: return formData.companySize !== "";
      case 3: return formData.challenge !== "";
      case 4: return formData.timeline !== "";
      case 5: return formData.budget !== "";
      default: return false;
    }
  };

  if (estimate) {
    return (
      <section className="relative py-24 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 md:p-12 bg-gradient-to-br from-gray-900 to-gray-900/50 border border-brand-green/30 rounded-3xl"
          >
            <div className="text-center mb-8">
              <CheckCircle className="w-16 h-16 text-brand-green mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">
                Your Custom Estimate
              </h2>
              <p className="text-gray-400">
                Based on your responses, here's what we recommend
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 text-center">
                <DollarSign className="w-8 h-8 text-brand-green mx-auto mb-3" />
                <div className="text-sm text-gray-400 mb-2">Investment</div>
                <div className="text-2xl font-bold text-white">{estimate.cost}</div>
              </div>
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 text-center">
                <Calendar className="w-8 h-8 text-brand-green mx-auto mb-3" />
                <div className="text-sm text-gray-400 mb-2">Timeline</div>
                <div className="text-2xl font-bold text-white">{estimate.timeline}</div>
              </div>
              <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 text-center">
                <CheckCircle className="w-8 h-8 text-brand-green mx-auto mb-3" />
                <div className="text-sm text-gray-400 mb-2">Expected ROI</div>
                <div className="text-2xl font-bold text-brand-green">{estimate.roi}</div>
              </div>
            </div>

            <div className="p-6 bg-brand-green/5 border border-brand-green/20 rounded-xl mb-8">
              <h4 className="text-sm font-semibold text-brand-green mb-3">
                RECOMMENDED NEXT STEPS
              </h4>
              <ul className="space-y-2 text-gray-200">
                <li className="flex items-start gap-2">
                  <span className="text-brand-green mt-1">1.</span>
                  <span>Schedule a 30-minute discovery call with our team</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-green mt-1">2.</span>
                  <span>We'll create a detailed proposal tailored to your needs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-green mt-1">3.</span>
                  <span>Start implementation within 2 weeks of approval</span>
                </li>
              </ul>
            </div>

            <button className="w-full px-6 py-4 bg-gradient-to-r from-brand-green-dark to-brand-green rounded-lg text-black font-bold hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all duration-300 flex items-center justify-center gap-2">
              Schedule Discovery Call
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-green/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-brand-green">
              Step {step} of {totalSteps}
            </span>
            <span className="text-sm text-gray-400">
              {Math.round((step / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand-green"
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-8 md:p-12 bg-gradient-to-br from-gray-900 to-gray-900/50 border border-brand-green/30 rounded-3xl"
          >
            {step === 1 && (
              <div>
                <Building2 className="w-12 h-12 text-brand-green mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  What industry are you in?
                </h3>
                <div className="space-y-3">
                  {["E-Commerce", "Healthcare", "Manufacturing", "Finance", "Other"].map((option) => (
                    <button
                      key={option}
                      onClick={() => updateField("industry", option)}
                      className={`w-full p-4 rounded-lg border transition-all text-left ${
                        formData.industry === option
                          ? "bg-brand-green/10 border-brand-green text-white"
                          : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <Users className="w-12 h-12 text-brand-green mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  What's your company size?
                </h3>
                <div className="space-y-3">
                  {[
                    { value: "small", label: "1-50 employees" },
                    { value: "medium", label: "51-200 employees" },
                    { value: "large", label: "201-1000 employees" },
                    { value: "enterprise", label: "1000+ employees" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateField("companySize", option.value)}
                      className={`w-full p-4 rounded-lg border transition-all text-left ${
                        formData.companySize === option.value
                          ? "bg-brand-green/10 border-brand-green text-white"
                          : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  What's your biggest challenge?
                </h3>
                <div className="space-y-3">
                  {[
                    "Manual processes taking too long",
                    "High error rates in operations",
                    "Need better data insights",
                    "Scaling bottlenecks",
                    "Customer experience issues",
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => updateField("challenge", option)}
                      className={`w-full p-4 rounded-lg border transition-all text-left ${
                        formData.challenge === option
                          ? "bg-brand-green/10 border-brand-green text-white"
                          : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <Calendar className="w-12 h-12 text-brand-green mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  What's your timeline?
                </h3>
                <div className="space-y-3">
                  {[
                    { value: "urgent", label: "As soon as possible (< 6 weeks)" },
                    { value: "normal", label: "Within 3 months" },
                    { value: "flexible", label: "Flexible timeline" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateField("timeline", option.value)}
                      className={`w-full p-4 rounded-lg border transition-all text-left ${
                        formData.timeline === option.value
                          ? "bg-brand-green/10 border-brand-green text-white"
                          : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <DollarSign className="w-12 h-12 text-brand-green mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  What's your budget range?
                </h3>
                <div className="space-y-3">
                  {[
                    "Under $25K",
                    "$25K - $50K",
                    "$50K - $100K",
                    "$100K+",
                    "Not sure yet",
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => updateField("budget", option)}
                      className={`w-full p-4 rounded-lg border transition-all text-left ${
                        formData.budget === option
                          ? "bg-brand-green/10 border-brand-green text-white"
                          : "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-lg transition-colors"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-brand-green-dark to-brand-green rounded-lg text-black font-bold hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {step === totalSteps ? "Get Estimate" : "Continue"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
