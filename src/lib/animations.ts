import { Variants, Transition } from 'framer-motion';

/**
 * Animation Library for SynQ Labs
 * 
 * Elegant, performance-optimized animations that respect user preferences
 * and maintain 60fps across all devices.
 */

// Basic fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

// Slide animations
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

// Scale animations
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export const scaleOnHover: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export const scaleOnHoverSubtle: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

// Container animations for staggered children
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

// Continuous animations
export const float: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 0, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const pulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const gradientShift: Variants = {
  initial: { backgroundPosition: '0% 50%' },
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

export const glow: Variants = {
  initial: { 
    boxShadow: '0 0 20px rgba(21, 37, 20, 0.3)',
  },
  animate: {
    boxShadow: [
      '0 0 20px rgba(21, 37, 20, 0.3)',
      '0 0 40px rgba(21, 37, 20, 0.5)',
      '0 0 20px rgba(21, 37, 20, 0.3)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Rotation animations
export const rotate: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

export const rotateOnHover: Variants = {
  initial: { rotate: 0 },
  hover: { rotate: 180 },
};

// Page transition animations
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

// Parallax effect (for scroll-based animations)
export const parallax = (offset: number = 50) => ({
  initial: { y: offset },
  animate: { y: 0 },
});

// Transition presets
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
};

export const smoothTransition: Transition = {
  duration: 0.3,
  ease: 'easeInOut',
};

export const slowTransition: Transition = {
  duration: 0.6,
  ease: 'easeInOut',
};

export const fastTransition: Transition = {
  duration: 0.15,
  ease: 'easeOut',
};

// Utility function to check if user prefers reduced motion
export const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Utility to get motion-safe variant
export const getMotionVariant = (variant: Variants): Variants => {
  if (shouldReduceMotion()) {
    // Return simplified versions with no movement, only opacity
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    };
  }
  return variant;
};

// Custom hook-friendly animation configs
export const animationConfig = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: smoothTransition,
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: smoothTransition,
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: springTransition,
  },
};

// Viewport options for scroll-triggered animations
export const defaultViewport = {
  once: true,
  margin: '0px 0px -100px 0px', // Trigger slightly before element enters viewport
};

export const aggressiveViewport = {
  once: true,
  margin: '0px 0px -200px 0px',
};

export const repeatViewport = {
  once: false,
  margin: '0px 0px -100px 0px',
};
