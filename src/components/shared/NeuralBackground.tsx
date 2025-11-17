"use client";

import { useEffect, useRef } from "react";

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
  active: boolean;
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize nodes
    const nodeCount = 80;
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: [],
        active: false,
      });
    }

    // Create connections (neural network-like structure)
    nodes.forEach((node, i) => {
      const connectionCount = Math.floor(Math.random() * 3) + 2;
      for (let j = 0; j < connectionCount; j++) {
        const targetId = Math.floor(Math.random() * nodes.length);
        if (targetId !== i && !node.connections.includes(targetId)) {
          node.connections.push(targetId);
        }
      }
    });

    nodesRef.current = nodes;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      nodes.forEach((node) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Mouse interaction
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        node.active = dist < 150;

        if (node.active) {
          // Attract to mouse
          node.x += dx * 0.01;
          node.y += dy * 0.01;
        }

        // Draw connections
        ctx.strokeStyle = node.active
          ? "rgba(251, 191, 36, 0.4)"
          : "rgba(251, 191, 36, 0.15)";
        ctx.lineWidth = node.active ? 2 : 1;

        node.connections.forEach((targetId) => {
          const target = nodes[targetId];
          if (!target) return;

          const distance = Math.sqrt(
            Math.pow(target.x - node.x, 2) + Math.pow(target.y - node.y, 2)
          );

          if (distance < 200) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();

            // Pulse effect on active connections
            if (node.active || target.active) {
              const pulse = Math.sin(Date.now() * 0.003) * 0.5 + 0.5;
              ctx.strokeStyle = `rgba(251, 191, 36, ${0.3 + pulse * 0.4})`;
              ctx.lineWidth = 2;
              ctx.stroke();
            }
          }
        });

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.active ? 4 : 2, 0, Math.PI * 2);
        ctx.fillStyle = node.active ? "#FBBF24" : "rgba(251, 191, 36, 0.6)";
        ctx.fill();

        // Glow effect for active nodes
        if (node.active) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#FBBF24";
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Neural Network Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.8 }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-green/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
