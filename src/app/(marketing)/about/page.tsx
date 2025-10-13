"use client";

import { motion } from "framer-motion";
import { Brain, Cloud, Sparkles, Target, Users, Zap, Award, Shield } from "lucide-react";
import GradientText from "@/components/shared/GradientText";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#152514]/20 via-black to-black" />
        
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#152514_1px,transparent_1px),linear-gradient(to_bottom,#152514_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Crafting the <GradientText>Future of AI</GradientText>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
              We are architects of intelligent systems, building bespoke AI solutions
              for enterprises that refuse to settle for ordinary.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <AnimatedSection className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our <GradientText>Vision</GradientText>
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  In a world where AI is rapidly becoming commoditized, we believe excellence
                  lies not in following trends, but in crafting solutions as unique as the
                  challenges they solve.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  SynQ Labs was founded on a simple yet powerful principle: that truly
                  transformative technology requires more than just implementation—it demands
                  vision, artistry, and an unwavering commitment to excellence.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  We work exclusively with organizations that understand the value of bespoke
                  solutions, where every line of code, every architectural decision, and every
                  user interaction is meticulously crafted to perfection.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="relative p-8 rounded-2xl bg-gradient-to-br from-[#152514]/20 to-transparent border border-[#152514]/30">
                <blockquote className="text-2xl md:text-3xl font-light italic text-gray-200">
                  &quot;We don&apos;t build software. We engineer experiences that define the future.&quot;
                </blockquote>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Expertise Areas */}
      <AnimatedSection className="py-24 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <GradientText>Expertise</GradientText>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Decades of combined experience across the most demanding domains
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {expertiseAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-[#152514]/10 to-transparent border border-[#152514]/20 hover:border-[#152514]/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#152514]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 mb-6 rounded-xl bg-[#152514]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <area.icon className="w-8 h-8 text-[#152514]" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">{area.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">{area.description}</p>
                  
                  <ul className="space-y-2">
                    {area.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-500">
                        <Sparkles className="w-4 h-4 mr-2 text-[#152514]" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Core Values */}
      <AnimatedSection className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <GradientText>Values</GradientText>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The principles that guide every decision we make
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#152514]/30 to-[#152514]/10 flex items-center justify-center">
                  <value.icon className="w-10 h-10 text-[#152514]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Team Section (Placeholder) */}
      <AnimatedSection className="py-24 bg-gradient-to-b from-[#0a0a0a] to-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Built by <GradientText>Visionaries</GradientText>
            </h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Our team brings together expertise from top-tier technology companies,
              AI research labs, and enterprise consulting firms. Each member is
              handpicked for their exceptional talent and commitment to excellence.
            </p>
            <p className="text-lg text-gray-500">
              Team profiles coming soon. We prefer to let our work speak for itself.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto text-center p-12 md:p-16 rounded-3xl bg-gradient-to-br from-[#152514]/20 via-black to-[#152514]/10 border border-[#152514]/30 overflow-hidden"
          >
            {/* Background effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#152514,transparent)] opacity-20" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Let's Build Something <GradientText>Extraordinary</GradientText>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Whether you&apos;re looking to transform your business with AI or build
                the next generation of enterprise software, we&apos;re ready to bring
                your vision to life.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center px-8 py-4 rounded-full bg-[#152514] text-white font-semibold hover:bg-[#1a2e1a] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(21,37,20,0.5)]"
              >
                Start Your Journey
                <Zap className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

const expertiseAreas = [
  {
    title: "Cloud Infrastructure & DevOps",
    icon: Cloud,
    description:
      "Architecting scalable, resilient cloud infrastructure that grows with your business. From multi-cloud strategies to cutting-edge DevOps automation.",
    highlights: [
      "AWS, Azure, Google Cloud expertise",
      "Infrastructure as Code (Terraform, CDK)",
      "Container orchestration & serverless",
    ],
  },
  {
    title: "Software Engineering & Architecture",
    icon: Target,
    description:
      "Crafting elegant, maintainable systems with modern architectural patterns. We build software that stands the test of time and scale.",
    highlights: [
      "Microservices & distributed systems",
      "Domain-driven design",
      "High-performance backends",
    ],
  },
  {
    title: "AI/ML Implementation & Strategy",
    icon: Brain,
    description:
      "Implementing cutting-edge AI solutions that deliver real business value. From LLM integration to custom ML models tailored to your needs.",
    highlights: [
      "Large Language Model integration",
      "Custom model development",
      "AI strategy & roadmapping",
    ],
  },
  {
    title: "Enterprise SaaS Development",
    icon: Zap,
    description:
      "Building world-class SaaS platforms that delight users and drive growth. Beautiful interfaces powered by robust, scalable backends.",
    highlights: [
      "Full-stack development",
      "Real-time features & webhooks",
      "Multi-tenancy & security",
    ],
  },
];

const coreValues = [
  {
    title: "Excellence",
    icon: Award,
    description:
      "We refuse to compromise on quality. Every project receives the same meticulous attention to detail.",
  },
  {
    title: "Innovation",
    icon: Sparkles,
    description:
      "We stay at the bleeding edge, exploring new technologies to deliver tomorrow&apos;s solutions today.",
  },
  {
    title: "Partnership",
    icon: Users,
    description:
      "Your success is our success. We work as an extension of your team, not just a vendor.",
  },
  {
    title: "Integrity",
    icon: Shield,
    description:
      "Transparent communication, honest timelines, and unwavering commitment to our promises.",
  },
];
