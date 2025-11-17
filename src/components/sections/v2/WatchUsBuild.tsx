"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  PlayCircle,
  Code,
  Cpu,
  CheckCircle,
  Rocket,
  ArrowRight,
  FileCode,
  Database,
  Cloud,
  Zap,
} from "lucide-react";

type BuildPhase = "problem" | "design" | "build" | "test" | "deploy" | "complete";

interface PhaseData {
  phase: BuildPhase;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  tasks: string[];
  color: string;
}

export default function WatchUsBuild() {
  const [currentPhase, setCurrentPhase] = useState<BuildPhase>("problem");
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const phases: PhaseData[] = [
    {
      phase: "problem",
      title: "Problem Analysis",
      description: "Understanding your challenge and defining clear objectives",
      icon: <FileCode className="w-6 h-6" />,
      duration: "Week 1",
      tasks: [
        "Stakeholder interviews",
        "Process mapping",
        "Pain point identification",
        "Success metrics defined",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      phase: "design",
      title: "Solution Design",
      description: "Architecting the AI solution tailored to your needs",
      icon: <Code className="w-6 h-6" />,
      duration: "Week 2-3",
      tasks: [
        "AI model selection",
        "System architecture",
        "Data pipeline design",
        "Integration planning",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      phase: "build",
      title: "Development",
      description: "Building and training your custom AI solution",
      icon: <Cpu className="w-6 h-6" />,
      duration: "Week 4-6",
      tasks: [
        "Model development",
        "Backend API creation",
        "Frontend interface",
        "Integration coding",
      ],
      color: "from-brand-green-dark to-brand-green",
    },
    {
      phase: "test",
      title: "Testing & Validation",
      description: "Rigorous testing to ensure accuracy and performance",
      icon: <CheckCircle className="w-6 h-6" />,
      duration: "Week 7",
      tasks: [
        "Unit testing",
        "Performance benchmarking",
        "User acceptance testing",
        "Security audit",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      phase: "deploy",
      title: "Deployment",
      description: "Launching your AI solution into production",
      icon: <Rocket className="w-6 h-6" />,
      duration: "Week 8",
      tasks: [
        "Production deployment",
        "Team training",
        "Documentation",
        "Monitoring setup",
      ],
      color: "from-orange-500 to-red-500",
    },
    {
      phase: "complete",
      title: "Optimization",
      description: "Continuous improvement and support",
      icon: <Zap className="w-6 h-6" />,
      duration: "Ongoing",
      tasks: [
        "Performance monitoring",
        "Model refinement",
        "Feature additions",
        "24/7 support",
      ],
      color: "from-yellow-500 to-amber-500",
    },
  ];

  const handleStartAnimation = async () => {
    setIsAnimating(true);
    setHasRun(false);

    for (const phase of phases) {
      setCurrentPhase(phase.phase);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    setIsAnimating(false);
    setHasRun(true);
  };

  const getCurrentPhaseData = () => {
    return phases.find(p => p.phase === currentPhase) || phases[0];
  };

  const getPhaseStatus = (phase: BuildPhase) => {
    const phaseIndex = phases.findIndex(p => p.phase === phase);
    const currentIndex = phases.findIndex(p => p.phase === currentPhase);
    
    if (phaseIndex < currentIndex) return "complete";
    if (phaseIndex === currentIndex) return "active";
    return "pending";
  };

  const currentPhaseData = getCurrentPhaseData();

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-green/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(251,191,36,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(251,191,36,0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
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
            <PlayCircle className="w-4 h-4 text-brand-green" />
            <span className="text-sm text-brand-green-light">
              Our Process
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif">
            Watch Us{" "}
            <span className="bg-gradient-to-r from-brand-green-light to-brand-green-dark bg-clip-text text-transparent">
              Build
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From problem to solution in 8 weeks. See how we transform your challenges
            into intelligent automation.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="mb-12">
          <div className="relative">
            {/* Progress Bar */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-800">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-green-dark to-brand-green"
                initial={{ width: "0%" }}
                animate={{
                  width: `${(phases.findIndex(p => p.phase === currentPhase) / (phases.length - 1)) * 100}%`
                }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Phase Indicators */}
            <div className="relative grid grid-cols-3 md:grid-cols-6 gap-4">
              {phases.map((phase, index) => {
                const status = getPhaseStatus(phase.phase);
                return (
                  <motion.div
                    key={phase.phase}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => !isAnimating && setCurrentPhase(phase.phase)}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 mb-2 ${
                        status === "complete"
                          ? `bg-gradient-to-br ${phase.color} text-white`
                          : status === "active"
                          ? `bg-gradient-to-br ${phase.color} text-white scale-110`
                          : "bg-gray-800 text-gray-600"
                      }`}
                    >
                      {phase.icon}
                    </div>
                    <p className={`text-xs text-center ${
                      status === "pending" ? "text-gray-600" : "text-gray-300"
                    }`}>
                      {phase.title}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Start Button */}
          <div className="text-center mt-12">
            <button
              onClick={handleStartAnimation}
              disabled={isAnimating}
              className="px-8 py-4 bg-gradient-to-r from-brand-green-dark to-brand-green rounded-xl text-black font-semibold text-lg hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnimating ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Cpu className="w-5 h-5" />
                  </motion.div>
                  Building Solution...
                </span>
              ) : hasRun ? (
                "Watch Again"
              ) : (
                <span className="flex items-center gap-2">
                  <PlayCircle className="w-5 h-5" />
                  Watch the Process
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Current Phase Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-8"
          >
            {/* Phase Info */}
            <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-900/50 border border-brand-green/30 rounded-2xl">
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${currentPhaseData.color} mb-6`}>
                <div className="text-white">
                  {currentPhaseData.icon}
                </div>
              </div>

              <h3 className="text-3xl font-bold text-white mb-2">
                {currentPhaseData.title}
              </h3>

              <p className="text-gray-400 mb-6">
                {currentPhaseData.description}
              </p>

              <div className="flex items-center gap-2 text-brand-green-light mb-6">
                <Database className="w-5 h-5" />
                <span className="font-semibold">{currentPhaseData.duration}</span>
              </div>

              <div className="space-y-3">
                {currentPhaseData.tasks.map((task, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{task}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Visual Representation */}
            <div className="relative p-8 bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl flex items-center justify-center overflow-hidden">
              {/* Animated Code/Build Visualization */}
              <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`absolute inset-0 bg-gradient-to-br ${currentPhaseData.color} opacity-10 blur-3xl`}
                />
                
                {/* Center Icon */}
                <motion.div
                  animate={{
                    rotate: isAnimating ? 360 : 0,
                  }}
                  transition={{ duration: 2, repeat: isAnimating ? Infinity : 0, ease: "linear" }}
                  className={`w-32 h-32 rounded-full bg-gradient-to-br ${currentPhaseData.color} flex items-center justify-center text-white shadow-[0_0_50px_rgba(251,191,36,0.3)]`}
                >
                  <div className="text-white text-5xl">
                    {currentPhaseData.icon}
                  </div>
                </motion.div>

                {/* Orbiting Elements */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      rotate: isAnimating ? 360 : 0,
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: isAnimating ? Infinity : 0,
                      ease: "linear",
                    }}
                    className="absolute"
                    style={{
                      width: `${200 + i * 40}px`,
                      height: `${200 + i * 40}px`,
                    }}
                  >
                    <div className="relative w-full h-full">
                      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-br ${currentPhaseData.color}`} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "8 Weeks", label: "Average Timeline" },
            { value: "100%", label: "On-Time Delivery" },
            { value: "6 Months", label: "Free Support" },
            { value: "ROI+", label: "Guaranteed Results" },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gray-900/30 rounded-xl border border-gray-800">
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
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4">
            Ready to start your AI transformation journey?
          </p>
          <button className="px-6 py-3 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-brand-green/50 text-white rounded-lg transition-all duration-300 inline-flex items-center gap-2">
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
