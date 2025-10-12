'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from '@/components/ui/resizable-navbar';

const navItems = [
  { name: 'Home', link: '/' },
  { name: 'Services', link: '/services' },
  { name: 'About', link: '/about' },
  { name: 'Blogs', link: '/blogs' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <ResizableNavbar className="top-0">
      {/* Desktop Navbar */}
      <NavBody className="backdrop-blur-xl bg-black/40 border border-brand-green/30">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="relative"
          >
            <Brain className="w-8 h-8 text-brand-green" />
            <motion.div
              className="absolute inset-0 bg-brand-green/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
          <span className="text-xl font-bold text-white font-serif">
            SynQ <span className="text-brand-green">Labs</span>
          </span>
        </Link>

        {/* Nav Items */}
        <NavItems items={navItems} className="text-gray-300 hover:text-white" />

        {/* CTA Button */}
        <Link href="#contact">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-6 py-3 bg-gradient-to-r from-brand-green-dark via-brand-green to-brand-green-light text-white font-medium rounded-lg backdrop-blur-sm overflow-hidden group z-20 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-shadow"
          >
            <span className="relative z-10 flex items-center">
              Get Started
              <motion.span
                className="ml-2"
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                →
              </motion.span>
            </span>
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
                repeatDelay: 1,
              }}
            />
            {/* Hover Gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-brand-green-light via-brand-green to-brand-green-dark opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </motion.button>
        </Link>
      </NavBody>

      {/* Mobile Navbar */}
      <MobileNav className="backdrop-blur-xl bg-black/40 border border-brand-green/30 shadow-[0_8px_32px_0_rgba(34,197,94,0.15)]">
        <MobileNavHeader>
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="relative"
            >
              <Brain className="w-8 h-8 text-brand-green" />
              <motion.div
                className="absolute inset-0 bg-brand-green/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
            <span className="text-xl font-bold text-white font-serif">
              SynQ <span className="text-brand-green">Labs</span>
            </span>
          </Link>

          {/* Mobile Toggle */}
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        {/* Mobile Menu */}
        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          className="backdrop-blur-xl bg-black/95 border border-brand-green/30"
        >
          {navItems.map((item, index) => (
            <motion.div
              key={item.link}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-brand-green/10 rounded-lg transition-all"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: navItems.length * 0.1 }}
            className="pt-4"
          >
            <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="relative w-full px-6 py-3 bg-gradient-to-r from-brand-green-dark via-brand-green to-brand-green-light text-white font-medium rounded-lg hover:shadow-lg hover:shadow-brand-green/50 transition-all overflow-hidden group">
                <span className="relative z-10">Get Started →</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatDelay: 1,
                  }}
                />
              </button>
            </Link>
          </motion.div>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
}
