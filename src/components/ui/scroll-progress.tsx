"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-green origin-left z-50"
        style={{ scaleX }}
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-brand-green blur-sm opacity-50" />
      </motion.div>

      {/* Side Progress Indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <div className="relative h-64 w-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-brand-green"
            style={{ height: `${scrollYProgress.get() * 100}%` }}
          >
            {/* Animated Glow */}
            <motion.div
              className="absolute inset-0 bg-brand-green blur-md opacity-60"
              animate={{
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Milestone Markers */}
          {[0, 0.25, 0.5, 0.75, 1].map((position, index) => (
            <motion.div
              key={position}
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border-2 transition-colors duration-300"
              style={{
                top: `${position * 100}%`,
                borderColor:
                  scrollYProgress.get() >= position
                    ? "#FBBF24"
                    : "#374151",
                backgroundColor:
                  scrollYProgress.get() >= position
                    ? "#FBBF24"
                    : "transparent",
              }}
              whileHover={{ scale: 1.5 }}
            >
              {scrollYProgress.get() >= position && (
                <motion.div
                  className="absolute inset-0 bg-brand-green rounded-full blur-sm"
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
