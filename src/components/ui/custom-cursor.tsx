"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if target is an Element (has closest method)
      if (!(target instanceof Element)) return;
      
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
        const text = target.getAttribute("data-cursor-text");
        if (text) setCursorText(text);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorText("");
    };

    const handleMouseOut = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);
    document.addEventListener("mouseout", handleMouseOut, true);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .cursor-pointer"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter as EventListener);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
      document.removeEventListener("mouseout", handleMouseOut, true);

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter as EventListener);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [cursorX, cursorY]);

  // Hide on mobile/tablet
  if (typeof window !== "undefined" && window.innerWidth < 1024) {
    return null;
  }

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 60 : 20,
            height: isHovering ? 60 : 20,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="relative flex items-center justify-center"
        >
          {/* Outer Ring */}
          <motion.div
            className="absolute rounded-full border-2 border-brand-green"
            animate={{
              width: isHovering ? "100%" : "100%",
              height: isHovering ? "100%" : "100%",
              opacity: isHovering ? 0.5 : 0.8,
            }}
            style={{
              boxShadow: isHovering
                ? "0 0 20px rgba(251, 191, 36, 0.6)"
                : "0 0 10px rgba(251, 191, 36, 0.3)",
            }}
          />

          {/* Inner Dot */}
          <motion.div
            className="absolute bg-brand-green rounded-full"
            animate={{
              width: isHovering ? 8 : 12,
              height: isHovering ? 8 : 12,
              opacity: isHovering ? 0.6 : 1,
            }}
            style={{
              boxShadow: "0 0 15px rgba(251, 191, 36, 0.8)",
            }}
          />

          {/* Cursor Text */}
          {cursorText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute whitespace-nowrap text-xs font-semibold text-brand-green px-2 py-1 bg-black rounded-full"
              style={{ top: "120%" }}
            >
              {cursorText}
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Trailing Particles */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-brand-green rounded-full"
            animate={{
              scale: [1, 0],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 0.8,
              delay: i * 0.1,
              repeat: Infinity,
              repeatDelay: 0.2,
            }}
            style={{
              boxShadow: "0 0 10px rgba(251, 191, 36, 0.6)",
            }}
          />
        ))}
      </motion.div>
    </>
  );
}
