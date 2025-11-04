"use client";

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  char: string;
  size: number;
}

interface TextParticlesProps {
  text?: string;
  fontSize?: number;
  particleColor?: string;
  scatterDistance?: number;
}

export default function TextParticles({
  text = 'SAINDLABS',
  fontSize = 120,
  particleColor = '#FBBF24',
  scatterDistance = 300,
}: TextParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [isScattered, setIsScattered] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = (_?: UIEvent) => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Initialize particles from text
    const initParticles = () => {
      ctx.font = `bold ${fontSize}px serif`;
      ctx.fillStyle = 'white';
      
      const textWidth = ctx.measureText(text).width;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const startX = centerX - textWidth / 2;

      // Draw text to get pixel data
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillText(text, startX, centerY);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const particles: Particle[] = [];

      // Sample pixels from text
      const sampling = 4; // Lower = more particles
      for (let y = 0; y < canvas.height; y += sampling) {
        for (let x = 0; x < canvas.width; x += sampling) {
          const index = (y * canvas.width + x) * 4;
          const alpha = imageData.data[index + 3];
          
          if (alpha > 128) {
            particles.push({
              x: x + (Math.random() - 0.5) * scatterDistance,
              y: y + (Math.random() - 0.5) * scatterDistance,
              targetX: x,
              targetY: y,
              vx: 0,
              vy: 0,
              char: text[Math.floor(Math.random() * text.length)],
              size: 2 + Math.random() * 2,
            });
          }
        }
      }

      particlesRef.current = particles;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    initParticles();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scatter/reform cycle
    const scatterCycle = () => {
      setIsScattered(true);
      setTimeout(() => setIsScattered(false), 2000);
    };
    const intervalId = setInterval(scatterCycle, 6000);

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      particles.forEach((particle) => {
        // Determine target position
        let targetX = particle.targetX;
        let targetY = particle.targetY;

        if (isScattered) {
          targetX += (Math.random() - 0.5) * scatterDistance;
          targetY += (Math.random() - 0.5) * scatterDistance;
        }

        // Mouse repulsion
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx += (dx / distance) * force * 2;
          particle.vy += (dy / distance) * force * 2;
        }

        // Move towards target
        particle.vx += (targetX - particle.x) * 0.05;
        particle.vy += (targetY - particle.y) * 0.05;

        // Apply friction
        particle.vx *= 0.9;
        particle.vy *= 0.9;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, particleColor);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(intervalId);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [text, fontSize, particleColor, scatterDistance, isScattered]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
}
