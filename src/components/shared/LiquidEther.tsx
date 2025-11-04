'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface LiquidEtherProps {
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  dt?: number;
  BFECC?: boolean;
  resolution?: number;
  isBounce?: boolean;
  colors?: string[];
  style?: React.CSSProperties;
  className?: string;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
}

export default function LiquidEther({
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  dt = 0.014,
  BFECC = true,
  resolution = 0.5,
  isBounce = false,
  colors = ['#0F172A', '#1E293B', '#334155'],
  style = {},
  className = '',
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 1000,
  autoRampDuration = 0.6
}: LiquidEtherProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Simple animated gradient as fallback
    const container = mountRef.current;
    container.style.background = `
      linear-gradient(135deg, 
        ${colors[0]} 0%, 
        ${colors[1]} 50%, 
        ${colors[2]} 100%
      )
    `;
    container.style.backgroundSize = '400% 400%';
    container.style.animation = 'gradientShift 15s ease infinite';

    // Add keyframes for animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gradientShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [colors]);

  return (
    <div
      ref={mountRef}
      className={`liquid-ether-container ${className}`}
      style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        width: '100%', 
        height: '100%',
        ...style 
      }}
    />
  );
}
