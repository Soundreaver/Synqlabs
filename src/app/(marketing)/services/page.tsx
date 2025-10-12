"use client";

import { motion } from "framer-motion";
import { Brain, Code, Cloud, Sparkles, ChevronDown, CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";
import GradientText from "@/components/shared/GradientText";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { fadeInUp } from "@/lib/animations";
import Link from "next/link";

export default function ServicesPage() {
  const [expandedService, setExpandedService] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
              Bespoke Solutions for <GradientText>Discerning Enterprises</GradientText>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
              We don't offer cookie-cutter packages. Every solution is meticulously
              crafted to match your unique vision and business objectives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <AnimatedSection className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              A Fully <GradientText>Customized</GradientText> Approach
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Unlike agencies that force your needs into predefined packages, we begin
              with a blank canvas. Your challenges, goals, and vision shape every aspect
              of our engagement.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              From initial discovery to post-launch support, we craft solutions that are
              as unique as your organization—combining cutting-edge technology with
              timeless engineering principles.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Service Categories */}
      <section className="py-24 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <GradientText>Service Portfolio</GradientText>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Select a service to explore how we can transform your business
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div
                  className={`relative rounded-2xl border transition-all duration-300 cursor-pointer ${
                    expandedService === index
                      ? "border-[#152514] bg-gradient-to-br from-[#152514]/10 to-transparent"
                      : "border-[#152514]/20 hover:border-[#152514]/40"
                  }`}
                  onClick={() => setExpandedService(expandedService === index ? null : index)}
                >
                  {/* Header */}
                  <div className="p-6 md:p-8 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-14 h-14 rounded-xl bg-[#152514]/20 flex items-center justify-center shrink-0">
                        <service.icon className="w-7 h-7 text-[#152514]" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{service.title}</h3>
                        <p className="text-gray-400">{service.tagline}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedService === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-6 h-6 text-[#152514]" />
                    </motion.div>
                  </div>

                  {/* Expanded Content */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedService === index ? "auto" : 0,
                      opacity: expandedService === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                      <div className="border-t border-[#152514]/20 pt-6">
                        <p className="text-gray-300 leading-relaxed mb-6">
                          {service.description}
                        </p>

                        <h4 className="text-lg font-semibold mb-4 text-[#152514]">
                          What We Deliver:
                        </h4>
                        <ul className="grid md:grid-cols-2 gap-3 mb-6">
                          {service.deliverables.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-[#152514] shrink-0 mt-0.5" />
                              <span className="text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-semibold mb-2 text-sm text-gray-400 uppercase tracking-wider">
                              Technologies
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {service.technologies.map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 rounded-full bg-[#152514]/20 text-sm text-gray-300 border border-[#152514]/30"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-semibold mb-2 text-sm text-gray-400 uppercase tracking-wider">
                              Best For
                            </h5>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {service.bestFor}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <GradientText>Process</GradientText>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A proven methodology that ensures excellence at every stage
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#152514] via-[#152514]/50 to-transparent" />

              {/* Timeline Steps */}
              <div className="space-y-12">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.phase}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } flex-col`}
                  >
                    {/* Content */}
                    <div className={`md:w-5/12 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} text-center md:px-8`}>
                      <div className="inline-block text-sm font-semibold text-[#152514] mb-2 uppercase tracking-wider">
                        Phase {index + 1}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{step.phase}</h3>
                      <p className="text-gray-400 leading-relaxed">{step.description}</p>
                    </div>

                    {/* Center Dot */}
                    <div className="w-4 h-4 rounded-full bg-[#152514] border-4 border-black absolute left-1/2 transform -translate-x-1/2 z-10 md:relative md:left-0 md:transform-none my-4 md:my-0" />

                    {/* Spacer */}
                    <div className="md:w-5/12" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto text-center p-12 md:p-16 rounded-3xl bg-gradient-to-br from-[#152514]/20 via-black to-[#152514]/10 border border-[#152514]/30 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#152514,transparent)] opacity-20" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to <GradientText>Discuss Your Project?</GradientText>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Let's explore how our bespoke approach can transform your vision into reality.
                Schedule a complimentary consultation to discuss your unique needs.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center px-8 py-4 rounded-full bg-[#152514] text-white font-semibold hover:bg-[#1a2e1a] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(21,37,20,0.5)]"
              >
                Start the Conversation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

const services = [
  {
    title: "AI Strategy & Consulting",
    tagline: "Transform your vision into intelligent solutions",
    icon: Brain,
    description:
      "We partner with you to develop comprehensive AI strategies that align with your business objectives. From initial assessment to roadmap creation, we ensure your AI investments deliver measurable results and sustainable competitive advantage.",
    deliverables: [
      "Discovery & Assessment",
      "Strategic Roadmap Development",
      "Implementation Planning",
      "ROI Optimization & Metrics",
      "Change Management Support",
      "Ongoing Advisory Services",
    ],
    technologies: ["GPT-4", "Claude", "LangChain", "Vector DBs", "Custom ML"],
    bestFor:
      "Organizations looking to integrate AI strategically or seeking to maximize the value of existing AI investments.",
  },
  {
    title: "Custom SaaS Development",
    tagline: "Scalable platforms built for excellence",
    icon: Code,
    description:
      "We design and build world-class SaaS applications that combine beautiful user experiences with robust, scalable architectures. Every line of code is crafted with maintainability, performance, and security in mind.",
    deliverables: [
      "Full-stack Application Development",
      "API Design & Integration",
      "Cloud-native Architecture",
      "Scalability Planning",
      "Security & Compliance",
      "Performance Optimization",
    ],
    technologies: ["Next.js", "React", "Node.js", "PostgreSQL", "Supabase", "TypeScript"],
    bestFor:
      "Startups and enterprises needing custom SaaS solutions that scale from MVP to millions of users.",
  },
  {
    title: "Cloud & DevOps Excellence",
    tagline: "Enterprise-grade infrastructure and automation",
    icon: Cloud,
    description:
      "We architect resilient, scalable cloud infrastructure and implement DevOps practices that accelerate delivery while maintaining the highest standards of reliability and security.",
    deliverables: [
      "Infrastructure as Code",
      "CI/CD Pipeline Design",
      "Multi-cloud Strategy",
      "Security & Compliance",
      "Monitoring & Observability",
      "Cost Optimization",
    ],
    technologies: ["AWS", "Azure", "Terraform", "Docker", "Kubernetes", "GitHub Actions"],
    bestFor:
      "Organizations modernizing infrastructure or requiring enterprise-grade DevOps capabilities.",
  },
  {
    title: "AI Integration & Automation",
    tagline: "Seamlessly embed AI into your operations",
    icon: Sparkles,
    description:
      "We integrate cutting-edge AI capabilities directly into your existing systems and workflows. From LLM-powered features to custom automation, we make AI practical and profitable.",
    deliverables: [
      "LLM Implementation",
      "Workflow Automation",
      "Custom AI Models",
      "Data Pipeline Design",
      "API Development",
      "Integration Support",
    ],
    technologies: ["OpenAI API", "Anthropic", "LangChain", "Python", "FastAPI", "Redis"],
    bestFor:
      "Companies ready to augment existing products with AI or automate complex workflows intelligently.",
  },
];

const processSteps = [
  {
    phase: "Discovery",
    description:
      "We immerse ourselves in your business, understanding your challenges, goals, and vision. Deep stakeholder interviews and technical assessments lay the foundation.",
  },
  {
    phase: "Strategy",
    description:
      "We develop a comprehensive strategy and detailed roadmap, complete with technical architecture, milestones, and success metrics tailored to your objectives.",
  },
  {
    phase: "Development",
    description:
      "Our engineers build your solution with meticulous attention to quality. Agile sprints, continuous integration, and regular reviews ensure we stay aligned with your vision.",
  },
  {
    phase: "Deployment",
    description:
      "We orchestrate a seamless launch with comprehensive testing, security hardening, and performance optimization. Your solution goes live with confidence.",
  },
  {
    phase: "Support",
    description:
      "Our partnership continues post-launch with ongoing optimization, monitoring, and evolution. We ensure your solution continues to deliver value as your business grows.",
  },
];
