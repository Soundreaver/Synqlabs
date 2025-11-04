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
      <NavBody className="backdrop-blur-xl bg-black/40">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <motion.div
            whileHover={{ scale: 1.15, rotate: 360 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="relative"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Brain className="w-8 h-8 text-brand-green drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
            </motion.div>
            
            {/* Pulsing Ring */}
            <motion.div
              className="absolute inset-0 border-2 border-brand-green/30 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
          
          <motion.span
            className="text-xl font-bold text-white font-serif"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            S<motion.span
              className="text-brand-green font-extrabold tracking-wide"
              animate={{
                textShadow: [
                  '0 0 10px rgba(251, 191, 36, 0.5)',
                  '0 0 20px rgba(251, 191, 36, 0.8)',
                  '0 0 10px rgba(251, 191, 36, 0.5)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >AI</motion.span>ndLabs
          </motion.span>
        </Link>

        {/* Nav Items */}
        <NavItems items={navItems} className="text-white hover:text-black" />

        {/* CTA Button */}
        <Link href="#contact">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-6 py-3 bg-gradient-to-r from-brand-green-dark via-brand-green to-brand-green-light text-black font-medium rounded-lg backdrop-blur-sm overflow-hidden group z-20 transition-all"
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
      <MobileNav className="backdrop-blur-xl bg-black/40">
        <MobileNavHeader>
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.15, rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative"
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Brain className="w-8 h-8 text-brand-green drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
              </motion.div>
              
              {/* Pulsing Ring */}
              <motion.div
                className="absolute inset-0 border-2 border-brand-green/30 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            
            <motion.span
              className="text-xl font-bold text-white font-serif"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              S<motion.span
                className="text-brand-green font-extrabold tracking-wide"
                animate={{
                  textShadow: [
                    '0 0 10px rgba(251, 191, 36, 0.5)',
                    '0 0 20px rgba(251, 191, 36, 0.8)',
                    '0 0 10px rgba(251, 191, 36, 0.5)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >AI</motion.span>ndLabs
            </motion.span>
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
          className="backdrop-blur-xl bg-black/95"
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
