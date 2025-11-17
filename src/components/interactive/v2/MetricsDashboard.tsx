"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Activity,
  Zap,
  TrendingUp,
  Clock,
  Database,
  Cpu,
  BarChart3,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";
interface Metric {
  id: string;
  label: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  trend: "up" | "down" | "stable";
  description: string;
  change: number;
}

const AnimatedCounter = ({
  value,
  unit,
  duration = 2,
}: {
  value: number;
  unit: string;
  duration?: number;
}) => {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [springValue]);

  const formatted = unit === "%" || unit === "TB" 
    ? displayValue.toFixed(1)
    : Math.round(displayValue).toLocaleString();

  return (
    <span className="tabular-nums">
      {formatted}
      {unit}
    </span>
  );
};

const TrendIndicator = ({ trend, change }: { trend: "up" | "down" | "stable"; change: number }) => {
  const Icon = trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : Minus;
  const colorClass = 
    trend === "up" ? "text-emerald-400 bg-emerald-400/10" : 
    trend === "down" ? "text-red-400 bg-red-400/10" : 
    "text-gray-400 bg-gray-400/10";

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
      <Icon className="w-3 h-3" />
      <span>{Math.abs(change).toFixed(1)}%</span>
    </div>
  );
};

export default function MetricsDashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      id: "projects",
      label: "AI Projects Delivered",
      value: 247,
      unit: "",
      icon: <Cpu className="w-5 h-5" />,
      color: "text-brand-green",
      gradient: "from-yellow-500/20 to-amber-500/20",
      trend: "up",
      description: "This year",
      change: 23.5,
    },
    {
      id: "hours",
      label: "Hours Saved",
      value: 15420,
      unit: "",
      icon: <Clock className="w-5 h-5" />,
      color: "text-blue-400",
      gradient: "from-blue-500/20 to-cyan-500/20",
      trend: "up",
      description: "For our clients",
      change: 45.2,
    },
    {
      id: "accuracy",
      label: "Solution Accuracy",
      value: 98.7,
      unit: "%",
      icon: <CheckCircle className="w-5 h-5" />,
      color: "text-emerald-400",
      gradient: "from-emerald-500/20 to-green-500/20",
      trend: "stable",
      description: "Average across solutions",
      change: 0.3,
    },
    {
      id: "data",
      label: "Data Processed",
      value: 2.4,
      unit: "TB",
      icon: <Database className="w-5 h-5" />,
      color: "text-purple-400",
      gradient: "from-purple-500/20 to-pink-500/20",
      trend: "up",
      description: "Today",
      change: 12.8,
    },
    {
      id: "processes",
      label: "Processes Automated",
      value: 1834,
      unit: "",
      icon: <Zap className="w-5 h-5" />,
      color: "text-yellow-400",
      gradient: "from-yellow-500/20 to-orange-500/20",
      trend: "up",
      description: "Across all clients",
      change: 34.6,
    },
    {
      id: "uptime",
      label: "System Uptime",
      value: 99.98,
      unit: "%",
      icon: <Activity className="w-5 h-5" />,
      color: "text-cyan-400",
      gradient: "from-cyan-500/20 to-teal-500/20",
      trend: "stable",
      description: "Last 30 days",
      change: 0.1,
    },
  ]);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => {
          const changeAmount =
            metric.trend === "up"
              ? Math.random() * 3
              : metric.trend === "down"
              ? -Math.random() * 1.5
              : (Math.random() - 0.5) * 0.5;

          return {
            ...metric,
            value: Math.max(0, metric.value + changeAmount),
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/10 border border-brand-green/20 rounded-full backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <BarChart3 className="w-4 h-4 text-brand-green" />
            </motion.div>
            <span className="text-sm font-medium text-brand-green-light">
              Live Performance Dashboard
            </span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="w-2 h-2 bg-brand-green rounded-full"
            />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Watch Our{" "}
            <span className="bg-gradient-to-r from-brand-green-light via-brand-green to-yellow-500 bg-clip-text text-transparent">
              AI in Action
            </span>
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Real-time metrics showcasing the power and performance of our AI solutions
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`relative h-full p-6 bg-gradient-to-br from-gray-900/90 via-gray-800/50 to-gray-900/90 border border-gray-800/50 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
                  hoveredIndex === index ? "shadow-2xl shadow-brand-green/10" : ""
                }`}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon & Trend */}
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`p-3 rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 ${metric.color}`}
                    >
                      {metric.icon}
                    </motion.div>
                    <TrendIndicator trend={metric.trend} change={metric.change} />
                  </div>

                  {/* Label */}
                  <h3 className="text-sm font-medium text-gray-400 mb-2">
                    {metric.label}
                  </h3>

                  {/* Value */}
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight">
                    <AnimatedCounter value={metric.value} unit={metric.unit} />
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-500">
                    {metric.description}
                  </p>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  className="absolute inset-0 bg-gradient-to-tr from-brand-green/5 via-transparent to-transparent rounded-2xl pointer-events-none"
                />

                {/* Border Glow on Hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  className="absolute inset-0 rounded-2xl border-2 border-brand-green/20 pointer-events-none"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 relative"
        >
          <div className="relative p-8 bg-gradient-to-r from-brand-green/5 via-transparent to-brand-green/5 border border-brand-green/10 rounded-2xl backdrop-blur-sm overflow-hidden">
            {/* Animated Background */}
            <motion.div
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-green/5 to-transparent"
            />

            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-brand-green-light to-brand-green bg-clip-text text-transparent mb-2">
                  <AnimatedCounter value={50} unit="+" />
                </div>
                <div className="text-sm text-gray-400">Enterprise Clients</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-brand-green-light to-brand-green bg-clip-text text-transparent mb-2">
                  500M+
                </div>
                <div className="text-sm text-gray-400">Predictions Made</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-brand-green-light to-brand-green bg-clip-text text-transparent mb-2">
                  <AnimatedCounter value={99.9} unit="%" />
                </div>
                <div className="text-sm text-gray-400">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-brand-green-light to-brand-green bg-clip-text text-transparent mb-2">
                  24/7
                </div>
                <div className="text-sm text-gray-400">AI Monitoring</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Live Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500"
        >
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-2 h-2 bg-brand-green rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)]"
          />
          <span>Updating in real-time</span>
        </motion.div>
      </div>
    </section>
  );
}
