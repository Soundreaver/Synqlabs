"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Layers,
  Brain,
  Database,
  Cloud,
  Code,
  Cpu,
  Network,
  Lock,
  Zap,
  GitBranch,
  Server,
  Globe,
} from "lucide-react";

interface Technology {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  useCases: string[];
  color: string;
  layer: number;
}

export default function TechStack3D() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const technologies: Technology[] = [
    // Layer 1: AI/ML
    {
      id: "tensorflow",
      name: "TensorFlow",
      category: "AI/ML Framework",
      icon: <Brain className="w-6 h-6" />,
      description: "Deep learning framework for building and training neural networks",
      useCases: ["Computer Vision", "NLP", "Predictive Analytics"],
      color: "from-orange-500 to-red-500",
      layer: 1,
    },
    {
      id: "pytorch",
      name: "PyTorch",
      category: "AI/ML Framework",
      icon: <Cpu className="w-6 h-6" />,
      description: "Research-focused deep learning framework with dynamic computation graphs",
      useCases: ["Research", "Custom Models", "Transfer Learning"],
      color: "from-red-500 to-pink-500",
      layer: 1,
    },
    {
      id: "huggingface",
      name: "Hugging Face",
      category: "NLP Platform",
      icon: <Code className="w-6 h-6" />,
      description: "Pre-trained models and transformers for NLP tasks",
      useCases: ["Text Analysis", "Translation", "Summarization"],
      color: "from-yellow-500 to-orange-500",
      layer: 1,
    },

    // Layer 2: Backend/APIs
    {
      id: "python",
      name: "Python",
      category: "Backend Language",
      icon: <Server className="w-6 h-6" />,
      description: "Versatile programming language for AI and backend development",
      useCases: ["API Development", "Data Processing", "Automation"],
      color: "from-blue-500 to-cyan-500",
      layer: 2,
    },
    {
      id: "fastapi",
      name: "FastAPI",
      category: "API Framework",
      icon: <Zap className="w-6 h-6" />,
      description: "Modern, high-performance API framework for Python",
      useCases: ["REST APIs", "Real-time Processing", "Microservices"],
      color: "from-green-500 to-emerald-500",
      layer: 2,
    },
    {
      id: "nodejs",
      name: "Node.js",
      category: "Backend Runtime",
      icon: <Code className="w-6 h-6" />,
      description: "JavaScript runtime for scalable backend applications",
      useCases: ["Real-time Apps", "APIs", "Streaming"],
      color: "from-emerald-500 to-green-500",
      layer: 2,
    },

    // Layer 3: Data & Storage
    {
      id: "postgresql",
      name: "PostgreSQL",
      category: "Database",
      icon: <Database className="w-6 h-6" />,
      description: "Advanced relational database with AI/ML extensions",
      useCases: ["Structured Data", "Analytics", "ACID Transactions"],
      color: "from-blue-500 to-indigo-500",
      layer: 3,
    },
    {
      id: "redis",
      name: "Redis",
      category: "Cache/Message Broker",
      icon: <Network className="w-6 h-6" />,
      description: "In-memory data store for caching and messaging",
      useCases: ["Caching", "Real-time Data", "Pub/Sub"],
      color: "from-red-500 to-orange-500",
      layer: 3,
    },
    {
      id: "pinecone",
      name: "Pinecone",
      category: "Vector Database",
      icon: <Brain className="w-6 h-6" />,
      description: "Vector database for AI/ML similarity search",
      useCases: ["Embeddings", "Semantic Search", "Recommendations"],
      color: "from-purple-500 to-pink-500",
      layer: 3,
    },

    // Layer 4: Cloud & Infrastructure
    {
      id: "aws",
      name: "AWS",
      category: "Cloud Platform",
      icon: <Cloud className="w-6 h-6" />,
      description: "Comprehensive cloud platform with AI/ML services",
      useCases: ["Hosting", "Scaling", "ML Training"],
      color: "from-orange-500 to-yellow-500",
      layer: 4,
    },
    {
      id: "docker",
      name: "Docker",
      category: "Containerization",
      icon: <Server className="w-6 h-6" />,
      description: "Container platform for consistent deployments",
      useCases: ["Deployment", "Scaling", "Isolation"],
      color: "from-blue-500 to-cyan-500",
      layer: 4,
    },
    {
      id: "kubernetes",
      name: "Kubernetes",
      category: "Orchestration",
      icon: <GitBranch className="w-6 h-6" />,
      description: "Container orchestration for production workloads",
      useCases: ["Auto-scaling", "Load Balancing", "High Availability"],
      color: "from-indigo-500 to-purple-500",
      layer: 4,
    },
  ];

  const layers = [
    { id: 1, name: "AI/ML Layer", description: "Models & Algorithms" },
    { id: 2, name: "Application Layer", description: "APIs & Services" },
    { id: 3, name: "Data Layer", description: "Storage & Processing" },
    { id: 4, name: "Infrastructure Layer", description: "Cloud & Deployment" },
  ];

  const layerTechnologies = (layerNum: number) => 
    technologies.filter(tech => tech.layer === layerNum);

  const activeTechData = technologies.find(t => t.id === activeTech);

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-green/10 border border-brand-green/30 rounded-full backdrop-blur-sm">
            <Layers className="w-4 h-4 text-brand-green" />
            <span className="text-sm text-brand-green-light">
              Technology Stack
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif">
            Our{" "}
            <span className="bg-gradient-to-r from-brand-green-light to-brand-green-dark bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Enterprise-grade technologies powering intelligent solutions. Click any layer or
            technology to explore.
          </p>
        </motion.div>

        {/* 3D Stack Visualization */}
        <div className="relative mb-16">
          <div className="space-y-8">
            {layers.reverse().map((layer, index) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setActiveLayer(layer.id)}
                onHoverEnd={() => setActiveLayer(null)}
                className="relative"
              >
                {/* Layer Container */}
                <div
                  className={`relative p-6 bg-gradient-to-br from-gray-900 to-gray-900/50 border rounded-2xl transition-all duration-300 ${
                    activeLayer === layer.id
                      ? "border-brand-green shadow-[0_0_30px_rgba(251,191,36,0.15)]"
                      : "border-gray-800"
                  }`}
                  style={{
                    transform: activeLayer === layer.id ? 'scale(1.02)' : 'scale(1)',
                  }}
                >
                  {/* Layer Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-white">{layer.name}</h3>
                      <p className="text-sm text-gray-400">{layer.description}</p>
                    </div>
                    <div className="px-3 py-1 bg-brand-green/10 rounded-full text-brand-green-light text-sm font-semibold">
                      Layer {layer.id}
                    </div>
                  </div>

                  {/* Technologies Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {layerTechnologies(layer.id).map((tech, techIndex) => (
                      <motion.button
                        key={tech.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (index * 0.1) + (techIndex * 0.05) }}
                        onClick={() => setActiveTech(activeTech === tech.id ? null : tech.id)}
                        className={`relative group p-4 rounded-xl border transition-all duration-300 text-left ${
                          activeTech === tech.id
                            ? "bg-brand-green/10 border-brand-green"
                            : "bg-gray-800/50 border-gray-700 hover:border-gray-600"
                        }`}
                      >
                        <div className={`w-10 h-10 mb-3 rounded-lg bg-gradient-to-br ${tech.color} flex items-center justify-center text-white`}>
                          {tech.icon}
                        </div>
                        <h4 className={`font-semibold mb-1 ${
                          activeTech === tech.id ? "text-brand-green-light" : "text-white"
                        }`}>
                          {tech.name}
                        </h4>
                        <p className="text-xs text-gray-400">{tech.category}</p>

                        {/* Hover/Active indicator */}
                        <div className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${
                          activeTech === tech.id
                            ? `opacity-20 bg-gradient-to-br ${tech.color}`
                            : "opacity-0 group-hover:opacity-10 bg-gradient-to-br from-brand-green-dark to-brand-green"
                        }`} />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* 3D Effect Lines */}
                {index < layers.length - 1 && (
                  <div className="absolute left-1/2 -bottom-4 w-px h-8 bg-gradient-to-b from-brand-green/30 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technology Details Panel */}
        {activeTechData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-8 bg-gradient-to-br from-gray-900 to-gray-900/50 border border-brand-green/30 rounded-2xl"
          >
            <div className="flex items-start gap-6">
              <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${activeTechData.color} flex items-center justify-center text-white flex-shrink-0`}>
                <div className="text-3xl">
                  {activeTechData.icon}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {activeTechData.name}
                    </h3>
                    <p className="text-brand-green-light text-sm font-semibold">
                      {activeTechData.category} • Layer {activeTechData.layer}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTech(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-gray-300 mb-6">
                  {activeTechData.description}
                </p>

                <div>
                  <h4 className="text-sm font-semibold text-brand-green mb-3">USE CASES</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeTechData.useCases.map((useCase, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-brand-green/10 border border-brand-green/30 rounded-full text-xs text-brand-green-light"
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { icon: <Brain className="w-6 h-6" />, value: "12+", label: "AI/ML Technologies" },
            { icon: <Globe className="w-6 h-6" />, value: "99.9%", label: "Uptime SLA" },
            { icon: <Lock className="w-6 h-6" />, value: "SOC 2", label: "Compliant" },
            { icon: <Zap className="w-6 h-6" />, value: "<100ms", label: "Response Time" },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gray-900/30 rounded-xl border border-gray-800">
              <div className="inline-flex p-3 bg-brand-green/10 rounded-lg text-brand-green mb-3">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-brand-green-light mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4">
            Need a custom tech stack for your project?
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-brand-green-dark to-brand-green rounded-lg text-black font-semibold hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all duration-300">
            Discuss Your Requirements
          </button>
        </motion.div>
      </div>
    </section>
  );
}
