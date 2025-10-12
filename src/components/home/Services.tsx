'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Brain, Code, Cloud, Cpu, ArrowRight, Sparkles } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const services = [
  {
    icon: Brain,
    title: 'AI Strategy & Consulting',
    description: 'Transform your vision into intelligent solutions with expert AI consulting and strategic roadmapping.',
    gradient: 'from-brand-green-dark to-brand-green',
  },
  {
    icon: Code,
    title: 'Custom SaaS Development',
    description: 'Scalable platforms built for excellence with enterprise-grade architecture and modern tech stacks.',
    gradient: 'from-brand-green to-brand-green-light',
  },
  {
    icon: Cloud,
    title: 'Cloud Architecture',
    description: 'Enterprise-grade infrastructure and DevOps solutions designed for performance and reliability.',
    gradient: 'from-brand-green-light to-brand-green',
  },
  {
    icon: Cpu,
    title: 'AI Integration',
    description: 'Seamlessly embed AI into your operations with custom models and intelligent automation.',
    gradient: 'from-brand-green to-brand-green-dark',
  },
];

export default function Services() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
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
            <span className="text-sm text-brand-green-light font-medium drop-shadow-[0_0_4px_rgba(34,197,94,0.4)]">Our Expertise</span>
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

        {/* Services Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={fadeInUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-2xl" />
              
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-green/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Border */}
              <div className="absolute inset-0 rounded-2xl border border-gray-800 group-hover:border-brand-green/30 transition-colors duration-500" />

              {/* Content */}
              <div className="relative p-8 space-y-4">
                {/* Icon */}
                <div className="relative inline-flex">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-30 rounded-xl blur-xl group-hover:opacity-60 transition-opacity duration-500`} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20 rounded-xl blur-2xl group-hover:opacity-40 transition-opacity duration-500 scale-150`} />
                  <div className={`relative p-4 bg-gradient-to-br ${service.gradient} rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.3)] group-hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-shadow duration-500`}>
                    <service.icon className="w-8 h-8 text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white group-hover:text-brand-green transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Arrow */}
                <div className="pt-4">
                  <div className="inline-flex items-center text-brand-green opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5 blur-2xl`} />
              </div>
            </motion.div>
          ))}
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
