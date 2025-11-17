"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
  glowColor?: string;
}

export default function TiltCard({
  children,
  className = "",
  tiltAmount = 15,
  glowColor = "rgba(251, 191, 36, 0.3)",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [tiltAmount, -tiltAmount]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-tiltAmount, tiltAmount]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          opacity: isHovering ? 1 : 0,
        }}
        style={{
          background: `radial-gradient(circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%, ${glowColor}, transparent 60%)`,
          filter: "blur(20px)",
        }}
      />

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
        animate={{
          opacity: isHovering ? 0.6 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${Math.atan2(y.get(), x.get()) * (180 / Math.PI) + 90}deg, transparent 40%, rgba(251, 191, 36, 0.2) 50%, transparent 60%)`,
          }}
        />
      </motion.div>

      {/* Content */}
      <div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
