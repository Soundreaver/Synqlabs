"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Metric {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
}

interface LiveMetricsProps {
  metrics?: Metric[];
}

export default function LiveMetrics({ metrics }: LiveMetricsProps) {
  const defaultMetrics: Metric[] = [
    { label: "Projects Delivered", value: 247, suffix: "+", prefix: "" },
    { label: "Hours Saved", value: 15240, suffix: "+", prefix: "" },
    { label: "Client Success Rate", value: 99.8, suffix: "%", prefix: "" },
    { label: "Client Satisfaction", value: 98, suffix: "%", prefix: "" },
  ];

  const metricsData = metrics || defaultMetrics;
  const [counts, setCounts] = useState<number[]>(metricsData.map(() => 0));

  useEffect(() => {
    const durations = metricsData.map(() => 2000 + Math.random() * 1000);
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const newCounts = metricsData.map((metric, index) => {
        const duration = durations[index];
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        return Math.floor(metric.value * easeOut);
      });

      setCounts(newCounts);

      if (newCounts.some((count, i) => count < metricsData[i].value)) {
        requestAnimationFrame(animate);
      }
    };

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [metricsData]);

  return (
    <div className="w-full bg-gradient-to-r from-black via-brand-green/5 to-black border-y border-brand-green/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metricsData.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="relative">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-brand-green/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2 font-serif">
                    {metric.prefix}
                    {counts[index].toLocaleString()}
                    {metric.suffix}
                  </div>
                  
                  <div className="text-sm md:text-base text-gray-400 group-hover:text-gray-300 transition-colors">
                    {metric.label}
                  </div>

                  {/* Animated underline */}
                  <motion.div
                    className="h-0.5 bg-gradient-to-r from-transparent via-brand-green to-transparent mt-2"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Real-time indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500"
        >
          <motion.div
            className="w-2 h-2 bg-brand-green rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <span>Live metrics updating in real-time</span>
        </motion.div>
      </div>
    </div>
  );
}
