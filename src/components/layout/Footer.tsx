'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Brain, Linkedin, Twitter, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';

const footerLinks = {
  company: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Blogs', href: '/blogs' },
  ],
  services: [
    { label: 'AI Strategy', href: '/services#ai-strategy' },
    { label: 'SaaS Development', href: '/services#saas' },
    { label: 'Cloud Architecture', href: '/services#cloud' },
    { label: 'AI Integration', href: '/services#integration' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:contact@synqlabs.ai', label: 'Email' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    // TODO: Implement newsletter subscription with Supabase
    setTimeout(() => {
      setMessage('Thank you for subscribing!');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <footer className="bg-black border-t border-brand-green/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <Brain className="w-8 h-8 text-brand-green" />
                <div className="absolute inset-0 bg-brand-green/20 rounded-full blur-lg" />
              </motion.div>
              <span className="text-xl font-bold text-white font-serif">
                SynQ <span className="text-brand-green">Labs</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Elegant AI Solutions for Modern Enterprises. Bespoke consulting and development for those who demand excellence.
            </p>
            <div className="flex items-start space-x-2 text-gray-400 text-sm">
              <MapPin className="w-4 h-4 mt-0.5 text-brand-green flex-shrink-0" />
              <span>Global Services Available</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-brand-green transition-colors text-sm group inline-flex items-center"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-brand-green transition-colors text-sm group inline-flex items-center"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to receive insights and updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-green transition-colors text-sm"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-green-light transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </motion.button>
              {message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-brand-green text-xs"
                >
                  {message}
                </motion.p>
              )}
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-brand-green/30 to-transparent my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SynQ Labs. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-gray-900 rounded-lg text-gray-400 hover:text-brand-green hover:bg-gray-800 transition-all"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex items-center space-x-4 text-sm">
            {footerLinks.legal.map((link, index) => (
              <span key={link.href} className="flex items-center">
                <Link
                  href={link.href}
                  className="text-gray-500 hover:text-brand-green transition-colors"
                >
                  {link.label}
                </Link>
                {index < footerLinks.legal.length - 1 && (
                  <span className="mx-2 text-gray-700">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
