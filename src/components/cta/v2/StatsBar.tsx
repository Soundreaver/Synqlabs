"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Zap, Clock, Award, DollarSign } from "lucide-react";

export default function StatsBar() {
  const stats = [
    { icon: <Users className="w-5 h-5" />, value: "150+", label: "Clients Served" },
    { icon: <DollarSign className="w-5 h-5" />, value: "$45M+", label: "Savings Generated" },
    { icon: <Zap className="w-5 h-5" />, value: "2,300+", label: "Processes Automated" },
    { icon: <Clock className="w-5 h-5" />, value: "94%", label: "Time Saved Avg" },
    { icon: <TrendingUp className="w-5 h-5" />, value: "127%", label: "Avg ROI Increase" },
    { icon: <Award className="w-5 h-5" />, value: "98%", label: "Client Satisfaction" },
  ];

  // Duplicate stats for seamless loop
  const duplicatedStats = [...stats, ...stats];

  return (
    <div className="relative py-8 overflow-hidden border-y border-brand-green/20">
      {/* Animated Stats */}
      <div className="relative flex">
        <motion.div
          className="flex gap-12 px-6"
          animate={{
            x: [0, -50 * stats.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedStats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-4 whitespace-nowrap"
            >
              <div className="p-2 bg-brand-green/10 rounded-lg text-brand-green">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold text-brand-green-light">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
              <div className="w-px h-12 bg-brand-green/20 ml-8" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gradient Fade Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none" />
    </div>
  );
}
