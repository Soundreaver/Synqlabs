'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Brain, Code, Cloud, Cpu, ArrowRight, Sparkles, Zap, Rocket, Shield } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';

const SkeletonOne = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-brand-green-dark/20 to-brand-green/10 relative overflow-hidden">
      {/* Neural Network Visualization */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full p-8">
          {/* Nodes */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-brand-green/40"
              style={{
                left: `${20 + (i % 4) * 20}%`,
                top: `${25 + Math.floor(i / 4) * 25}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-30">
            <motion.line
              x1="25%" y1="30%" x2="45%" y2="30%"
              stroke="rgba(251, 191, 36, 0.5)"
              strokeWidth="2"
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.line
              x1="45%" y1="30%" x2="65%" y2="55%"
              stroke="rgba(251, 191, 36, 0.5)"
              strokeWidth="2"
              animate={{ pathLength: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            />
          </svg>
        </div>
      </div>
      <Brain className="absolute bottom-4 right-4 w-12 h-12 text-brand-green/20" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-10" />
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-brand-green/20 to-brand-green-light/10 relative overflow-hidden">
      {/* Code Editor Mockup */}
      <div className="absolute inset-0 p-6 font-mono text-xs">
        <div className="space-y-2">
          <motion.div
            className="h-2 bg-brand-green/30 rounded w-1/4"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="h-2 bg-brand-green/40 rounded w-3/4 ml-4"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="h-2 bg-brand-green/40 rounded w-2/3 ml-4"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
          />
          <motion.div
            className="h-2 bg-brand-green/30 rounded w-1/3"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
          <motion.div
            className="h-2 bg-brand-green/40 rounded w-1/2 ml-4"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
          />
        </div>
        <Code className="absolute bottom-4 right-4 w-10 h-10 text-brand-green/20" />
      </div>
      <div className="absolute top-2 right-2 flex gap-1">
        <div className="w-2 h-2 rounded-full bg-red-500/30" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
        <div className="w-2 h-2 rounded-full bg-brand-green/30" />
      </div>
    </div>
  );
};

const SkeletonThree = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-brand-green-light/20 to-brand-green/10 relative overflow-hidden">
      {/* Cloud Infrastructure */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Server Racks */}
        <div className="grid grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-12 h-16 border-2 border-brand-green/30 rounded relative"
              animate={{
                borderColor: [
                  'rgba(251, 191, 36, 0.3)',
                  'rgba(251, 191, 36, 0.6)',
                  'rgba(251, 191, 36, 0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              <div className="absolute inset-x-2 top-2 space-y-1">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-0.5 bg-brand-green/40 rounded" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Cloud className="absolute bottom-4 right-4 w-10 h-10 text-brand-green/20" />
      {/* Network Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <motion.path
          d="M 20,50 Q 50,20 80,50"
              stroke="rgba(251, 191, 36, 0.4)"
          strokeWidth="2"
          fill="none"
          animate={{ pathLength: [0, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </svg>
    </div>
  );
};

const SkeletonFour = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-brand-green/20 to-brand-green-dark/10 relative overflow-hidden">
      {/* API Integration Visual */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        {/* Central Hub */}
        <div className="relative">
          <motion.div
            className="w-16 h-16 rounded-lg border-2 border-brand-green/50 flex items-center justify-center"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Cpu className="w-8 h-8 text-brand-green" />
          </motion.div>
          
          {/* Connecting Nodes */}
          {[0, 90, 180, 270].map((angle, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 rounded-full border-2 border-brand-green/40 bg-black/50"
              style={{
                left: `${Math.cos((angle * Math.PI) / 180) * 60 + 16}px`,
                top: `${Math.sin((angle * Math.PI) / 180) * 60 + 16}px`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                borderColor: [
                  'rgba(251, 191, 36, 0.4)',
                  'rgba(251, 191, 36, 0.8)',
                  'rgba(251, 191, 36, 0.4)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
      <Zap className="absolute top-4 right-4 w-8 h-8 text-brand-green/30" />
    </div>
  );
};

const services = [
  {
    icon: Brain,
    title: 'AI Strategy & Consulting',
    description: 'Transform your vision into intelligent solutions with expert AI consulting and strategic roadmapping.',
    gradient: 'from-brand-green-dark to-brand-green',
    className: 'md:col-span-2',
    header: <SkeletonOne />,
  },
  {
    icon: Code,
    title: 'Custom SaaS Development',
    description: 'Scalable platforms built for excellence with enterprise-grade architecture and modern tech stacks.',
    gradient: 'from-brand-green to-brand-green-light',
    className: 'md:col-span-1',
    header: <SkeletonTwo />,
  },
  {
    icon: Cloud,
    title: 'Cloud Architecture',
    description: 'Enterprise-grade infrastructure and DevOps solutions designed for performance and reliability.',
    gradient: 'from-brand-green-light to-brand-green',
    className: 'md:col-span-1',
    header: <SkeletonThree />,
  },
  {
    icon: Cpu,
    title: 'AI Integration',
    description: 'Seamlessly embed AI into your operations with custom models and intelligent automation.',
    gradient: 'from-brand-green to-brand-green-dark',
    className: 'md:col-span-2',
    header: <SkeletonFour />,
  },
];

export default function Services() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Top Fade */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black via-black/80 to-transparent z-10" />
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
      
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-green/10 border border-brand-green/30 rounded-full mb-6 group hover:bg-brand-green/15 transition-all duration-300">
            <Sparkles className="w-4 h-4 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <span className="text-sm text-brand-green-light font-medium drop-shadow-[0_0_4px_rgba(251,191,36,0.4)]">Our Expertise</span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-serif mb-6"
          >
            Tailored Solutions That
            <br />
            <span className="gradient-text">Define the Future</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-lg text-gray-400"
          >
            From strategy to implementation, we deliver bespoke AI and SaaS solutions that elevate your business.
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
        >
          <BentoGrid className="max-w-7xl mx-auto">
            {services.map((service, i) => (
              <BentoGridItem
                key={i}
                title={service.title}
                description={service.description}
                header={service.header}
                icon={<service.icon className="h-6 w-6 text-brand-green" />}
                className={service.className}
              />
            ))}
          </BentoGrid>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center px-8 py-4 bg-transparent border-2 border-brand-green text-white font-semibold rounded-lg hover:bg-brand-green/10 transition-all"
            >
              View All Services
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
