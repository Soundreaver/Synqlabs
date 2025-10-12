'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { fadeInUp, staggerContainer, float } from '@/lib/animations';

const techStack = {
  cloud: [
    { name: 'AWS', logo: '☁️' },
    { name: 'Azure', logo: '🔷' },
    { name: 'Google Cloud', logo: '🌐' },
  ],
  ai: [
    { name: 'OpenAI', logo: '🤖' },
    { name: 'Anthropic', logo: '🧠' },
    { name: 'TensorFlow', logo: '🔥' },
    { name: 'PyTorch', logo: '⚡' },
  ],
  development: [
    { name: 'Next.js', logo: '▲' },
    { name: 'React', logo: '⚛️' },
    { name: 'Node.js', logo: '🟢' },
    { name: 'Python', logo: '🐍' },
  ],
  devops: [
    { name: 'Docker', logo: '🐳' },
    { name: 'Kubernetes', logo: '☸️' },
    { name: 'Terraform', logo: '🏗️' },
  ],
  database: [
    { name: 'Supabase', logo: '⚡' },
    { name: 'PostgreSQL', logo: '🐘' },
    { name: 'MongoDB', logo: '🍃' },
  ],
};

const allTechs = [
  ...techStack.cloud,
  ...techStack.ai,
  ...techStack.development,
  ...techStack.devops,
  ...techStack.database,
];

export default function TechStack() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(21, 37, 20, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(21, 37, 20, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Radial Gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-green/10 rounded-full blur-3xl" />
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
            <Zap className="w-4 h-4 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <span className="text-sm text-brand-green-light font-medium drop-shadow-[0_0_4px_rgba(34,197,94,0.4)]">Technology Stack</span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-serif mb-6"
          >
            Powered by
            <br />
            <span className="gradient-text">Excellence</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-lg text-gray-400"
          >
            We leverage cutting-edge technologies to deliver world-class solutions
          </motion.p>
        </motion.div>

        {/* Tech Logo Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          {allTechs.map((tech, index) => (
            <motion.div
              key={tech.name}
              variants={fadeInUp}
              custom={index}
              whileHover={{ 
                scale: 1.1,
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative aspect-square">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800 group-hover:border-brand-green/50 transition-all duration-500" />
                
                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-brand-green/5 rounded-xl blur-xl" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-4 space-y-2">
                  {/* Logo/Emoji */}
                  <motion.div
                    variants={float}
                    animate="animate"
                    className="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  >
                    {tech.logo}
                  </motion.div>
                  
                  {/* Name */}
                  <div className="text-sm font-medium text-gray-500 group-hover:text-brand-green transition-colors duration-300 text-center">
                    {tech.name}
                  </div>
                </div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-green/10 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Categories */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap items-center justify-center gap-4 text-sm"
        >
          {Object.keys(techStack).map((category) => (
            <div
              key={category}
              className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-full text-gray-400 hover:border-brand-green/50 hover:text-brand-green transition-all duration-300 cursor-default"
            >
              {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
