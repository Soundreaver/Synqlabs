"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailsRef = useRef<{ x: number; y: number; life: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const handleMouseMove = (e: MouseEvent) => {
      // Add new trail point
      trailsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
      });

      // Limit trail length
      if (trailsRef.current.length > 30) {
        trailsRef.current.shift();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      // Fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw trails
      trailsRef.current = trailsRef.current.filter((trail) => {
        trail.life -= 0.03;

        if (trail.life > 0) {
          // Orange gradient glow
          const gradient = ctx.createRadialGradient(
            trail.x,
            trail.y,
            0,
            trail.x,
            trail.y,
            20 * trail.life
          );
          gradient.addColorStop(0, `rgba(251, 191, 36, ${trail.life * 0.8})`);
          gradient.addColorStop(0.5, `rgba(251, 191, 36, ${trail.life * 0.4})`);
          gradient.addColorStop(1, "transparent");

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(trail.x, trail.y, 20 * trail.life, 0, Math.PI * 2);
          ctx.fill();

          return true;
        }
        return false;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
